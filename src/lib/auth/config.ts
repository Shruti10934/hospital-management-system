export const accessCookieName = "access_token";
export const refreshCookieName = "refresh_token";

export const cookieOptions = (secure: boolean, maxAge: number) => ({
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge,
});
