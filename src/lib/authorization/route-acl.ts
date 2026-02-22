import { Permission as P } from "./permissions";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type MethodMap = Partial<Record<HttpMethod, P[]>>;

export type RouteKey =
    | "/api/auth/me"
    | "/api/auth/logout"
    | "/api/auth/refresh"
    | "/api/users"
    | "/api/users/:id"
    | "/api/users/:id/deactivate"
    | "/api/doctors"
    | "/api/doctors/:id"
    | "/api/doctors/:id/schedule"
    | "/api/patients"
    | "/api/patients/:id"
    | "/api/patients/:id/records"
    | "/api/patients/:id/documents"
    | "/api/appointments"
    | "/api/appointments/:id"
    | "/api/appointments/:id/cancel"
    | "/api/prescriptions"
    | "/api/prescriptions/:id"
    | "/api/pharmacy"
    | "/api/pharmacy/:id"
    | "/api/orders"
    | "/api/orders/:id"
    | "/api/payments"
    | "/api/payments/:id"
    | "/api/invoices"
    | "/api/invoices/:id"
    | "/api/refunds"
    | "/api/refunds/:id"
    | "/api/refunds/:id/approve"
    | "/api/departments"
    | "/api/departments/:id"
    | "/api/support"
    | "/api/support/:id"
    | "/api/support/:id/close"
    | "/api/consultations"
    | "/api/consultations/:id"
    | "/api/leave"
    | "/api/leave/:id"
    | "/api/leave/:id/approve"
    | "/api/admin/dashboard"
    | "/api/admin/settings"
    | "/api/admin/audit-log";

export type RouteRule = Record<RouteKey, MethodMap>;

export const Route_ACL: RouteRule = {
    // Auth
    "/api/auth/me": { GET: [P.AUTH_ME] },
    "/api/auth/logout": { POST: [P.AUTH_LOGOUT] },
    "/api/auth/refresh": { POST: [P.AUTH_REFRESH] },

    // Users
    "/api/users": { GET: [P.USERS_LIST], POST: [P.USERS_CREATE] },
    "/api/users/:id": {
        GET: [P.USERS_READ_SELF, P.USERS_READ_ANY],
        PUT: [P.USERS_UPDATE_SELF, P.USERS_UPDATE_ANY],
        PATCH: [P.USERS_UPDATE_SELF, P.USERS_UPDATE_ANY],
        DELETE: [P.USERS_DELETE],
    },
    "/api/users/:id/deactivate": { POST: [P.USERS_DEACTIVATE] },

    // Doctors
    "/api/doctors": { GET: [P.DOCTORS_LIST], POST: [P.DOCTORS_CREATE] },
    "/api/doctors/:id": {
        GET: [P.DOCTORS_READ_SELF, P.DOCTORS_READ_ANY],
        PUT: [P.DOCTORS_UPDATE_SELF, P.DOCTORS_UPDATE_ANY],
        PATCH: [P.DOCTORS_UPDATE_SELF, P.DOCTORS_UPDATE_ANY],
        DELETE: [P.DOCTORS_DELETE],
    },

    "/api/doctors/:id/schedule": {
        GET: [P.DOCTORS_SCHEDULE_READ_SELF, P.DOCTORS_SCHEDULE_READ_ANY],
        PUT: [P.DOCTORS_SCHEDULE_UPDATE_SELF, P.DOCTORS_SCHEDULE_UPDATE_ANY],
        PATCH: [P.DOCTORS_SCHEDULE_UPDATE_SELF, P.DOCTORS_SCHEDULE_UPDATE_ANY],
    },

    // Patients
    "/api/patients": { GET: [P.PATIENTS_LIST], POST: [P.PATIENTS_CREATE] },
    "/api/patients/:id": {
        GET: [P.PATIENTS_READ_SELF, P.PATIENTS_READ_ANY],
        PUT: [P.PATIENTS_UPDATE_SELF, P.PATIENTS_UPDATE_ANY],
        PATCH: [P.PATIENTS_UPDATE_SELF, P.PATIENTS_UPDATE_ANY],
        DELETE: [P.PATIENTS_DELETE],
    },

    "/api/patients/:id/records": {
        GET: [P.PATIENTS_RECORDS_READ_SELF, P.PATIENTS_RECORDS_READ_ANY],
        POST: [P.PATIENTS_RECORDS_CREATE],
    },
    "/api/patients/:id/documents": {
        GET: [P.PATIENTS_DOCUMENTS_READ_SELF, P.PATIENTS_DOCUMENTS_READ_ANY],
        POST: [
            P.PATIENTS_DOCUMENTS_UPLOAD_SELF,
            P.PATIENTS_DOCUMENTS_UPLOAD_ANY,
        ],
    },

    // Appointments
    "/api/appointments": {
        GET: [P.APPOINTMENTS_LIST_SELF, P.APPOINTMENTS_LIST_ANY],
        POST: [P.APPOINTMENTS_CREATE],
    },
    "/api/appointments/:id": {
        GET: [P.APPOINTMENTS_READ_SELF, P.APPOINTMENTS_READ_ANY],
        PUT: [P.APPOINTMENTS_UPDATE_SELF, P.APPOINTMENTS_UPDATE_ANY],
        PATCH: [P.APPOINTMENTS_UPDATE_SELF, P.APPOINTMENTS_UPDATE_ANY],
    },
    "/api/appointments/:id/cancel": {
        POST: [P.APPOINTMENTS_CANCEL_SELF, P.APPOINTMENTS_CANCEL_ANY],
    },

    // Prescriptions
    "/api/prescriptions": {
        GET: [P.PRESCRIPTIONS_LIST_SELF, P.PRESCRIPTIONS_LIST_ANY],
        POST: [P.PRESCRIPTIONS_CREATE],
    },
    "/api/prescriptions/:id": {
        GET: [P.PRESCRIPTIONS_READ_SELF, P.PRESCRIPTIONS_READ_ANY],
        PUT: [P.PRESCRIPTIONS_UPDATE],
        PATCH: [P.PRESCRIPTIONS_UPDATE],
    },

    // Pharmacy
    "/api/pharmacy": { GET: [P.PHARMACY_LIST], POST: [P.PHARMACY_CREATE] },
    "/api/pharmacy/:id": {
        GET: [P.PHARMACY_READ],
        PUT: [P.PHARMACY_UPDATE],
        PATCH: [P.PHARMACY_UPDATE],
        DELETE: [P.PHARMACY_DELETE],
    },

    // Orders
    "/api/orders": {
        GET: [P.ORDERS_LIST_SELF, P.ORDERS_LIST_ANY],
        POST: [P.ORDERS_CREATE],
    },
    "/api/orders/:id": {
        GET: [P.ORDERS_READ_SELF, P.ORDERS_READ_ANY],
        PUT: [P.ORDERS_UPDATE_ANY],
        PATCH: [P.ORDERS_UPDATE_ANY],
    },

    // Payments
    "/api/payments": {
        GET: [P.PAYMENTS_LIST_SELF, P.PAYMENTS_LIST_ANY],
        POST: [P.PAYMENTS_CREATE],
    },
    "/api/payments/:id": {
        GET: [P.PAYMENTS_READ_SELF, P.PAYMENTS_READ_ANY],
    },

    // Invoices
    "/api/invoices": {
        GET: [P.INVOICES_LIST_SELF, P.INVOICES_LIST_ANY],
        POST: [P.INVOICES_CREATE],
    },
    "/api/invoices/:id": {
        GET: [P.INVOICES_READ_SELF, P.INVOICES_READ_ANY],
    },

    // Refunds
    "/api/refunds": {
        GET: [P.REFUNDS_LIST_SELF, P.REFUNDS_LIST_ANY],
        POST: [P.REFUNDS_CREATE],
    },
    "/api/refunds/:id": { GET: [P.REFUNDS_READ_SELF, P.REFUNDS_READ_ANY] },
    "/api/refunds/:id/approve": { POST: [P.REFUNDS_APPROVE] },

    // Departments
    "/api/departments": {
        GET: [P.DEPARTMENTS_LIST],
        POST: [P.DEPARTMENTS_CREATE],
    },
    "/api/departments/:id": {
        GET: [P.DEPARTMENTS_READ],
        PUT: [P.DEPARTMENTS_UPDATE],
        PATCH: [P.DEPARTMENTS_UPDATE],
        DELETE: [P.DEPARTMENTS_DELETE],
    },

    // Support Tickets
    "/api/support": {
        GET: [P.SUPPORT_LIST_SELF, P.SUPPORT_LIST_ANY],
        POST: [P.SUPPORT_CREATE],
    },
    "/api/support/:id": {
        GET: [P.SUPPORT_READ_SELF, P.SUPPORT_READ_ANY],
        PUT: [P.SUPPORT_UPDATE_ANY],
        PATCH: [P.SUPPORT_UPDATE_ANY],
    },
    "/api/support/:id/close": { POST: [P.SUPPORT_CLOSE] },

    // Consultations
    "/api/consultations": {
        GET: [P.CONSULTATIONS_LIST_SELF, P.CONSULTATIONS_LIST_ANY],
        POST: [P.CONSULTATIONS_CREATE],
    },
    "/api/consultations/:id": {
        GET: [P.CONSULTATIONS_READ_SELF, P.CONSULTATIONS_READ_ANY],
        PUT: [P.CONSULTATIONS_UPDATE_SELF, P.CONSULTATIONS_UPDATE_ANY],
        PATCH: [P.CONSULTATIONS_UPDATE_SELF, P.CONSULTATIONS_UPDATE_ANY],
    },

    // Leave
    "/api/leave": {
        GET: [P.LEAVE_LIST_SELF, P.LEAVE_LIST_ANY],
        POST: [P.LEAVE_CREATE],
    },
    "/api/leave/:id": { GET: [P.LEAVE_READ_SELF, P.LEAVE_READ_ANY] },
    "/api/leave/:id/approve": { POST: [P.LEAVE_APPROVE] },

    // Admin
    "/api/admin/dashboard": { GET: [P.ADMIN_DASHBOARD] },
    "/api/admin/settings": {
        GET: [P.ADMIN_SETTINGS],
        PUT: [P.ADMIN_SETTINGS],
        PATCH: [P.ADMIN_SETTINGS],
    },
    "/api/admin/audit-log": { GET: [P.ADMIN_AUDIT_LOG] },
};
