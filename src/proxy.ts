import { errorResponse, logger } from "@/lib/api";
import { extractAccessToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const COMPONENT = "MIDDLEWARE";

const PublicApiPaths = [
    "/api/auth/register",
    "/api/auth/verify-email",
    "/api/auth/login",
    "/api/auth/login/request-otp",
    "/api/auth/login/verify-otp",
    "/api/auth/refresh",
] as const;

function isPublicApiPath(pathname: string): boolean {
    return PublicApiPaths.some(
        path => pathname === path || pathname === `${path}/`
    );
}

export async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // Allow non-API routes
    if (!path.startsWith("/api")) return NextResponse.next();

    // Allow public auth routes
    if (isPublicApiPath(path)) return NextResponse.next();

    // Block if no access token
    const token = extractAccessToken(req);
    if (!token) {
        logger.error({ component: COMPONENT, path }, "Unauthorized");
        return errorResponse("Authentication required", 401);
    }

    return NextResponse.next();
}

export const config = { matcher: ["/api/:path*"] };
