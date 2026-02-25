import { ENV } from "./env";

export interface BrevoConfig {
    apiKey: string;
    senderEmail: string;
    senderName: string;
    replyToEmail: string;
    maxRetries: number;
    timeoutInSeconds: number;
}

export const brevoConfig: BrevoConfig = {
    apiKey: ENV.BREVO.API_KEY,
    senderEmail: ENV.BREVO.SENDER_EMAIL,
    senderName: ENV.BREVO.SENDER_NAME,
    replyToEmail: ENV.BREVO.REPLY_TO_EMAIL,
    maxRetries: 2,
    timeoutInSeconds: 30,
};
