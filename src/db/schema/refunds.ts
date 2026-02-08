import { sql } from "drizzle-orm";
import {
    check,
    decimal,
    index,
    pgTable,
    text,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { refundStatusEnum } from "./enums";
import { payments } from "./payments";
import { timestamps } from "./timestamps";
import { users } from "./users";

export const refunds = pgTable(
    "refunds",
    {
        id: uuid("id").primaryKey().defaultRandom(),

        paymentId: uuid("payment_id")
            .notNull()
            .references(() => payments.id, { onDelete: "cascade" }),
        userId: uuid("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        processedBy: uuid("processed_by").references(() => users.id, {
            onDelete: "set null",
        }),

        refundNumber: varchar("refund_number", { length: 100 })
            .notNull()
            .unique(),
        stripeRefundId: varchar("stripe_refund_id", { length: 255 }).unique(),

        amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
        currency: varchar("currency", { length: 10 }).notNull().default("INR"),

        reason: text("reason").notNull(),
        status: refundStatusEnum("status").notNull().default("pending"),

        processedAt: varchar("processed_at", { length: 50 }),
        notes: text("notes"),

        createdAt: timestamps.createdAt,
        updatedAt: timestamps.updatedAt,
    },
    table => [
        index("idx_refunds_payment_id").on(table.paymentId),
        index("idx_refunds_user_id").on(table.userId),
        index("idx_refunds_status").on(table.status),
        index("idx_refunds_created_at").on(table.createdAt),
        check("chk_refund_amount", sql`${table.amount} > 0`),
    ]
);

export type Refund = typeof refunds.$inferSelect;
export type NewRefund = typeof refunds.$inferInsert;
