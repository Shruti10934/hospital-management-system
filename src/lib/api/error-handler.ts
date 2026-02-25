import { ENV } from "@/config";
import { ZodError } from "zod";
import { ApiError, ValidationError } from "./api-error";
import type { ValidationErrorDetail } from "./types";

// Convert ZodError to ValidationError
function handleZodError(error: ZodError): ValidationError {
    const validationErrors: ValidationErrorDetail[] = error.issues.map(
        issue => ({ field: issue.path.join("."), message: issue.message })
    );

    return new ValidationError(validationErrors);
}

// Handle DatabaseError
function handleDatabaseError(error: Error): ApiError {
    const message = error.message.toLowerCase();

    // Unique constraint
    if (message.includes("unique") || message.includes("duplicate"))
        return ApiError.conflict("Resource already exists");

    // Foreign key constraint
    if (
        message.includes("foreign key") ||
        message.includes("violates foreign key")
    )
        return ApiError.badRequest("Related resource not found");

    // Not null constraint
    if (message.includes("not-null") || message.includes("null value"))
        return ApiError.badRequest("Required field is missing");

    // Connection errors
    if (message.includes("connection") || message.includes("econnrefused"))
        return ApiError.serviceUnavailable("Database connection failed");

    // Default database error
    return ApiError.internalServerError("Database operation failed");
}

// Check database error
function isDatabaseError(error: unknown): boolean {
    if (!(error instanceof Error)) return false;

    const name = error.name.toLowerCase();
    const message = error.message.toLowerCase();

    return (
        name.includes("postgres") ||
        name.includes("drizzle") ||
        name.includes("database") ||
        message.includes("postgres") ||
        message.includes("relation") ||
        message.includes("constraint")
    );
}

export function handleError(error: unknown): ApiError {
    // Already an ApiError
    if (error instanceof ApiError) return error;

    // Zod validation error
    if (error instanceof ZodError) return handleZodError(error);

    // Database errors
    if (isDatabaseError(error)) return handleDatabaseError(error as Error);

    // Standard Error
    if (error instanceof Error) {
        // Don't expose internal error messages in production
        if (ENV.NODE_ENV === "production")
            return ApiError.internalServerError();

        return ApiError.internalServerError(error.message);
    }

    return ApiError.internalServerError();
}
