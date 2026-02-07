import { appointmentStatusEnum, appointmentTypeEnum } from "@/lib/db/enums";
import { date, pgTable, time, uuid } from "drizzle-orm/pg-core";
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

    appointmentType: appointmentTypeEnum("appointment_type")
        .notNull()
        .default("in_person"),
    scheduledDate: date("scheduled_date").notNull(),
    scheduledTime: time("scheduled_time").notNull(),

    status: appointmentStatusEnum("status").notNull().default("pending"),

    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
});

export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;
