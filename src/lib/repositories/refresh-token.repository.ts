import { db } from "@/db";
import { refreshTokens } from "@/db/schema";
import type { NewRefreshToken } from "@/db/schema/users";
import { ApiError, logger } from "@/lib/api";
import { eq } from "drizzle-orm";
import { PublicRefreshToken } from "./types";

const COMPONENT = "REPOSITORY:REFRESH_TOKEN";

export class RefreshTokenRepository {
    private static instance: RefreshTokenRepository | null = null;

    static getInstance(): RefreshTokenRepository {
        if (!RefreshTokenRepository.instance)
            RefreshTokenRepository.instance = new RefreshTokenRepository();
        return RefreshTokenRepository.instance;
    }

    static resetInstance(): void {
        RefreshTokenRepository.instance = null;
    }

    private constructor() {
        logger.info({ component: COMPONENT }, "Repository initialised");
    }

    async insert(data: NewRefreshToken): Promise<PublicRefreshToken> {
        const [token] = await db.insert(refreshTokens).values(data).returning();
        if (!token)
            throw ApiError.internalServerError(
                "Failed to create refresh token"
            );

        return token;
    }

    async deleteByHash(tokenHash: string): Promise<PublicRefreshToken | null> {
        const [token] = await db
            .delete(refreshTokens)
            .where(eq(refreshTokens.tokenHash, tokenHash))
            .returning();
        if (!token) return null;

        return token;
    }

    async rotateToken(
        oldHash: string,
        newData: NewRefreshToken
    ): Promise<PublicRefreshToken | null> {
        return db.transaction(async tx => {
            const [oldToken] = await tx
                .delete(refreshTokens)
                .where(eq(refreshTokens.tokenHash, oldHash))
                .returning();
            if (!oldToken) return null;
            if (new Date() > oldToken.expiresAt)
                throw ApiError.unauthorized("Refresh token expired");

            await tx.insert(refreshTokens).values(newData);

            return oldToken;
        });
    }
}

export const refreshTokenRepository = RefreshTokenRepository.getInstance();
