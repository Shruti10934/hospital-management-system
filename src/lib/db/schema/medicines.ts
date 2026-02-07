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

export const medicines = pgTable("medicines", {
    id: uuid("id").primaryKey().defaultRandom(),

    name: varchar("name", { length: 255 }).notNull().unique(),
    description: text("description"),

    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    requiresPrescription: boolean("requires_prescription").notNull(),
    stock: integer("stock").notNull(),
    expiryDate: date("expiry_date").notNull(),

    isActive: boolean("is_active").notNull().default(true),
});

export type Medicine = typeof medicines.$inferSelect;
export type NewMedicine = typeof medicines.$inferInsert;
