import { ENV } from "@/config";
import type { EmailTemplate, VerificationCodeTypeValue } from "./types";

interface TemplateConfig {
    title: string;
    subtitle: string;
    bodyText: string;
    cautionText: string;
    subject: string;
}

const TEMPLATE_CONFIG: Record<VerificationCodeTypeValue, TemplateConfig> = {
    email_verification: {
        title: "Email Verification",
        subtitle: "Verify your email address",
        bodyText:
            "Thank you for registering. Please use the verification code below to verify your email address.",
        cautionText:
            "If you did not create an account, you can safely ignore this email.",
        subject: "Verify Your Email — Hospital Management System",
    },
    password_reset: {
        title: "Password Reset",
        subtitle: "Reset your account password",
        bodyText:
            "We received a request to reset your password. Use the code below to proceed.",
        cautionText:
            "If you did not request a password reset, please secure your account.",
        subject: "Reset Your Password — Hospital Management System",
    },
    email_authentication: {
        title: "Login Verification",
        subtitle: "Login to your account",
        bodyText:
            "Use the code below to complete your login. Do not share this code with anyone.",
        cautionText:
            "If you did not request this code, you can safely ignore this email.",
        subject: "Your Login Code — Hospital Management System",
    },
};

function buildHtml(
    config: TemplateConfig,
    recipientName: string,
    code: string
): string {
    const { title, subtitle, bodyText, cautionText } = config;
    const expiryMinutes = ENV.AUTH.VERIFICATION.EXPIRY;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f4f7fa;-webkit-font-smoothing:antialiased;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f7fa;">
        <tr>
            <td align="center" style="padding:40px 20px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.08);max-width:600px;width:100%;">
                    <tr>
                        <td style="height:4px;background:linear-gradient(90deg,#dc2626,#ff00ff88);border-radius:12px 12px 0 0;"></td>
                    </tr>
                    <tr>
                        <td style="padding:40px 48px;">
                            <!-- Title -->
                            <h1 style="margin:0 0 4px;font-size:24px;font-weight:700;color:#1a1a2e;">${title}</h1>
                            <p style="margin:0 0 28px;font-size:14px;color:#9ca3af;letter-spacing:0.02em;">${subtitle}</p>

                            <!-- Greeting -->
                            <p style="margin:0 0 16px;font-size:16px;color:#374151;">
                                Hello <strong>${recipientName}</strong>,
                            </p>

                            <!-- Body -->
                            <p style="margin:0 0 24px;font-size:15px;color:#4b5563;line-height:1.6;">
                                ${bodyText}
                                This code expires in <strong>${expiryMinutes} minutes</strong>.
                            </p>

                            <!-- OTP Box -->
                            <div style="text-align:center;margin:32px 0;">
                                <span style="display:inline-block;font-size:36px;font-weight:700;letter-spacing:8px;color:#1a1a2e;background-color:#ff262680;padding:16px 32px;border-radius:8px;border:2px dashed #ff00ff88;">
                                    ${code}
                                </span>
                            </div>

                            <!-- Caution -->
                            <p style="margin:0 0 8px;font-size:14px;color:#6b7280;line-height:1.5;">
                                ${cautionText}
                            </p>

                            <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />

                            <!-- Footer -->
                            <p style="margin:0;font-size:12px;color:#9ca3af;">
                                This is an automated message. Please do not reply.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

export function getVerificationEmailTemplate(
    type: VerificationCodeTypeValue,
    recipientName: string,
    code: string
): EmailTemplate {
    const config = TEMPLATE_CONFIG[type];

    return {
        subject: config.subject,
        html: buildHtml(config, code, recipientName),
    };
}
