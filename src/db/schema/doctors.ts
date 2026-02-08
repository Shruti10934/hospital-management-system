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
    time,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { departments } from "./departments";
import { leaveStatusEnum } from "./enums";
import { timestamps } from "./timestamps";
import { users } from "./users";

export const doctors = pgTable(
    "doctors",
    {
        userId: uuid("user_id")
            .primaryKey()
            .references(() => users.id, { onDelete: "cascade" }),

        departmentId: integer("department_id").references(
            () => departments.id,
            { onDelete: "set null" }
        ),

        licenseNumber: varchar("license_number", { length: 255 })
            .notNull()
            .unique(),
        qualifications: text("qualifications").notNull(),
        specialization: varchar("specialization", { length: 255 }).notNull(),
        experienceYears: integer("experience_years").notNull(),
        bio: text("bio"),
        avatarUrl: varchar("avatar_url", { length: 500 }),

        baseSalary: decimal("base_salary", {
            precision: 12,
            scale: 2,
        }).notNull(),
        commissionRate: decimal("commission_rate", { precision: 5, scale: 2 })
            .notNull()
            .default("5.00"),
        consultationFee: decimal("consultation_fee", {
            precision: 10,
            scale: 2,
        })
            .notNull()
            .default("500.00"),

        isActive: boolean("is_active").notNull().default(true),
    },
    table => [
        index("idx_doctors_department_id").on(table.departmentId),
        index("idx_doctors_specialization").on(table.specialization),
        check("chk_experience_years", sql`${table.experienceYears} >= 0`),
        check(
            "chk_commission_rate",
            sql`${table.commissionRate} >= 0 AND ${table.commissionRate} <= 100`
        ),
        check("chk_consultation_fee", sql`${table.consultationFee} >= 0`),
        check("chk_base_salary", sql`${table.baseSalary} >= 0`),
    ]
);

export const doctorAvailability = pgTable(
    "doctor_availability",
    {
        id: uuid("id").primaryKey().defaultRandom(),

        doctorId: uuid("doctor_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),

        workingDays: varchar("working_days", { length: 255 }).notNull(),
        startTime: time("start_time").notNull(),
        endTime: time("end_time").notNull(),
        slotDurationMinutes: integer("slot_duration_minutes").notNull(),
    },
    table => [
        index("idx_doctor_availability_doctor_id").on(table.doctorId),
        check("chk_slot_duration", sql`${table.slotDurationMinutes} > 0`),
    ]
);

export const doctorLeaves = pgTable(
    "doctor_leaves",
    {
        id: uuid("id").primaryKey().defaultRandom(),

        doctorId: uuid("doctor_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),

        startDate: date("start_date").notNull(),
        endDate: date("end_date").notNull(),
        reason: text("reason").notNull(),
        status: leaveStatusEnum("status").notNull().default("pending"),

        createdAt: timestamps.createdAt,
    },
    table => [
        index("idx_doctor_leaves_doctor_id").on(table.doctorId),
        index("idx_doctor_leaves_dates").on(table.startDate, table.endDate),
        check("chk_leave_dates", sql`${table.endDate} >= ${table.startDate}`),
    ]
);

export type Doctor = typeof doctors.$inferSelect;
export type NewDoctor = typeof doctors.$inferInsert;
export type DoctorAvailability = typeof doctorAvailability.$inferSelect;
export type NewDoctorAvailability = typeof doctorAvailability.$inferInsert;
export type DoctorLeave = typeof doctorLeaves.$inferSelect;
export type NewDoctorLeave = typeof doctorLeaves.$inferInsert;
