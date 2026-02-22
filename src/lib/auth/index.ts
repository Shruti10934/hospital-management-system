import { ApiError } from "@/lib/api";
import { NextRequest } from "next/server";
import { extractAccessToken } from "./cookies";
import { verifyAccessToken } from "./jwt";
import { AccessTokenPayload } from "./types";

export async function authenticate(
    req: NextRequest
): Promise<AccessTokenPayload> {
    const token = extractAccessToken(req);
    if (!token) throw ApiError.unauthorized("Unauthorized");

    const payload = await verifyAccessToken(token);
    if (!payload) throw ApiError.unauthorized("Invalid token");

    return payload;
}

export * from "./config";
export * from "./cookies";
export * from "./jwt";
export * from "./password";
export * from "./types";
export { generateVerificationCode, hashToken } from "./utils";
