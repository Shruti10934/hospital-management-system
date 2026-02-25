import { ENV } from "@/config";
import { NextRequest, NextResponse } from "next/server";
import { accessCookieName, cookieOptions, refreshCookieName } from "./config";
import type { TokenPair, TokenType } from "./types";
import { parseDurationToSeconds } from "./utils";

// Set Cookies
export function setAuthCookies(
    response: NextResponse,
    tokenPair: TokenPair
): void {
    const { accessToken, refreshToken } = tokenPair;

    const accessCookieOptions = cookieOptions(
        parseDurationToSeconds(ENV.AUTH.ACCESS.EXPIRY)
    );
    const refreshCookieOptions = cookieOptions(
        parseDurationToSeconds(ENV.AUTH.REFRESH.EXPIRY)
    );

    response.cookies.set(accessCookieName, accessToken, accessCookieOptions);
    response.cookies.set(refreshCookieName, refreshToken, refreshCookieOptions);
}

export function clearAuthCookies(response: NextResponse): void {
    const clearCookieOptions = cookieOptions(0);
    response.cookies.set(accessCookieName, "", clearCookieOptions);
    response.cookies.set(refreshCookieName, "", clearCookieOptions);
}

// Extract Token
function extractBearerToken(request: NextRequest): string | null {
    const header = request.headers.get("authorization");
    if (!header) return null;

    const match = header.match(/^Bearer\s+(.+)$/i);
    if (!match) return null;

    const token = match[1]?.trim();
    if (!token) return null;

    return token;
}

function extractCookieToken(
    request: NextRequest,
    cookieName: string
): string | null {
    const cookie = request.cookies.get(cookieName);
    if (!cookie) return null;

    const token = cookie.value.trim();
    if (!token) return null;

    return token;
}

function extractToken(request: NextRequest, type: TokenType): string | null {
    const headerToken = extractBearerToken(request);
    if (headerToken) return headerToken;

    const cookieToken = extractCookieToken(request, type);
    if (cookieToken) return cookieToken;

    return null;
}

export function extractAccessToken(request: NextRequest) {
    return extractToken(request, "access");
}

export function extractRefreshToken(request: NextRequest) {
    return extractToken(request, "refresh");
}
