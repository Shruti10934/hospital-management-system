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
import { payments } from "./payments";
import { timestamps } from "./timestamps";
import { users } from "./users";

export const invoices = pgTable(
    "invoices",
    {
        id: uuid("id").primaryKey().defaultRandom(),

        userId: uuid("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "set null" }),
        paymentId: uuid("payment_id")
            .notNull()
            .references(() => payments.id, { onDelete: "cascade" }),

        invoiceNumber: varchar("invoice_number", { length: 255 })
            .notNull()
            .unique(),

        subtotal: decimal("subtotal", { precision: 12, scale: 2 }).notNull(),
        taxAmount: decimal("tax_amount", { precision: 12, scale: 2 })
            .notNull()
            .default("0"),
        discount: decimal("discount", { precision: 12, scale: 2 })
            .notNull()
            .default("0"),
        totalAmount: decimal("total_amount", {
            precision: 12,
            scale: 2,
        }).notNull(),

        pdfUrl: text("pdf_url"),

        createdAt: timestamps.createdAt,
    },
    table => [
        index("idx_invoices_user_id").on(table.userId),
        index("idx_invoices_payment_id").on(table.paymentId),
        index("idx_invoices_created_at").on(table.createdAt),
        check("chk_invoice_subtotal", sql`${table.subtotal} >= 0`),
        check("chk_invoice_tax", sql`${table.taxAmount} >= 0`),
        check("chk_invoice_discount", sql`${table.discount} >= 0`),
        check("chk_invoice_total", sql`${table.totalAmount} >= 0`),
    ]
);

export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;
