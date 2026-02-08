import { sql } from "drizzle-orm";
import {
    boolean,
    check,
    date,
    decimal,
    index,
    integer,
    pgTable,
    text,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { pharmacyCategoryEnum } from "./enums";
import { timestamps } from "./timestamps";

export const pharmacyItems = pgTable(
    "pharmacy_items",
    {
        id: uuid("id").primaryKey().defaultRandom(),

        name: varchar("name", { length: 255 }).notNull(),
        strength: varchar("strength", { length: 255 }),
        description: text("description"),
        manufacturer: varchar("manufacturer", { length: 255 }),
        category: pharmacyCategoryEnum("category")
            .notNull()
            .default("medicine"),
        imageUrl: varchar("image_url", { length: 500 }),

        price: decimal("price", { precision: 10, scale: 2 }).notNull(),
        costPrice: decimal("cost_price", { precision: 10, scale: 2 }).notNull(),
        requiresPrescription: boolean("requires_prescription")
            .notNull()
            .default(true),
        stock: integer("stock").notNull().default(0),
        expiryDate: date("expiry_date"),

        isActive: boolean("is_active").notNull().default(true),

        createdAt: timestamps.createdAt,
        updatedAt: timestamps.updatedAt,
    },
    table => [
        index("idx_pharmacy_items_name").on(table.name),
        index("idx_pharmacy_items_category").on(table.category),
        index("idx_pharmacy_items_requires_prescription").on(
            table.requiresPrescription
        ),
        index("idx_pharmacy_items_manufacturer").on(table.manufacturer),
        check("chk_pharmacy_price", sql`${table.price} >= 0`),
        check("chk_pharmacy_stock", sql`${table.stock} >= 0`),
    ]
);

export type PharmacyItem = typeof pharmacyItems.$inferSelect;
export type NewPharmacyItem = typeof pharmacyItems.$inferInsert;
