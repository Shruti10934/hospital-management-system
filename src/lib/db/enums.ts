import {
    AppointmentStatus,
    AppointmentType,
    BloodGroup,
    Gender,
    OrderStatus,
    PatientDocumentType,
    PatientDocumentUploadedBy,
    PaymentStatus,
    PharmacyCategory,
    UserRole,
} from "@/lib/db/types";
import { pgEnum } from "drizzle-orm/pg-core";

// General
export const genderEnum = pgEnum("gender", Gender);
export const bloodGroupEnum = pgEnum("blood_group", BloodGroup);

// User Enums
export const userRoleEnum = pgEnum("user_role", UserRole);

// Patient Enums
export const patientDocumentTypeEnum = pgEnum(
    "patient_document_type",
    PatientDocumentType
);
export const patientDocumentUploadedByEnum = pgEnum(
    "patient_document_uploaded_by",
    PatientDocumentUploadedBy
);

// Appointment Enums
export const appointmentTypeEnum = pgEnum("appointment_type", AppointmentType);
export const appointmentStatusEnum = pgEnum(
    "appointment_status",
    AppointmentStatus
);

// Payment Enums
export const paymentStatusEnum = pgEnum("payment_status", PaymentStatus);

// Order Enums
export const orderStatusEnum = pgEnum("order_status", OrderStatus);

// Pharmacy Enums
export const pharmacyCategoryEnum = pgEnum(
    "pharmacy_category",
    PharmacyCategory
);
