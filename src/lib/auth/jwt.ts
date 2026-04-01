import { ENV } from "@/config";
import { User } from "@/db/schema";
import { ApiError } from "@/lib/api/api-error";
import { errors, jwtVerify, SignJWT } from "jose";
import type {
    AccessTokenPayload,
    AppJWTPayload,
    BaseJWTPayload,
    RefreshTokenPayload,
    TokenPair,
} from "./types";
import { assertPayload, encode } from "./utils";

async function signToken<T extends AppJWTPayload>(
    payload: T,
    secret: string,
    exp: string
): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: ENV.JWT.ALGORITHM })
        .setIssuedAt()
        .setIssuer(ENV.JWT.ISSUER)
        .setAudience(ENV.JWT.AUDIENCE)
        .setExpirationTime(exp)
        .sign(encode(secret));
}

async function signAccessToken(payload: BaseJWTPayload): Promise<string> {
    const accessPayload: AccessTokenPayload = { ...payload, type: "access" };
    return signToken(
        accessPayload,
        ENV.AUTH.ACCESS.SECRET,
        ENV.AUTH.ACCESS.EXPIRY
    );
}

async function signRefreshToken(payload: BaseJWTPayload): Promise<string> {
    const refreshPayload: RefreshTokenPayload = { ...payload, type: "refresh" };
    return signToken(
        refreshPayload,
        ENV.AUTH.REFRESH.SECRET,
        ENV.AUTH.REFRESH.EXPIRY
    );
}

export async function generateTokenPair(
    user: Pick<User, "id" | "role">
): Promise<TokenPair> {
    const payload: BaseJWTPayload = { sub: user.id, role: user.role };
    const [accessToken, refreshToken] = await Promise.all([
        signAccessToken(payload),
        signRefreshToken(payload),
    ]);
    return { accessToken, refreshToken };
}

// Verify
async function verifyToken(
    token: string,
    secret: string
): Promise<AppJWTPayload> {
    try {
        const { payload } = await jwtVerify(token, encode(secret), {
            algorithms: [ENV.JWT.ALGORITHM],
            issuer: ENV.JWT.ISSUER,
            audience: ENV.JWT.AUDIENCE,
        });
        assertPayload(payload);
        return payload;
    } catch (error) {
        let errorMsg = "Token verification failed.";
        if (error instanceof errors.JWTExpired) errorMsg = "Token expired";
        else if (error instanceof errors.JWTInvalid) errorMsg = "Invalid token";
        throw ApiError.forbidden(errorMsg);
    }
}

export async function verifyAccessToken(
    token: string
): Promise<AccessTokenPayload> {
    const payload = await verifyToken(token, ENV.AUTH.ACCESS.SECRET);
    if (payload.type !== "access") throw ApiError.forbidden("Invalid token");
    return payload;
}

export async function verifyRefreshToken(
    token: string
): Promise<RefreshTokenPayload> {
    const payload = await verifyToken(token, ENV.AUTH.REFRESH.SECRET);
    if (payload.type !== "refresh") throw ApiError.forbidden("Invalid token");
    return payload;
}
