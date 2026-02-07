import {
    bloodGroupEnum,
    genderEnum,
    patientDocumentTypeEnum,
    patientDocumentUploadedByEnum,
} from "@/lib/db/enums";
import { char, date, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./timestamps";
import { users } from "./users";

export const patients = pgTable("patients", {
    userId: uuid("user_id")
        .primaryKey()
        .references(() => users.id, { onDelete: "cascade" }),

    dob: date("dob").notNull(),
    gender: genderEnum("gender").notNull(),
    bloodGroup: bloodGroupEnum("blood_group").notNull(),
    heightCm: varchar("height_cm", { length: 3 }),
    weightKg: varchar("weight_kg", { length: 3 }),
    allergies: text("allergies"),
    chronicConditions: text("chronic_conditions"),

    address: text("address").notNull(),
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
