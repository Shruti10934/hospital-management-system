import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { appointments } from "./appointments";
import { timestamps } from "./timestamps";

export const consultations = pgTable("consultations", {
    id: uuid("id").primaryKey().defaultRandom(),

    appointmentId: uuid("appointment_id")
        .notNull()
        .references(() => appointments.id, { onDelete: "cascade" }),

    symptoms: text("symptoms").notNull(),
    diagnosis: text("diagnosis").notNull(),
    vitals: text("vitals"),
    notes: text("notes"),

    createdAt: timestamps.createdAt,
});

export type Consultation = typeof consultations.$inferSelect;
export type NewConsultation = typeof consultations.$inferInsert;
