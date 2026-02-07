import { paymentStatusEnum } from "@/lib/db/enums";
import { decimal, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { appointments } from "./appointments";
import { orders } from "./orders";
import { timestamps } from "./timestamps";
import { users } from "./users";

export const payments = pgTable("payments", {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),

    appointmentId: uuid("appointment_id").references(() => appointments.id, {
        onDelete: "set null",
    }),
    orderId: uuid("order_id").references(() => orders.id, {
        onDelete: "set null",
    }),

    stripePaymentIntentId: varchar("stripe_payment_intent_id", {
        length: 255,
    }).unique(),

    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 10 }).notNull(),

    status: paymentStatusEnum("status").notNull().default("pending"),

    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
});

export const paymentEvents = pgTable("payment_events", {
    id: uuid("id").primaryKey().defaultRandom(),

    paymentId: uuid("payment_id")
        .notNull()
        .references(() => payments.id, { onDelete: "cascade" }),

    stripeEventId: varchar("stripe_event_id", { length: 255 }).unique(),
    eventType: varchar("event_type", { length: 100 }),
    payload: text("payload"),

    createdAt: timestamps.createdAt,
});

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
export type PaymentEvent = typeof paymentEvents.$inferSelect;
export type NewPaymentEvent = typeof paymentEvents.$inferInsert;
