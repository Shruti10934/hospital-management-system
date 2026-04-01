import {
    HttpStatus,
    type HttpStatusCode,
    type ValidationErrorDetail,
} from "./types";

export class ApiError extends Error {
    constructor(
        message: string,
        public statusCode: HttpStatusCode = HttpStatus.InternalServerError
    ) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);

        if (Error.captureStackTrace)
            Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            statusCode: this.statusCode,
        };
    }

    static badRequest(message: string = "Bad request") {
        return new ApiError(message, HttpStatus.BadRequest);
    }

    static unauthorized(message: string = "Unauthorized") {
        return new ApiError(message, HttpStatus.Unauthorized);
    }

    static forbidden(message: string = "Forbidden") {
        return new ApiError(message, HttpStatus.Forbidden);
    }

    static notFound(message: string = "Not found") {
        return new ApiError(message, HttpStatus.NotFound);
    }

    static methodNotAllowed(message: string = "Method not allowed") {
        return new ApiError(message, HttpStatus.MethodNotAllowed);
    }

    static conflict(message: string = "Conflict") {
        return new ApiError(message, HttpStatus.Conflict);
    }

    static tooManyRequests(message: string = "Too many requests") {
        return new ApiError(message, HttpStatus.TooManyRequests);
    }

    static internalServerError(message: string = "Internal server error") {
        return new ApiError(message, HttpStatus.InternalServerError);
    }

    static serviceUnavailable(
        message: string = "Service temporarily unavailable"
    ) {
        return new ApiError(message, HttpStatus.ServiceUnavailable);
    }
}

export class ValidationError extends ApiError {
    constructor(public errors: ValidationErrorDetail[]) {
        const message =
            errors.map(e => `${e.field}: ${e.message}`).join("\n") ||
            "Validation failed";
        super(message, HttpStatus.UnprocessableEntity);
    }
}
