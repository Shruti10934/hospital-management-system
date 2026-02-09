import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/shared/page-hero";

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />

            <main className="flex-1">
                <PageHero
                    title="Terms & Conditions"
                    subtitle="Please read these terms carefully before using our services."
                    breadcrumbs={[{ label: "Terms & Conditions", href: "/terms" }]}
                />

                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                                Last updated: January 1, 2025
                            </p>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                1. Acceptance of Terms
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                By accessing or using MedCare Hospital's website and
                                services, you agree to be bound by these Terms and Conditions.
                                If you disagree with any part of these terms, you may not
                                access our services.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                2. Medical Services
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                The information provided on this website is for general
                                informational purposes only and should not be considered
                                medical advice. Always consult with qualified healthcare
                                providers for medical diagnosis and treatment. In case of
                                emergency, please call emergency services immediately.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                3. Appointment Booking
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                When booking appointments through our platform:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                                <li>You agree to provide accurate and complete information</li>
                                <li>Appointments are subject to availability</li>
                                <li>We reserve the right to reschedule or cancel appointments</li>
                                <li>Cancellation policies may apply as per our guidelines</li>
                                <li>You must arrive at least 15 minutes before your appointment</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                4. Patient Responsibilities
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                As a patient, you agree to:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                                <li>Provide accurate medical history and information</li>
                                <li>Follow treatment plans as prescribed by your doctor</li>
                                <li>Inform us of any changes to your health condition</li>
                                <li>Respect hospital staff and other patients</li>
                                <li>Settle all bills and payments as per our payment policy</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                5. Intellectual Property
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                All content on this website, including text, graphics, logos,
                                images, and software, is the property of MedCare Hospital
                                and is protected by copyright laws. You may not reproduce,
                                distribute, or create derivative works without our permission.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                6. Limitation of Liability
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                MedCare Hospital shall not be liable for any indirect,
                                incidental, special, consequential, or punitive damages
                                resulting from your use of our services. This includes,
                                but is not limited to, errors in medical information
                                provided on this website.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                7. Changes to Terms
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                We reserve the right to modify these terms at any time.
                                Changes will be effective immediately upon posting on
                                this website. Continued use of our services constitutes
                                acceptance of the modified terms.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                8. Governing Law
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                These Terms and Conditions shall be governed by and
                                construed in accordance with the laws of the jurisdiction
                                in which MedCare Hospital operates, without regard to
                                conflict of law principles.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                9. Contact Information
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                For any questions regarding these terms, please contact:
                            </p>
                            <div className="bg-muted/30 rounded-2xl p-6">
                                <p className="text-foreground font-medium">MedCare Hospital Legal Department</p>
                                <p className="text-muted-foreground">Email: legal@medcare.com</p>
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
