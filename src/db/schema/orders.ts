import { sql } from "drizzle-orm";
import {
    check,
    decimal,
    index,
    integer,
    pgTable,
    uuid,
} from "drizzle-orm/pg-core";
import { orderStatusEnum } from "./enums";
import { patientDocuments } from "./patients";
import { pharmacyItems } from "./pharmacy";
import { timestamps } from "./timestamps";
import { users } from "./users";

export const orders = pgTable(
    "orders",
    {
        id: uuid("id").primaryKey().defaultRandom(),

        patientId: uuid("patient_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        prescriptionId: uuid("prescription_id").references(
            () => patientDocuments.id,
            { onDelete: "set null" }
        ),

        subTotal: decimal("sub_total", { precision: 12, scale: 2 }).notNull(),
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

        status: orderStatusEnum("status").notNull().default("pending"),

        createdAt: timestamps.createdAt,
        updatedAt: timestamps.updatedAt,
    },
    table => [
        index("idx_orders_patient_id").on(table.patientId),
        index("idx_orders_status").on(table.status),
        index("idx_orders_created_at").on(table.createdAt),
        check("chk_order_subtotal", sql`${table.subTotal} >= 0`),
        check("chk_order_tax", sql`${table.taxAmount} >= 0`),
        check("chk_order_discount", sql`${table.discount} >= 0`),
        check("chk_order_total", sql`${table.totalAmount} >= 0`),
    ]
);

export const orderItems = pgTable(
    "order_items",
    {
        id: uuid("id").primaryKey().defaultRandom(),

        orderId: uuid("order_id")
            .notNull()
            .references(() => orders.id, { onDelete: "cascade" }),
        itemId: uuid("item_id")
            .notNull()
            .references(() => pharmacyItems.id, { onDelete: "restrict" }),

        quantity: integer("quantity").notNull(),
        unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
        totalPrice: decimal("total_price", {
            precision: 10,
            scale: 2,
        }).notNull(),
    },
    table => [
        index("idx_order_items_order_id").on(table.orderId),
        index("idx_order_items_item_id").on(table.itemId),
        check("chk_order_item_quantity", sql`${table.quantity} > 0`),
        check("chk_order_item_unit_price", sql`${table.unitPrice} >= 0`),
        check("chk_order_item_total_price", sql`${table.totalPrice} >= 0`),
    ]
);

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
