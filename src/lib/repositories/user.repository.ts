import { db } from "@/db";
import { users, verificationCodes } from "@/db/schema";
import type { NewUser, NewVerificationCode, User } from "@/db/schema/users";
import { ApiError, logger } from "@/lib/api";
import { and, eq, gt } from "drizzle-orm";
import { PublicUserFields } from "./sanitization";
import type { PublicUser, VerificationCodeType } from "./types";

const COMPONENT = "REPOSITORY:USER";

export class UserRepository {
    private static instance: UserRepository | null = null;

    static getInstance(): UserRepository {
        if (!UserRepository.instance)
            UserRepository.instance = new UserRepository();
        return UserRepository.instance;
    }

    static resetInstance(): void {
        UserRepository.instance = null;
    }

    private constructor() {
        logger.info({ component: COMPONENT }, "Repository initialised");
    }

    async insertUserWithVerificationCode(
        userData: NewUser,
        verificationData: Omit<NewVerificationCode, "userId">
    ): Promise<PublicUser> {
        return db.transaction(async tx => {
            const [user] = await tx
                .insert(users)
                .values(userData)
                .onConflictDoNothing()
                .returning(PublicUserFields);
            if (!user) throw ApiError.conflict("User already exists");
            const userId = user.id;
            logger.info(
                { component: COMPONENT, userId },
                "User created successfully"
            );

            const [verificationCode] = await tx
                .insert(verificationCodes)
                .values({ ...verificationData, userId })
                .returning({ id: verificationCodes.id });
            if (!verificationCode)
                throw ApiError.internalServerError(
                    "Failed to create verification code"
                );
            logger.info(
                { component: COMPONENT, userId },
                "Verification code created successfully"
            );

            return user;
        });
    }

    async verifyEmailAndInvalidateCode(
        email: string,
        code: string,
        type: VerificationCodeType
    ): Promise<PublicUser> {
        return db.transaction(async tx => {
            // Find user by email
            const [user] = await tx
                .select()
                .from(users)
                .where(eq(users.email, email))
                .for("update") // Lock user row
                .limit(1);
            if (!user) throw ApiError.notFound("User not found");
            const { id: userId, isVerified, isActive } = user;
            if (isVerified)
                throw ApiError.badRequest("Email is already verified");
            if (!isActive)
                throw ApiError.badRequest("Your account is disabled");

            // Find verification code
            const [vc] = await tx
                .select()
                .from(verificationCodes)
                .where(
                    and(
                        eq(verificationCodes.userId, userId),
                        eq(verificationCodes.code, code),
                        eq(verificationCodes.type, type),
                        gt(verificationCodes.expiresAt, new Date())
                    )
                )
                .for("update") // Lock code row
                .limit(1);
            if (!vc)
                throw ApiError.badRequest(
                    "Invalid or expired verification code"
                );

            // Mark user verified
            const [updatedUser] = await tx
                .update(users)
                .set({ isVerified: true })
                .where(eq(users.id, userId))
                .returning(PublicUserFields);
            if (!updatedUser) throw ApiError.notFound("User not found");

            // Delete verification code
            await tx
                .delete(verificationCodes)
                .where(eq(verificationCodes.id, vc.id));

            return updatedUser;
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
        if (!user) return null;

        return user;
    }
}

export const userRepository = UserRepository.getInstance();
