import {
    patientDocumentTypeEnum,
    patientDocumentUploadedByEnum,
    patientGenderEnum,
} from "@/lib/db/enums";
import { char, date, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./timestamps";
import { users } from "./users";

export const patients = pgTable("patients", {
    userId: uuid("user_id")
        .primaryKey()
        .references(() => users.id, { onDelete: "cascade" }),

    name: varchar("name", { length: 255 }).notNull(),
    dob: date("dob").notNull(),
    address: text("address").notNull(),

    gender: patientGenderEnum("gender").notNull(),
    bloodGroup: varchar("blood_group", { length: 3 }),

    emergencyContact: char("emergency_contact", { length: 10 }),
});

export const patientDocuments = pgTable("patient_documents", {
    id: uuid("id").primaryKey().defaultRandom(),

    patientId: uuid("patient_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),

    fileUrl: text("file_url").notNull(),
    type: patientDocumentTypeEnum("type").notNull(),
    uploadedBy: patientDocumentUploadedByEnum("uploaded_by").notNull(),

    createdAt: timestamps.createdAt,
});

export type Patient = typeof patients.$inferSelect;
export type NewPatient = typeof patients.$inferInsert;
export type PatientDocument = typeof patientDocuments.$inferSelect;
export type NewPatientDocument = typeof patientDocuments.$inferInsert;
