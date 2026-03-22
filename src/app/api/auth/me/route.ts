import { HttpStatus, successResponse, tryCatchWrapper } from "@/lib/api";
import { authenticate } from "@/lib/auth";
import { PublicUser } from "@/lib/repositories";
import { authService } from "@/lib/services";
import { NextRequest } from "next/server";

type MeResponseType = { user: PublicUser };

export const GET = tryCatchWrapper(async (request: NextRequest) => {
    const { sub: userId } = await authenticate(request);
    const user = await authService.getMe(userId);

    return successResponse<MeResponseType>(
        { user },
        "User fetched successfully",
        HttpStatus.Ok
    );
});
