import {
    HttpStatus,
    successResponse,
    tryCatchWrapper,
    validateBody,
} from "@/lib/api";
import { setAuthCookies } from "@/lib/auth";
import { PublicUser } from "@/lib/repositories";
import { authService } from "@/lib/services";
import { loginSchema } from "@/lib/validations";
import { NextRequest } from "next/server";

type LoginResponseType = { user: PublicUser };

export const POST = tryCatchWrapper(async (request: NextRequest) => {
    const body = await validateBody(request, loginSchema);

    const { user, tokens } = await authService.login(body);

    const response = successResponse<LoginResponseType>(
        { user },
        "Login successful",
        HttpStatus.Ok
    );
    setAuthCookies(response, tokens);

    return response;
});
