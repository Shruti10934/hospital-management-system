import { orderStatusEnum } from "@/lib/db/enums";
import { decimal, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { medicines } from "./medicines";
import { timestamps } from "./timestamps";
import { users } from "./users";

export const orders = pgTable("orders", {
    id: uuid("id").primaryKey().defaultRandom(),

    patientId: uuid("patient_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),

    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
    status: orderStatusEnum("status").notNull().default("pending"),

    createdAt: timestamps.createdAt,
});

export const orderItems = pgTable("order_items", {
    id: uuid("id").primaryKey().defaultRandom(),

    orderId: uuid("order_id")
        .notNull()
        .references(() => orders.id, { onDelete: "cascade" }),
    medicineId: uuid("medicine_id")
        .notNull()
        .references(() => medicines.id, { onDelete: "set null" }),

    quantity: integer("quantity").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});

export const orderPrescriptions = pgTable("order_prescriptions", {
    id: uuid("id").primaryKey().defaultRandom(),

    orderId: uuid("order_id")
        .notNull()
        .references(() => orders.id, { onDelete: "cascade" }),

    fileUrl: text("file_url"),

    createdAt: timestamps.createdAt,
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
export type OrderPrescription = typeof orderPrescriptions.$inferSelect;
export type NewOrderPrescription = typeof orderPrescriptions.$inferInsert;
