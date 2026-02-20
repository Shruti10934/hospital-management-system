import { ENV } from "@/config";
import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, ENV.SALT_ROUNDS);
}

export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}
