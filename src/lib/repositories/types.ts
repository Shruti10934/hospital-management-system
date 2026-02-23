import { db } from "@/db";
import { RefreshToken, User, VerificationCode } from "@/db/schema";
import { VerificationCodeType } from "@/db/types";

export type Database = typeof db;
export type Transaction = Parameters<Parameters<Database["transaction"]>[0]>[0];
export type DBContext = Database | Transaction;

export type PublicUser = Omit<User, "password">;
export type PublicRefreshToken = RefreshToken;
export type PublicVerificationCode = VerificationCode;
export type VerificationCodeType = (typeof VerificationCodeType)[number];
