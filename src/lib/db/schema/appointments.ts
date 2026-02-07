import { appointmentStatusEnum, appointmentTypeEnum } from "@/lib/db/enums";
import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./timestamps";
import { users } from "./users";

export const appointments = pgTable("appointments", {
    id: uuid("id").primaryKey().defaultRandom(),

    patientId: uuid("patient_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    doctorId: uuid("doctor_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),

    type: appointmentTypeEnum("type").notNull().default("in_person"),
    scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
    durationMinutes: integer("duration_minutes").notNull().default(30),

    status: appointmentStatusEnum("status").notNull().default("pending"),

    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
});

export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;
