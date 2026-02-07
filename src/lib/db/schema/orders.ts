import { orderStatusEnum } from "@/lib/db/enums";
import { decimal, integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { patientDocuments } from "./patients";
import { pharmacyItems } from "./pharmacy";
import { timestamps } from "./timestamps";
import { users } from "./users";

export const orders = pgTable("orders", {
    id: uuid("id").primaryKey().defaultRandom(),

    patientId: uuid("patient_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    prescriptionId: uuid("prescription_id").references(
        () => patientDocuments.id,
        { onDelete: "cascade" }
    ),

    subTotal: decimal("sub_total", { precision: 12, scale: 2 }).notNull(),
    taxAmount: decimal("tax_amount", { precision: 12, scale: 2 })
        .notNull()
        .default("0"),
    discount: decimal("discount", { precision: 12, scale: 2 })
        .notNull()
        .default("0"),
    totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(),

    status: orderStatusEnum("status").notNull().default("pending"),

    createdAt: timestamps.createdAt,
});

export const orderItems = pgTable("order_items", {
    id: uuid("id").primaryKey().defaultRandom(),

    orderId: uuid("order_id")
        .notNull()
        .references(() => orders.id, { onDelete: "cascade" }),
    itemId: uuid("item_id")
        .notNull()
        .references(() => pharmacyItems.id, { onDelete: "set null" }),

    quantity: integer("quantity").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
