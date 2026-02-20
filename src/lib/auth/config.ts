import { ENV } from "@/config";

// Cookie Configs
export const accessCookieName = "access_token";
export const refreshCookieName = "refresh_token";

export function cookieOptions(maxAge: number) {
    const isProduction = ENV.NODE_ENV === "production";
    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax" as const,
        path: "/",
        maxAge,
    };
}
