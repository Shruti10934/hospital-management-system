import {
    date,
    jsonb,
    pgTable,
    primaryKey,
    text,
    uniqueIndex,
    uuid
} from "drizzle-orm/pg-core";
import { appointments } from "./appointments";
import { patientDocuments } from "./patients";
import { timestamps } from "./timestamps";

export type Vitals = {
    bloodPressureSystolic?: number;
    bloodPressureDiastolic?: number;
    temperature?: number;
    pulse?: number;
};

export const consultations = pgTable(
    "consultations",
    {
        id: uuid("id").primaryKey().defaultRandom(),

        appointmentId: uuid("appointment_id")
            .notNull()
            .references(() => appointments.id, { onDelete: "cascade" }),

        mainComplaint: text("main_complaint").notNull(),
        currentIllness: text("current_illness"),
        history: text("history"),
        symptoms: text("symptoms").notNull(),
        vitals: jsonb("vitals").$type<Vitals>(),

        diagnosis: text("diagnosis").notNull(),
        treatmentPlan: text("treatment_plan").notNull(),

        followUpInstructions: text("follow_up_instructions"),
        followUpDate: date("follow_up_date"),
        notes: text("notes"),

        createdAt: timestamps.createdAt,
    },
    table => [
        uniqueIndex("idx_consultations_appointment_id").on(table.appointmentId),
    ]
);

export const consultationDocuments = pgTable(
    "consultation_documents",
    {
        consultationId: uuid("consultation_id")
            .notNull()
            .references(() => consultations.id, { onDelete: "cascade" }),
        documentId: uuid("document_id")
            .notNull()
            .references(() => patientDocuments.id, { onDelete: "cascade" }),
    },
    table => [primaryKey({ columns: [table.consultationId, table.documentId] })]
);

export type Consultation = typeof consultations.$inferSelect;
export type NewConsultation = typeof consultations.$inferInsert;
