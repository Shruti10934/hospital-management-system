// General
export const Gender = ["male", "female", "other"] as const;
export const BloodGroup = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
] as const;

// User Types
export const UserRole = ["admin", "doctor", "patient"] as const;

// Patient Types
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

// Pharmacy Types
export const PharmacyCategory = [
    "medicine",
    "equipment",
    "consumables",
] as const;

// Support Ticket Types
export const TicketStatus = [
    "open",
    "in_progress",
    "resolved",
    "closed",
] as const;
export const TicketPriority = ["low", "medium", "high", "urgent"] as const;

// Leave Types
export const LeaveStatus = ["pending", "approved", "rejected"] as const;

// Refund Types
export const RefundStatus = [
    "pending",
    "processing",
    "completed",
    "rejected",
] as const;
