import {
    boolean,
    date,
    decimal,
    integer,
    pgTable,
    text,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { pharmacyCategoryEnum } from "../enums";

export const pharmacyItems = pgTable("pharmacy_items", {
    id: uuid("id").primaryKey().defaultRandom(),

    name: varchar("name", { length: 255 }).notNull().unique(),
    strength: varchar("strength", { length: 255 }),
    description: text("description"),
    manufacturer: varchar("manufacturer", { length: 255 }),
    category: pharmacyCategoryEnum("category").notNull().default("medicine"),
    imageUrl: varchar("image_url", { length: 500 }),

    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    requiresPrescription: boolean("requires_prescription")
        .notNull()
        .default(true),
    stock: integer("stock").notNull(),
    expiryDate: date("expiry_date").notNull(),

    isActive: boolean("is_active").notNull().default(true),
});

export type PharmacyItem = typeof pharmacyItems.$inferSelect;
export type NewPharmacyItem = typeof pharmacyItems.$inferInsert;
