import { ENV } from "@/config";
import type { VerificationCodeType } from "@/db/types";
import { logger } from "@/lib/api";
import { generateVerificationCode, hashPassword } from "@/lib/auth";
import { SendEmailParams, sendTransactionalEmail } from "@/lib/email";
import { userRepository, type PublicUser } from "@/lib/repositories";
import type { RegisterInput } from "@/lib/validations";
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
