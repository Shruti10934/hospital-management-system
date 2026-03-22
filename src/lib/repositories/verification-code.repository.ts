import { db } from "@/db";
import { verificationCodes } from "@/db/schema";
import type { NewVerificationCode } from "@/db/schema/users";
import { ApiError, logger } from "@/lib/api";
import { and, eq } from "drizzle-orm";
import { PublicVerificationCode, VerificationCodeType } from "./types";

const COMPONENT = "REPOSITORY:VERIFICATION_CODE";

export class VerificationCodeRepository {
    private static instance: VerificationCodeRepository | null = null;

    static getInstance(): VerificationCodeRepository {
        if (!VerificationCodeRepository.instance)
            VerificationCodeRepository.instance =
                new VerificationCodeRepository();
        return VerificationCodeRepository.instance;
    }

    static resetInstance(): void {
        VerificationCodeRepository.instance = null;
    }

    private constructor() {
        logger.info({ component: COMPONENT }, "Repository initialised");
    }

    async insert(data: NewVerificationCode): Promise<PublicVerificationCode> {
        const [code] = await db
            .insert(verificationCodes)
            .values(data)
            .returning();
        if (!code)
            throw ApiError.internalServerError(
                "Failed to create verification code"
            );

        return code;
    }

    async deleteById(id: string): Promise<void> {
        await db.delete(verificationCodes).where(eq(verificationCodes.id, id));
    }

    async deleteByUserIdAndType(
        userId: string,
        type: VerificationCodeType
    ): Promise<void> {
        await db
            .delete(verificationCodes)
            .where(
                and(
                    eq(verificationCodes.userId, userId),
                    eq(verificationCodes.type, type)
                )
            );
    }
}

export const verificationCodeRepository =
    VerificationCodeRepository.getInstance();
