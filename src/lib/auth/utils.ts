import { ApiError } from "@/lib/api";
import { JWTPayload } from "jose";
import { AppJWTPayload } from "./types";

// JWT Utilities
export function encode(secret: string): Uint8Array {
    return new TextEncoder().encode(secret);
}

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
