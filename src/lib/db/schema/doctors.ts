import {
    boolean,
    date,
    decimal,
    integer,
    pgTable,
    text,
    time,
    uuid,
} from "drizzle-orm/pg-core";
import { departments } from "./departments";
import { users } from "./users";

export const doctors = pgTable("doctors", {
    userId: uuid("user_id")
        .primaryKey()
        .references(() => users.id, { onDelete: "cascade" }),

    departmentId: integer("department_id").references(() => departments.id, {
        onDelete: "set null",
    }),

    qualifications: text("qualifications").notNull(),
    experienceYears: integer("experience_years").notNull(),
    bio: text("bio").notNull(),

    consultationFee: decimal("consultation_fee", {
        precision: 10,
        scale: 2,
    }).notNull(),

    isActive: boolean("is_active").notNull().default(true),
});

export const doctorAvailability = pgTable("doctor_availability", {
    id: uuid("id").primaryKey().defaultRandom(),

    doctorId: uuid("doctor_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),

    dayOfWeek: integer("day_of_week").notNull(),
    startTime: time("start_time").notNull(),
    endTime: time("end_time").notNull(),
    slotDurationMinutes: integer("slot_duration_minutes").notNull(),
});

export const doctorLeaves = pgTable("doctor_leaves", {
    id: uuid("id").primaryKey(),

    doctorId: uuid("doctor_id").references(() => users.id),

    startDate: date("start_date").notNull(),
    endDate: date("end_date").notNull(),
    reason: text("reason").notNull(),
});

export type Doctor = typeof doctors.$inferSelect;
export type NewDoctor = typeof doctors.$inferInsert;
export type DoctorAvailability = typeof doctorAvailability.$inferSelect;
export type NewDoctorAvailability = typeof doctorAvailability.$inferInsert;
export type DoctorLeave = typeof doctorLeaves.$inferSelect;
export type NewDoctorLeave = typeof doctorLeaves.$inferInsert;
