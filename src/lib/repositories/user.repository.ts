import { db } from "@/db";
import { users, verificationCodes } from "@/db/schema";
import type { NewUser, NewVerificationCode } from "@/db/schema/users";
import { ApiError, logger } from "@/lib/api";
import { PublicUserFields } from "./sanitization";
import type { PublicUser } from "./types";

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
            const insertedUsers = await tx
                .insert(users)
                .values(userData)
                .onConflictDoNothing()
                .returning(PublicUserFields);
            if (insertedUsers.length === 0)
                throw ApiError.conflict("User already exists");

            const user = insertedUsers[0];
            const userId = user.id;
            if (!user)
                throw ApiError.internalServerError("Failed to create user");
            logger.info(
                { component: COMPONENT, userId },
                "User created successfully"
            );

            const insertedVerificationCodes = await tx
                .insert(verificationCodes)
                .values({ ...verificationData, userId })
                .returning({ id: verificationCodes.id });
            if (insertedVerificationCodes.length === 0)
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
}

export const userRepository = UserRepository.getInstance();
