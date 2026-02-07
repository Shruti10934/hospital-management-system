import {
    char,
    jsonb,
    pgTable,
    serial,
    text,
    varchar,
} from "drizzle-orm/pg-core";

export type FacilityPoints = { title: string; displayOrder?: number };
export type Facilities = {
    name: string;
    description?: string;
    isActive: boolean;
    facilityPoints: FacilityPoints[];
};

export const departments = pgTable("departments", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    phone: char("phone", { length: 10 }).notNull().unique(),

    description: text("description"),

    facilities: jsonb("facilities").$type<Facilities[]>().notNull(),
});

export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;
