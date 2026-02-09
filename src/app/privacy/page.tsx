import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/shared/page-hero";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />

            <main className="flex-1">
                <PageHero
                    title="Privacy Policy"
                    subtitle="Your privacy matters to us. Learn how we protect and handle your personal information."
                    breadcrumbs={[{ label: "Privacy Policy", href: "/privacy" }]}
                />

                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                                Last updated: January 1, 2025
                            </p>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                1. Information We Collect
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                We collect information you provide directly to us, including
                                personal details such as your name, contact information,
                                date of birth, medical history, insurance information, and
                                any other information you choose to provide when booking
                                appointments, registering for services, or contacting us.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                2. How We Use Your Information
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                                <li>Provide, maintain, and improve our healthcare services</li>
                                <li>Process appointments and manage your patient records</li>
                                <li>Send you appointment reminders and health-related communications</li>
                                <li>Process billing and insurance claims</li>
                                <li>Respond to your inquiries and provide customer support</li>
                                <li>Comply with legal obligations and protect our rights</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                3. Information Sharing
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                We do not sell, trade, or rent your personal information to
                                third parties. We may share your information with healthcare
                                providers involved in your care, insurance companies for
                                claims processing, and as required by law. All third parties
                                are bound by confidentiality agreements.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                4. Data Security
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                We implement industry-standard security measures to protect
                                your personal and medical information. This includes
                                encryption, secure servers, access controls, and regular
                                security audits. However, no method of transmission over
                                the Internet is 100% secure.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                5. Your Rights
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                You have the right to:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                                <li>Access your personal and medical records</li>
                                <li>Request corrections to your information</li>
                                <li>Request deletion of your non-medical data</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Request a copy of your data</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                6. Cookies and Tracking
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Our website uses cookies and similar technologies to enhance
                                your browsing experience, analyze website traffic, and
                                personalize content. You can manage cookie preferences
                                through your browser settings.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                7. Contact Us
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                If you have any questions about this Privacy Policy, please
                                contact us at:
                            </p>
                            <div className="bg-muted/30 rounded-2xl p-6">
                                <p className="text-foreground font-medium">MedCare Hospital</p>
                                <p className="text-muted-foreground">123 Healthcare Avenue</p>
                                <p className="text-muted-foreground">Medical City, MC 12345</p>
                                <p className="text-muted-foreground">Email: privacy@medcare.com</p>
                                <p className="text-muted-foreground">Phone: +1 (555) 123-4567</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
