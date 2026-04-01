export const Permission = {
    // Auth
    AUTH_ME: "auth:me",
    AUTH_LOGOUT: "auth:logout",
    AUTH_REFRESH: "auth:refresh",

    // Users
    USERS_LIST: "users:list",
    USERS_READ_SELF: "users:read:self",
    USERS_READ_ANY: "users:read:any",
    USERS_CREATE: "users:create",
    USERS_UPDATE_SELF: "users:update:self",
    USERS_UPDATE_ANY: "users:update:any",
    USERS_DELETE: "users:delete",
    USERS_DEACTIVATE: "users:deactivate",

    // Doctors
    DOCTORS_LIST: "doctors:list",
    DOCTORS_READ_SELF: "doctors:read:self",
    DOCTORS_READ_ANY: "doctors:read:any",
    DOCTORS_CREATE: "doctors:create",
    DOCTORS_UPDATE_SELF: "doctors:update:self",
    DOCTORS_UPDATE_ANY: "doctors:update:any",
    DOCTORS_DELETE: "doctors:delete",
    DOCTORS_SCHEDULE_READ_SELF: "doctors:schedule:read:self",
    DOCTORS_SCHEDULE_READ_ANY: "doctors:schedule:read:any",
    DOCTORS_SCHEDULE_UPDATE_SELF: "doctors:schedule:update:self",
    DOCTORS_SCHEDULE_UPDATE_ANY: "doctors:schedule:update:any",

    // Patients
    PATIENTS_LIST: "patients:list",
    PATIENTS_READ_SELF: "patients:read:self",
    PATIENTS_READ_ANY: "patients:read:any",
    PATIENTS_CREATE: "patients:create",
    PATIENTS_UPDATE_SELF: "patients:update:self",
    PATIENTS_UPDATE_ANY: "patients:update:any",
    PATIENTS_DELETE: "patients:delete",
    PATIENTS_RECORDS_READ_SELF: "patients:records:read:self",
    PATIENTS_RECORDS_READ_ANY: "patients:records:read:any",
    PATIENTS_RECORDS_CREATE: "patients:records:create",
    PATIENTS_DOCUMENTS_UPLOAD_SELF: "patients:documents:upload:self",
    PATIENTS_DOCUMENTS_UPLOAD_ANY: "patients:documents:upload:any",
    PATIENTS_DOCUMENTS_READ_SELF: "patients:documents:read:self",
    PATIENTS_DOCUMENTS_READ_ANY: "patients:documents:read:any",

    // Appointments
    APPOINTMENTS_LIST_SELF: "appointments:list:self",
    APPOINTMENTS_LIST_ANY: "appointments:list:any",
    APPOINTMENTS_READ_SELF: "appointments:read:self",
    APPOINTMENTS_READ_ANY: "appointments:read:any",
    APPOINTMENTS_CREATE: "appointments:create",
    APPOINTMENTS_UPDATE_SELF: "appointments:update:self",
    APPOINTMENTS_UPDATE_ANY: "appointments:update:any",
    APPOINTMENTS_CANCEL_SELF: "appointments:cancel:self",
    APPOINTMENTS_CANCEL_ANY: "appointments:cancel:any",

    // Prescriptions
    PRESCRIPTIONS_LIST_SELF: "prescriptions:list:self",
    PRESCRIPTIONS_LIST_ANY: "prescriptions:list:any",
    PRESCRIPTIONS_READ_SELF: "prescriptions:read:self",
    PRESCRIPTIONS_READ_ANY: "prescriptions:read:any",
    PRESCRIPTIONS_CREATE: "prescriptions:create",
    PRESCRIPTIONS_UPDATE: "prescriptions:update",

    // Pharmacy
    PHARMACY_LIST: "pharmacy:list",
    PHARMACY_READ: "pharmacy:read",
    PHARMACY_CREATE: "pharmacy:create",
    PHARMACY_UPDATE: "pharmacy:update",
    PHARMACY_DELETE: "pharmacy:delete",

    // Orders
    ORDERS_LIST_SELF: "orders:list:self",
    ORDERS_LIST_ANY: "orders:list:any",
    ORDERS_READ_SELF: "orders:read:self",
    ORDERS_READ_ANY: "orders:read:any",
    ORDERS_CREATE: "orders:create",
    ORDERS_UPDATE_ANY: "orders:update:any",

    // Payments
    PAYMENTS_LIST_SELF: "payments:list:self",
    PAYMENTS_LIST_ANY: "payments:list:any",
    PAYMENTS_READ_SELF: "payments:read:self",
    PAYMENTS_READ_ANY: "payments:read:any",
    PAYMENTS_CREATE: "payments:create",

    // Invoices
    INVOICES_LIST_SELF: "invoices:list:self",
    INVOICES_LIST_ANY: "invoices:list:any",
    INVOICES_READ_SELF: "invoices:read:self",
    INVOICES_READ_ANY: "invoices:read:any",
    INVOICES_CREATE: "invoices:create",

    // Refunds
    REFUNDS_LIST_SELF: "refunds:list:self",
    REFUNDS_LIST_ANY: "refunds:list:any",
    REFUNDS_READ_SELF: "refunds:read:self",
    REFUNDS_READ_ANY: "refunds:read:any",
    REFUNDS_CREATE: "refunds:create",
    REFUNDS_APPROVE: "refunds:approve",

    // Departments
    DEPARTMENTS_LIST: "departments:list",
    DEPARTMENTS_READ: "departments:read",
    DEPARTMENTS_CREATE: "departments:create",
    DEPARTMENTS_UPDATE: "departments:update",
    DEPARTMENTS_DELETE: "departments:delete",

    // Support Tickets
    SUPPORT_LIST_SELF: "support:list:self",
    SUPPORT_LIST_ANY: "support:list:any",
    SUPPORT_READ_SELF: "support:read:self",
    SUPPORT_READ_ANY: "support:read:any",
    SUPPORT_CREATE: "support:create",
    SUPPORT_UPDATE_ANY: "support:update:any",
    SUPPORT_CLOSE: "support:close",

    // Consultations
    CONSULTATIONS_LIST_SELF: "consultations:list:self",
    CONSULTATIONS_LIST_ANY: "consultations:list:any",
    CONSULTATIONS_READ_SELF: "consultations:read:self",
    CONSULTATIONS_READ_ANY: "consultations:read:any",
    CONSULTATIONS_CREATE: "consultations:create",
    CONSULTATIONS_UPDATE_SELF: "consultations:update:self",
    CONSULTATIONS_UPDATE_ANY: "consultations:update:any",

    // Leave Management
    LEAVE_LIST_SELF: "leave:list:self",
    LEAVE_LIST_ANY: "leave:list:any",
    LEAVE_READ_SELF: "leave:read:self",
    LEAVE_READ_ANY: "leave:read:any",
    LEAVE_CREATE: "leave:create",
    LEAVE_APPROVE: "leave:approve",

    // Admin
    ADMIN_DASHBOARD: "admin:dashboard",
    ADMIN_SETTINGS: "admin:settings",
    ADMIN_AUDIT_LOG: "admin:audit-log",
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];
