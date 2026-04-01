import { ENV } from "@/config";
import type { VerificationCodeType } from "@/db/types";
import { ApiError, logger } from "@/lib/api";
import {
    generateTokenPair,
    generateVerificationCode,
    hashPassword,
    hashToken,
    parseDurationToSeconds,
    verifyPassword,
    verifyRefreshToken,
    type TokenPair,
} from "@/lib/auth";
import { SendEmailParams, sendTransactionalEmail } from "@/lib/email";
import {
    refreshTokenRepository,
    userRepository,
    type PublicUser,
} from "@/lib/repositories";
import type {
    LoginInput,
    RegisterInput,
    VerifyEmailInput,
} from "@/lib/validations";
import { getDateFromMinutes } from "./utils";

const COMPONENT = "SERVICE:AUTH";

type VerificationCodeTypeValue = (typeof VerificationCodeType)[number];

export class AuthService {
    private static instance: AuthService | null = null;

    static getInstance(): AuthService {
        if (!AuthService.instance) AuthService.instance = new AuthService();
        return AuthService.instance;
    }

    static resetInstance(): void {
        AuthService.instance = null;
    }

    private constructor() {
        logger.info({ component: COMPONENT }, "Service initialised");
    }

    async registerUser(input: RegisterInput): Promise<PublicUser> {
        const { email, name, password, phone, role } = input;
        logger.info({ component: COMPONENT, email }, "Registration attempt");

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Generate verification code
        const code = generateVerificationCode();
        const type: VerificationCodeTypeValue = "email_verification";
        const expiresAt = getDateFromMinutes(ENV.AUTH.VERIFICATION.EXPIRY);

        // Create user with verification code
        const newUser = await userRepository.insertUserWithVerificationCode(
            { name, email, phone, password: hashedPassword, role },
            { code, type, expiresAt }
        );
        logger.info(
            { component: COMPONENT, userId: newUser.id, email: newUser.email },
            "User registered successfully"
        );

        // Send verification email
        this.sendVerificationEmail(newUser, code);

        return newUser;
    }

    async verifyEmail(input: VerifyEmailInput): Promise<PublicUser> {
        const { email, code } = input;
        logger.info(
            { component: COMPONENT, email },
            "Email verification attempt"
        );

        // Verify email and delete verification code
        const updatedUser = await userRepository.verifyEmailAndInvalidateCode(
            email,
            code,
            "email_verification"
        );
        logger.info(
            { component: COMPONENT, userId: updatedUser.id },
            "Email verified successfully"
        );

        return updatedUser;
    }

    async login(
        input: LoginInput
    ): Promise<{ user: PublicUser; tokens: TokenPair }> {
        const { email, password } = input;
        logger.info({ component: COMPONENT, email }, "Login attempt");

        // Find user by email
        const user = await userRepository.findByEmail(email);
        if (!user) throw ApiError.unauthorized("Invalid credentials");
        const { id: userId, isVerified, isActive, role } = user;
        if (!isVerified)
            throw ApiError.forbidden("Please verify your email to login");
        if (!isActive) throw ApiError.forbidden("Your account is disabled");

        // Verify password
        const isValidPassword = await verifyPassword(password, user.password);
        if (!isValidPassword)
            throw ApiError.unauthorized("Invalid credentials");

        // Generate token pair
        const tokens = await generateTokenPair({ id: userId, role });

        // Store refresh token
        const expiryInSeconds = parseDurationToSeconds(ENV.AUTH.REFRESH.EXPIRY);
        const expiresAt = getDateFromMinutes(expiryInSeconds / 60);
        const tokenHash = hashToken(tokens.refreshToken);
        await refreshTokenRepository.insert({ tokenHash, userId, expiresAt });
        logger.info(
            { component: COMPONENT, userId },
            "User logged in successfully"
        );

        const { password: _, ...publicUser } = user;
        return { user: publicUser, tokens };
    }

    async logout(refreshToken: string): Promise<void> {
        const tokenHash = hashToken(refreshToken);
        // Delete refresh token from DB
        await refreshTokenRepository.deleteByHash(tokenHash);
    }

    async refreshTokens(token: string): Promise<{ tokens: TokenPair }> {
        // Verify refresh token
        const payload = await verifyRefreshToken(token);

        // Verify user
        const user = await userRepository.findPublicUserById(payload.sub);
        if (!user) throw ApiError.unauthorized("Invalid user");
        const { id: userId, isVerified, isActive, role } = user;
        if (!isVerified || !isActive)
            throw ApiError.unauthorized("Invalid user");

        // Generate new tokens
        const tokens = await generateTokenPair({ id: userId, role });
        // Prepare data for token rotation
        const expiryInSeconds = parseDurationToSeconds(ENV.AUTH.REFRESH.EXPIRY);
        const expiresAt = getDateFromMinutes(expiryInSeconds / 60);
        const oldHash = hashToken(token);
        const newHash = hashToken(tokens.refreshToken);

        // Rotate tokens
        const existingToken = await refreshTokenRepository.rotateToken(
            oldHash,
            { tokenHash: newHash, userId, expiresAt }
        );
        if (!existingToken)
            throw ApiError.unauthorized("Invalid refresh token");
        logger.info(
            { component: COMPONENT, userId },
            "Tokens refreshed successfully"
        );

        return { tokens };
    }

    async getMe(userId: string): Promise<PublicUser> {
        const user = await userRepository.findPublicUserById(userId);
        if (!user) throw ApiError.notFound("User not found");

        return user;
    }

    private sendVerificationEmail(
        user: Pick<PublicUser, "id" | "email" | "name">,
        code: string
    ): void {
        const { email, name, id: userId } = user;
        const payload: SendEmailParams = {
            to: { email, name },
            type: "email_verification",
            code,
        };

        void sendTransactionalEmail(payload)
            .then(() => {
                logger.info(
                    { component: COMPONENT, userId },
                    "Verification email sent"
                );
            })
            .catch(err => {
                logger.error(
                    { component: COMPONENT, userId, err },
                    "Failed to send verification email"
                );
            });
    }
}

export const authService = AuthService.getInstance();
