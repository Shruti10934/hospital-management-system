import {
    ApiError,
    errorResponse,
    generateRequestId,
    handleError,
    HttpStatus,
    logger,
    successResponse,
} from "@/lib/api";
import {
    clearAuthCookies,
    extractRefreshToken,
    setAuthCookies,
} from "@/lib/auth";
import { authService } from "@/lib/services";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    const component = "API";
    const requestId = generateRequestId();
    const path = request.nextUrl.pathname;
    const method = request.method;
    const startTime = Date.now();
    logger.info({ component, path, method, requestId }, "Incoming request");

    try {
        const refreshToken = extractRefreshToken(request);
        if (!refreshToken)
            throw ApiError.unauthorized("Refresh token is missing");

        const { tokens } = await authService.refreshTokens(refreshToken);
        const response = successResponse(
            null,
            "Tokens refreshed successfully",
            HttpStatus.Ok
        );
        setAuthCookies(response, tokens);

        logger.info(
            {
                component,
                path,
                method,
                requestId,
                status: response.status,
                duration: Date.now() - startTime,
            },
            "Request completed"
        );

        // Add request ID to response headers
        response.headers.set("X-Request-ID", requestId);
        return response;
    } catch (err) {
        logger.error(
            { err, component, path, method, requestId },
            "Request failed"
        );
        const { message, statusCode } = handleError(err);
        const response = errorResponse(message, statusCode);
        clearAuthCookies(response);

        response.headers.set("X-Request-ID", requestId);
        return response;
    }
};
