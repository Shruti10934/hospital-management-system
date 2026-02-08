import {
    boolean,
    char,
    index,
    pgTable,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { userRoleEnum } from "./enums";
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

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
