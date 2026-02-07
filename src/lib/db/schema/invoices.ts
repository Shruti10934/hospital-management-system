import { decimal, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { payments } from "./payments";
import { timestamps } from "./timestamps";
import { users } from "./users";

export const invoices = pgTable("invoices", {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "set null" }),
    paymentId: uuid("payment_id")
        .notNull()
        .references(() => payments.id, { onDelete: "cascade" }),

    invoiceNumber: varchar("invoice_number", { length: 255 }).unique(),

    amount: decimal("amount", { precision: 10, scale: 2 }),
    tax: decimal("tax", { precision: 10, scale: 2 }),
    pdfUrl: text("pdf_url"),

    createdAt: timestamps.createdAt,
});

export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;
