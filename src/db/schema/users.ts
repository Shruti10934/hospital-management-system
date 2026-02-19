import {
    boolean,
    char,
    index,
    pgTable,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { userRoleEnum, verificationTokenTypeEnum } from "./enums";
import { timestamps } from "./timestamps";

export const users = pgTable(
    "users",
    {
        id: uuid("id").primaryKey().defaultRandom(),

        name: varchar("name", { length: 255 }).notNull(),
        email: varchar("email", { length: 255 }).notNull().unique(),
        phone: char("phone", { length: 10 }).notNull().unique(),

        password: varchar("password", { length: 255 }).notNull(),

        role: userRoleEnum("role").notNull().default("patient"),

        isVerified: boolean("is_verified").notNull().default(false),
        isActive: boolean("is_active").notNull().default(true),

        createdAt: timestamps.createdAt,
        updatedAt: timestamps.updatedAt,
    },
    table => [index("idx_users_role").on(table.role)]
);

export const verificationTokens = pgTable(
    "verification_tokens",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        userId: uuid("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),

        token: varchar("token", { length: 255 }).notNull().unique(),
        type: verificationTokenTypeEnum("type").notNull(),
        expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),

        createdAt: timestamps.createdAt,
    },
    table => [
        index("idx_verification_tokens_user_id").on(table.userId),
        index("idx_verification_tokens_token").on(table.token),
    ]
);

export const refreshTokens = pgTable(
    "refresh_tokens",
    {
        tokenHash: varchar("token_hash", { length: 255 }).primaryKey(),
        userId: uuid("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),

        createdAt: timestamps.createdAt,
    },
    table => [index("idx_refresh_tokens_user_id").on(table.userId)]
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type VerificationToken = typeof verificationTokens.$inferSelect;
export type NewVerificationToken = typeof verificationTokens.$inferInsert;
export type RefreshToken = typeof refreshTokens.$inferSelect;
export type NewRefreshToken = typeof refreshTokens.$inferInsert;
