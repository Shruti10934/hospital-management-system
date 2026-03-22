import { HttpStatus, successResponse, tryCatchWrapper } from "@/lib/api";
import { clearAuthCookies, extractRefreshToken } from "@/lib/auth";
import { authService } from "@/lib/services";
import { NextRequest } from "next/server";

export const POST = tryCatchWrapper(async (request: NextRequest) => {
    const refreshToken = extractRefreshToken(request);

    if (refreshToken) await authService.logout(refreshToken).catch(() => {});

    const response = successResponse<null>(
        null,
        "Logged out successfully",
        HttpStatus.Ok
    );
    clearAuthCookies(response);

    return response;
});
