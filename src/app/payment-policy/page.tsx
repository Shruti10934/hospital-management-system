import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/shared/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Landmark, Smartphone, Shield } from "lucide-react";

const paymentMethods = [
    {
        icon: CreditCard,
        title: "Credit/Debit Cards",
        description: "We accept all major credit and debit cards including Visa, Mastercard, American Express, and RuPay.",
    },
    {
        icon: Smartphone,
        title: "UPI & Digital Wallets",
        description: "Pay conveniently using UPI apps, Google Pay, PhonePe, Paytm, and other digital wallets.",
    },
    {
        icon: Landmark,
        title: "Net Banking",
        description: "Direct bank transfers through internet banking from all major banks.",
    },
    {
        icon: Shield,
        title: "Insurance & TPA",
        description: "Cashless treatment available with all major insurance providers and TPAs.",
    },
];

export default function PaymentPolicyPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />

            <main className="flex-1">
                <PageHero
                    title="Payment Policy"
                    subtitle="Transparent payment options and billing procedures for our patients."
                    breadcrumbs={[{ label: "Payment Policy", href: "/payment-policy" }]}
                />

                {/* Payment Methods */}
                <section className="py-12 bg-muted/30">
                    <div className="container mx-auto px-4 lg:px-8">
                        <h2 className="text-2xl font-bold text-foreground text-center mb-8">
                            Accepted Payment Methods
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {paymentMethods.map((method) => (
                                <Card key={method.title} className="border-0 shadow-sm text-center">
                                    <CardContent className="p-6">
                                        <div className="w-12 h-12 rounded-xl bg-corporate-blue/10 flex items-center justify-center mx-auto mb-4">
                                            <method.icon className="w-6 h-6 text-corporate-blue" />
                                        </div>
                                        <h3 className="font-semibold text-foreground mb-2">
                                            {method.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {method.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Policy Content */}
                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                                Last updated: January 1, 2025
                            </p>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                1. Outpatient (OPD) Payments
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                For outpatient consultations:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                                <li>Consultation fee is payable at the time of registration</li>
                                <li>Additional charges for tests are payable before the test</li>
                                <li>Prescription medications are payable at the pharmacy counter</li>
                                <li>Follow-up consultation fees may vary based on doctor's specialty</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                2. Inpatient Payments
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                For hospitalizations:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                                <li>Advance deposit required at the time of admission</li>
                                <li>Daily interim bills will be generated</li>
                                <li>Additional deposit may be required based on treatment progress</li>
                                <li>Final bill settlement required before discharge</li>
                                <li>Emergency admissions: Payment can be deferred with valid insurance</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                3. Advance Deposit Guidelines
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Advance deposit amounts vary based on the type of treatment:
                            </p>
                            <div className="bg-muted/30 rounded-2xl p-6 mb-6">
                                <ul className="space-y-3 text-muted-foreground">
                                    <li className="flex justify-between">
                                        <span>General Ward Admission</span>
                                        <span className="font-medium text-foreground">₹25,000</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Private Room Admission</span>
                                        <span className="font-medium text-foreground">₹50,000</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>ICU/CCU Admission</span>
                                        <span className="font-medium text-foreground">₹1,00,000</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Surgical Procedures</span>
                                        <span className="font-medium text-foreground">Varies by surgery</span>
                                    </li>
                                </ul>
                            </div>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                4. Insurance & Cashless Treatment
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                For cashless treatment:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                                <li>Inform our insurance desk at least 24 hours before admission</li>
                                <li>Provide valid insurance policy card and ID proof</li>
                                <li>Pre-authorization is required for planned procedures</li>
                                <li>Non-covered expenses are payable by the patient</li>
                                <li>Emergency cases: Authorization can be obtained post-admission</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                5. EMI & Financing Options
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                For high-value treatments, we offer EMI options through
                                partner banks. No-cost EMI is available for bills above
                                ₹25,000 on select credit cards. Please contact our billing
                                department for more information.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                6. Bills & Invoices
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                All bills are generated electronically and include a detailed
                                breakdown of charges. You can access your bills through our
                                patient portal or request printed copies from the billing
                                department. GST is applicable as per government regulations.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                                7. Contact Billing Department
                            </h2>
                            <div className="bg-muted/30 rounded-2xl p-6">
                                <p className="text-foreground font-medium">MedCare Hospital Billing Department</p>
                                <p className="text-muted-foreground">Location: Ground Floor, Counter 1-3</p>
                                <p className="text-muted-foreground">Email: billing@medcare.com</p>
                                <p className="text-muted-foreground">Phone: +1 (555) 123-4568</p>
                                <p className="text-muted-foreground">Hours: 24/7 for emergency payments</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
