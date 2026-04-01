import { ENV } from "@/config";
import { ApiError } from "@/lib/api";
import crypto from "crypto";
import { JWTPayload } from "jose";
import { AppJWTPayload } from "./types";

// JWT Utilities
// -- Encode Secret
export function encode(secret: string): Uint8Array {
    return new TextEncoder().encode(secret);
}

// -- Validate Payload
export function assertPayload(
    payload: JWTPayload
): asserts payload is AppJWTPayload {
    if (!payload || !payload.sub || !payload.role || !payload.type)
        throw ApiError.forbidden("Malformed token payload");
}

// Cookie Utilities
export function parseDurationToSeconds(duration: string): number {
    const match = duration.match(/^(\d+)([smhd])$/);
    if (!match) return 900;

    const value = parseInt(match[1]);
    switch (match[2]) {
        case "s":
            return value;
        case "m":
            return value * 60;
        case "h":
            return value * 60 * 60;
        case "d":
            return value * 60 * 60 * 24;
        default:
            return 900;
    }
}

// Verification Code Utilities
// -- Random 6-digit Code
export function generateVerificationCode(): string {
    const length = ENV.AUTH.VERIFICATION.LENGTH;

    const buffer = crypto.randomBytes(4);
    const num = buffer.readUInt32BE(0) % Math.pow(10, length);

    return num.toString().padStart(length, "0");
}

// Refresh Token Utilities
// -- Hash Token
export function hashToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
}
