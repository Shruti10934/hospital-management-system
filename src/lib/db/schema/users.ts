import { userStatusEnum } from "@/lib/db/enums";
import { boolean, char, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./timestamps";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),

    email: varchar("email", { length: 255 }).notNull().unique(),
    phone: char("phone", { length: 10 }).notNull().unique(),

    password: varchar("password", { length: 255 }).notNull(),

    isVerified: boolean("is_verified").notNull().default(false),
    status: userStatusEnum("status").notNull().default("active"),

    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
