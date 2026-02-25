import { NextRequest } from "next/server";
import type { RequestContext } from "./types";

// Generate a unique request ID (UUID v4)
export function generateRequestId(): string {
    // Use crypto.randomUUID if available
    if (typeof crypto !== "undefined" && crypto.randomUUID)
        return crypto.randomUUID();

    // Fallback UUID
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

// Get client IP from request headers
export function getClientIp(request: NextRequest): string | null {
    // X-Forwarded-For header
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) return forwardedFor.split(",")[0].trim();

    // X-Real-IP header
    const realIp = request.headers.get("x-real-ip");
    if (realIp) return realIp;

    // Cloudflare
    const cfConnectingIp = request.headers.get("cf-connecting-ip");
    if (cfConnectingIp) return cfConnectingIp;

    // Vercel
    const vercelForwardedFor = request.headers.get("x-vercel-forwarded-for");
    if (vercelForwardedFor) return vercelForwardedFor.split(",")[0].trim();

    return null;
}

// Get user agent from request
export function getUserAgent(request: NextRequest): string | null {
    return request.headers.get("user-agent");
}

// Build request context object
export function buildRequestContext(
    request: NextRequest,
    requestId?: string
): RequestContext {
    return {
        requestId: requestId ?? generateRequestId(),
        clientIp: getClientIp(request),
        userAgent: getUserAgent(request),
        timestamp: new Date().toISOString(),
        path: request.nextUrl.pathname,
        method: request.method,
    };
}
