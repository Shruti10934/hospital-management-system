import { z } from "zod";
import { emailSchema, nameSchema, phoneSchema } from "./common";

export const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
    );

export const verificationCodeSchema = z
    .string()
    .regex(/^\d{6}$/, "Verification Code must be exactly 6 digits");

export const registerSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema,
});

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, "Password is required"),
});

export const requestVerificationCodeSchema = z.object({ email: emailSchema });
export const verifyEmailSchema = z.object({
    email: emailSchema,
    code: verificationCodeSchema,
});

export type Password = z.infer<typeof passwordSchema>;
export type VerificationCode = z.infer<typeof verificationCodeSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RequestVerificationCodeInput = z.infer<
    typeof requestVerificationCodeSchema
>;
