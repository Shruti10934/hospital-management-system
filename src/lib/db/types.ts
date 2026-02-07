// User Types
export const UserStatus = ["active", "inactive"] as const;
export const UserRole = ["admin", "doctor", "patient"] as const;

// Patient Types
export const PatientGender = ["male", "female", "other"] as const;
export const PatientDocumentType = ["report", "prescription", "other"] as const;
export const PatientDocumentUploadedBy = ["patient", "doctor"] as const;

// Appointment Types
export const AppointmentType = ["in_person", "video"] as const;
export const AppointmentStatus = [
    "pending",
    "confirmed",
    "completed",
    "cancelled",
    "no_show",
] as const;

// Payment Types
export const PaymentStatus = [
    "pending",
    "processing",
    "succeeded",
    "failed",
    "refunded",
] as const;

// Order Types
export const OrderStatus = [
    "pending",
    "placed",
    "processed",
    "completed",
    "cancelled",
] as const;
