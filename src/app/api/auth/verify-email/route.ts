import {
    HttpStatus,
    successResponse,
    tryCatchWrapper,
    validateBody,
} from "@/lib/api";
import { PublicUser } from "@/lib/repositories";
import { authService } from "@/lib/services";
import { verifyEmailSchema } from "@/lib/validations";
import { NextRequest } from "next/server";

type VerifyEmailResponseType = { user: PublicUser };

export const POST = tryCatchWrapper(async (request: NextRequest) => {
    const body = await validateBody(request, verifyEmailSchema);

    const user = await authService.verifyEmail(body);

    return successResponse<VerifyEmailResponseType>(
        { user },
        "Email verified successfully. Please login to continue.",
        HttpStatus.Ok
    );
});
