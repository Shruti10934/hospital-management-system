import {
    HttpStatus,
    successResponse,
    tryCatchWrapper,
    validateBody,
} from "@/lib/api";
import { PublicUser } from "@/lib/repositories";
import { authService } from "@/lib/services";
import { registerSchema } from "@/lib/validations";
import { NextRequest } from "next/server";

type RegisterUserResponseType = { user: PublicUser };

export const POST = tryCatchWrapper(async (request: NextRequest) => {
    const body = await validateBody(request, registerSchema);

    const user = await authService.registerUser(body);

    return successResponse<RegisterUserResponseType>(
        { user },
        "Registered successfully. Please check your email to verify your account.",
        HttpStatus.Created
    );
});
