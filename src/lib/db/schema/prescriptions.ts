import {
    integer,
    pgTable,
    primaryKey,
    text,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { consultations } from "./consultations";
import { patientDocuments } from "./patients";
import { timestamps } from "./timestamps";

export const prescriptions = pgTable("prescriptions", {
    id: uuid("id").primaryKey().defaultRandom(),

    consultationId: uuid("consultation_id")
        .notNull()
        .references(() => consultations.id, { onDelete: "cascade" }),

    createdAt: timestamps.createdAt,
});

export const prescriptionItems = pgTable("prescription_items", {
    id: uuid("id").primaryKey().defaultRandom(),

    prescriptionId: uuid("prescription_id")
        .notNull()
        .references(() => prescriptions.id, { onDelete: "cascade" }),

    medicationName: varchar("medication_name", { length: 255 }).notNull(),
    dosage: varchar("dosage", { length: 255 }).notNull(),
    frequency: varchar("frequency", { length: 255 }).notNull(),
    durationDays: integer("duration_days").notNull(),
    instructions: text("instructions"),
});

export const prescriptionDocuments = pgTable(
    "prescription_documents",
    {
        prescriptionId: uuid("prescription_id")
            .notNull()
            .references(() => prescriptions.id, { onDelete: "cascade" }),
        documentId: uuid("document_id")
            .notNull()
            .references(() => patientDocuments.id, { onDelete: "cascade" }),
    },
    table => [primaryKey({ columns: [table.prescriptionId, table.documentId] })]
);

export type Prescription = typeof prescriptions.$inferSelect;
export type NewPrescription = typeof prescriptions.$inferInsert;
export type PrescriptionItem = typeof prescriptionItems.$inferSelect;
export type NewPrescriptionItem = typeof prescriptionItems.$inferInsert;
export type PrescriptionDocument = typeof prescriptionDocuments.$inferSelect;
export type NewPrescriptionDocument = typeof prescriptionDocuments.$inferInsert;
