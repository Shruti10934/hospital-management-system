import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/shared/page-hero";

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />

            <main className="flex-1">
                <PageHero
                    title="Refund Policy"
                    subtitle="Understand our refund and cancellation policies for various services."
                    breadcrumbs={[{ label: "Refund Policy", href: "/refund-policy" }]}
                />

                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                                Last updated: January 1, 2025
                            </p>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                1. Appointment Cancellation
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Our cancellation policy varies based on when you cancel:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                                <li><strong>24+ hours before:</strong> Full refund of any advance payment</li>
                                <li><strong>12-24 hours before:</strong> 75% refund of advance payment</li>
                                <li><strong>Less than 12 hours:</strong> 50% refund of advance payment</li>
                                <li><strong>No-show:</strong> No refund will be provided</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                2. Health Package Refunds
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                For health checkup packages:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                                <li>Full refund if cancelled 48+ hours before scheduled date</li>
                                <li>75% refund if cancelled 24-48 hours before</li>
                                <li>No refund for cancellations less than 24 hours before</li>
                                <li>Partial refund for unused tests (subject to review)</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                3. Diagnostic Tests
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                For laboratory and imaging tests:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                                <li>Full refund if cancelled before sample collection</li>
                                <li>No refund after sample has been collected</li>
                                <li>Re-test at no additional cost if results are invalid due to laboratory error</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                4. Inpatient Services
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                For hospitalization and inpatient services, refunds are
                                processed on a case-by-case basis. Any unused portion of
                                the advance deposit will be refunded after deducting
                                applicable charges for services rendered.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                5. Non-Refundable Services
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                The following are non-refundable:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                                <li>Emergency services already rendered</li>
                                <li>Surgical procedures that have commenced</li>
                                <li>Medications dispensed from pharmacy</li>
                                <li>Medical equipment and supplies used</li>
                                <li>Administrative and processing fees</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                6. Refund Process
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                To request a refund:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                                <li>Submit a written request to our billing department</li>
                                <li>Include your patient ID and payment receipt</li>
                                <li>Refunds are processed within 7-10 business days</li>
                                <li>Refunds will be credited to the original payment method</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                7. Insurance Refunds
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                For insurance-covered services, refunds will be processed
                                according to the terms of your insurance policy. Any excess
                                payment over the insured amount will be refunded after
                                claim settlement.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                8. Contact for Refunds
                            </h2>
                            <div className="bg-muted/30 rounded-2xl p-6">
                                <p className="text-foreground font-medium">MedCare Hospital Billing Department</p>
                                <p className="text-muted-foreground">Email: billing@medcare.com</p>
                                <p className="text-muted-foreground">Phone: +1 (555) 123-4568</p>
                                <p className="text-muted-foreground">Hours: Monday - Friday, 9 AM - 5 PM</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
