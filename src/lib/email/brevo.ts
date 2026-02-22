import { brevoConfig, type BrevoConfig } from "@/config/email";
import { logger } from "@/lib/api";
import { BrevoClient, BrevoError, BrevoTimeoutError } from "@getbrevo/brevo";

import { getVerificationEmailTemplate } from "./templates";
import type { SendEmailOutcome, SendEmailParams } from "./types";

const COMPONENT = "EMAIL:BREVO";

export class BrevoEmailService {
    private static instance: BrevoEmailService | null = null;

    static getInstance(): BrevoEmailService {
        if (!BrevoEmailService.instance)
            BrevoEmailService.instance = new BrevoEmailService(brevoConfig);

        return BrevoEmailService.instance;
    }

    static resetInstance(): void {
        BrevoEmailService.instance = null;
    }

    private readonly client: BrevoClient;
    private readonly config: BrevoConfig;

    private constructor(config: BrevoConfig) {
        const { apiKey, maxRetries, timeoutInSeconds } = config;
        this.config = config;
        this.client = new BrevoClient({ apiKey, maxRetries, timeoutInSeconds });

        logger.info({ component: COMPONENT }, "Service initialised");
    }

    async sendEmail(params: SendEmailParams): Promise<SendEmailOutcome> {
        const { to, type, code } = params;
        const { subject, html: htmlContent } = getVerificationEmailTemplate(
            type,
            to.name,
            code
        );
        const { senderEmail, senderName, replyToEmail } = this.config;
        const sender = { email: senderEmail, name: senderName };
        const replyTo = { email: replyToEmail, name: senderName };

        try {
            const { messageId } =
                await this.client.transactionalEmails.sendTransacEmail({
                    to: [to],
                    subject,
                    htmlContent,
                    sender,
                    replyTo,
                });

            logger.info(
                { component: COMPONENT, to, subject, messageId },
                "Email sent successfully"
            );

            return { success: true, messageId };
        } catch (err) {
            let errorMsg: string;
            let statusCode: number;
            if (err instanceof BrevoTimeoutError) {
                errorMsg = "Email request timed out. Please try again.";
                statusCode = 408;
            } else if (err instanceof BrevoError) {
                errorMsg = err.message || "Error sending email.";
                statusCode = err.statusCode || 500;
            } else {
                errorMsg = "Unknown error occurred while sending email.";
                statusCode = 500;
            }

            logger.error(
                { component: COMPONENT, to, subject, errorMsg, statusCode },
                "Error sending email"
            );
            return { success: false, error: errorMsg, statusCode };
        }
    }
}

export async function sendTransactionalEmail(
    params: SendEmailParams
): Promise<boolean> {
    const result = await BrevoEmailService.getInstance().sendEmail(params);
    return result.success;
}
