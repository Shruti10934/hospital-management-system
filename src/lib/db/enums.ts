import {
    AppointmentStatus,
    AppointmentType,
    OrderStatus,
    PatientDocumentType,
    PatientDocumentUploadedBy,
    PatientGender,
    PaymentStatus,
    UserRole,
    UserStatus,
} from "@/lib/db/types";
import { pgEnum } from "drizzle-orm/pg-core";

// User Enums
export const userRoleEnum = pgEnum("user_role", UserRole);
export const userStatusEnum = pgEnum("user_status", UserStatus);

// Patient Enums
export const patientGenderEnum = pgEnum("patient_gender", PatientGender);
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
