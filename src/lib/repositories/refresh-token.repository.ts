import { db } from "@/db";
import { refreshTokens } from "@/db/schema";
import type { NewRefreshToken } from "@/db/schema/users";
import { ApiError, logger } from "@/lib/api";
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
}

export const refreshTokenRepository = RefreshTokenRepository.getInstance();
