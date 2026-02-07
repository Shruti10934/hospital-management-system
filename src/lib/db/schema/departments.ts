import {
    boolean,
    char,
    integer,
    pgTable,
    serial,
    text,
    varchar,
} from "drizzle-orm/pg-core";

export const departments = pgTable("departments", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    phone: char("phone", { length: 10 }).notNull().unique(),

    description: text("description"),
});

export const facilities = pgTable("facilities", {
    id: serial("id").primaryKey(),

    departmentId: integer("department_id")
        .notNull()
        .references(() => departments.id, { onDelete: "restrict" }),

    name: varchar("name", { length: 150 }).notNull(),
    description: text("description"),

    isActive: boolean("is_active").notNull().default(true),
});

export const facilityPoints = pgTable("facility_points", {
    id: serial("id").primaryKey(),

    facilityId: integer("facility_id")
        .notNull()
        .references(() => facilities.id, { onDelete: "cascade" }),

    title: text("title").notNull(),
    displayOrder: integer("display_order").notNull().default(0),
});

export type FacilityPoint = typeof facilityPoints.$inferSelect;
export type NewFacilityPoint = typeof facilityPoints.$inferInsert;
export type Facility = typeof facilities.$inferSelect;
export type NewFacility = typeof facilities.$inferInsert;
export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;
