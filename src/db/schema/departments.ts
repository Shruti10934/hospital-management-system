import {
    boolean,
    char,
    index,
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

export const departments = pgTable(
    "departments",
    {
        id: serial("id").primaryKey(),

        name: varchar("name", { length: 255 }).notNull(),
        slug: varchar("slug", { length: 255 }).notNull().unique(),
        email: varchar("email", { length: 255 }).notNull().unique(),
        phone: char("phone", { length: 10 }).notNull().unique(),

        description: text("description"),
        imageUrl: varchar("image_url", { length: 500 }),

        facilities: jsonb("facilities").$type<Facilities[]>().notNull(),

        isActive: boolean("is_active").notNull().default(true),
    },
    table => [index("idx_departments_name").on(table.name)]
);

export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;
