import { sql } from "drizzle-orm";
import {
    check,
    index,
    integer,
    pgTable,
    primaryKey,
    text,
    uniqueIndex,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { consultations } from "./consultations";
import { patientDocuments } from "./patients";
import { timestamps } from "./timestamps";

export const prescriptions = pgTable(
    "prescriptions",
    {
        id: uuid("id").primaryKey().defaultRandom(),

        consultationId: uuid("consultation_id")
            .notNull()
            .references(() => consultations.id, { onDelete: "cascade" }),

        createdAt: timestamps.createdAt,
    },
    table => [
        uniqueIndex("idx_prescriptions_consultation_id").on(
            table.consultationId
        ),
    ]
);

export const prescriptionItems = pgTable(
    "prescription_items",
    {
        id: uuid("id").primaryKey().defaultRandom(),

        prescriptionId: uuid("prescription_id")
            .notNull()
            .references(() => prescriptions.id, { onDelete: "cascade" }),

        medicationName: varchar("medication_name", { length: 255 }).notNull(),
        dosage: varchar("dosage", { length: 255 }).notNull(),
        frequency: varchar("frequency", { length: 255 }).notNull(),
        durationDays: integer("duration_days").notNull(),
        instructions: text("instructions"),
    },
    table => [
        index("idx_prescription_items_prescription_id").on(
            table.prescriptionId
        ),
        check("chk_duration_days", sql`${table.durationDays} > 0`),
    ]
);

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
