import { LogLevel } from "@/lib/api";

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) throw new Error("NODE_ENV is not defined!");
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
if (!APP_URL) throw new Error("NEXT_PUBLIC_APP_URL is not defined!");
const SALT_ROUNDS = process.env.SALT_ROUNDS;
if (!SALT_ROUNDS) throw new Error("SALT_ROUNDS is not defined!");

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) throw new Error("DATABASE_URL is not defined!");

const JWT_ALGORITHM = process.env.TOKEN_ALGORITHM;
if (!JWT_ALGORITHM) throw new Error("TOKEN_ALGORITHM is not defined!");
const JWT_ISSUER = process.env.TOKEN_ISSUER;
if (!JWT_ISSUER) throw new Error("TOKEN_ISSUER is not defined!");
const JWT_AUDIENCE = process.env.TOKEN_AUDIENCE;
if (!JWT_AUDIENCE) throw new Error("TOKEN_AUDIENCE is not defined!");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
if (!ACCESS_TOKEN_SECRET)
    throw new Error("ACCESS_TOKEN_SECRET is not defined!");
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
if (!REFRESH_TOKEN_SECRET)
    throw new Error("REFRESH_TOKEN_SECRET is not defined!");
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
if (!ACCESS_TOKEN_EXPIRY)
    throw new Error("ACCESS_TOKEN_EXPIRY is not defined!");
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
if (!REFRESH_TOKEN_EXPIRY)
    throw new Error("REFRESH_TOKEN_EXPIRY is not defined!");

const VERIFICATION_TOKEN_LENGTH = process.env.VERIFICATION_TOKEN_LENGTH;
if (!VERIFICATION_TOKEN_LENGTH)
    throw new Error("VERIFICATION_TOKEN_LENGTH is not defined!");
const VERIFICATION_TOKEN_EXPIRY = process.env.VERIFICATION_TOKEN_EXPIRY_MINUTES;
if (!VERIFICATION_TOKEN_EXPIRY)
    throw new Error("VERIFICATION_TOKEN_EXPIRY_MINUTES is not defined!");

const BREVO_API_KEY = process.env.BREVO_API_KEY;
if (!BREVO_API_KEY) throw new Error("BREVO_API_KEY is not defined!");
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL;
if (!BREVO_SENDER_EMAIL) throw new Error("BREVO_SENDER_EMAIL is not defined!");
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME;
if (!BREVO_SENDER_NAME) throw new Error("BREVO_SENDER_NAME is not defined!");
const BREVO_REPLY_TO_EMAIL = process.env.BREVO_REPLY_TO_EMAIL;
if (!BREVO_REPLY_TO_EMAIL)
    throw new Error("BREVO_REPLY_TO_EMAIL is not defined!");

const LOG_LEVEL = process.env.LOG_LEVEL || "info";

export const ENV = {
    NODE_ENV,
    LOG_LEVEL: LOG_LEVEL as LogLevel,
    DB: { URL: DB_URL },
    SALT_ROUNDS: parseInt(SALT_ROUNDS),
    JWT: {
        ALGORITHM: JWT_ALGORITHM,
        ISSUER: JWT_ISSUER,
        AUDIENCE: JWT_AUDIENCE,
    },
    AUTH: {
        ACCESS: { SECRET: ACCESS_TOKEN_SECRET, EXPIRY: ACCESS_TOKEN_EXPIRY },
        REFRESH: { SECRET: REFRESH_TOKEN_SECRET, EXPIRY: REFRESH_TOKEN_EXPIRY },
        VERIFICATION: {
            LENGTH: parseInt(VERIFICATION_TOKEN_LENGTH),
            EXPIRY: parseInt(VERIFICATION_TOKEN_EXPIRY),
        },
    },
    BREVO: {
        API_KEY: BREVO_API_KEY,
        SENDER_EMAIL: BREVO_SENDER_EMAIL,
        SENDER_NAME: BREVO_SENDER_NAME,
        REPLY_TO_EMAIL: BREVO_REPLY_TO_EMAIL,
    },
    APP_URL: APP_URL,
};
