import { appointmentStatusEnum, appointmentTypeEnum } from "./enums";
import { sql } from "drizzle-orm";
import {
    check,
    index,
    integer,
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";
import { timestamps } from "./timestamps";
import { users } from "./users";

export const appointments = pgTable(
    "appointments",
    {
        id: uuid("id").primaryKey().defaultRandom(),

        patientId: uuid("patient_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        doctorId: uuid("doctor_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),

        type: appointmentTypeEnum("type").notNull().default("in_person"),
        scheduledAt: timestamp("scheduled_at", {
            withTimezone: true,
        }).notNull(),
        durationMinutes: integer("duration_minutes").notNull().default(30),

        status: appointmentStatusEnum("status").notNull().default("pending"),
        cancellationReason: text("cancellation_reason"),

        createdAt: timestamps.createdAt,
        updatedAt: timestamps.updatedAt,
    },
    table => [
        index("idx_appointments_patient_id").on(table.patientId),
        index("idx_appointments_doctor_id").on(table.doctorId),
        index("idx_appointments_scheduled_at").on(table.scheduledAt),
        index("idx_appointments_status").on(table.status),
        index("idx_appointments_doctor_schedule").on(
            table.doctorId,
            table.scheduledAt
        ),
        check("chk_duration_minutes", sql`${table.durationMinutes} > 0`),
    ]
);

export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;
