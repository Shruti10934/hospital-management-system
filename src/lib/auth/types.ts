import { User } from "@/db/schema";
import { UserRole } from "@/db/types";
import { JWTPayload } from "jose";

// JWT Token Types
export type TokenType = "access" | "refresh";

// JWT Token Pair
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

// JWT Payload Types
export interface BaseJWTPayload extends JWTPayload {
    sub: string;
    role: (typeof UserRole)[number];
}
export interface AccessTokenPayload extends BaseJWTPayload {
    type: "access";
}
export interface RefreshTokenPayload extends BaseJWTPayload {
    type: "refresh";
}
export type AppJWTPayload = AccessTokenPayload | RefreshTokenPayload;

// Decoded user available after auth
export interface AuthUser {
    id: string;
    role: (typeof UserRole)[number];
}

// Sanitized user (no password)
export type SanitizedUser = Omit<User, "password">;
