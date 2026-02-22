import type { VerificationCodeType } from "@/db/types";

export type VerificationCodeTypeValue = (typeof VerificationCodeType)[number];

export interface EmailRecipient {
    email: string;
    name: string;
}

export interface SendEmailParams {
    to: EmailRecipient;
    type: VerificationCodeTypeValue;
    code: string;
}

// Email Result
export interface SendEmailResult {
    success: true;
    messageId?: string;
}
export interface SendEmailFailure {
    success: false;
    error: string;
    statusCode?: number;
}
export type SendEmailOutcome = SendEmailResult | SendEmailFailure;

// Email Template
export interface EmailTemplate {
    subject: string;
    html: string;
}
