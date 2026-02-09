import { Award, Shield, CheckCircle, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const accreditations = [
    {
        name: "NABH",
        fullName: "National Accreditation Board for Hospitals",
        description: "Quality healthcare standards certification",
        year: "Since 2010",
    },
    {
        name: "NABL",
        fullName: "National Accreditation Board for Testing",
        description: "Laboratory quality certification",
        year: "Since 2012",
    },
    {
        name: "JCI",
        fullName: "Joint Commission International",
        description: "Global healthcare quality standards",
        year: "Since 2015",
    },
    {
        name: "ISO 9001",
        fullName: "Quality Management System",
        description: "International quality management",
        year: "Since 2008",
    },
];

const certifications = [
    "Green Hospital Certification",
    "Blood Bank Licensed",
    "Organ Transplant Authorized",
    "Nuclear Medicine Licensed",
    "AERB Certified for Radiology",
    "Bio-Medical Waste Management",
];

export function Accreditations() {
    return (
        <section
            id="accreditations"
            className="py-16 lg:py-24 bg-gradient-to-tr from-pastel-blue/40 via-background to-blue-50 dark:from-blue-950/30 dark:via-background dark:to-navy/40 scroll-mt-20"
        >
            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-corporate-blue font-medium text-sm uppercase tracking-wider">
                        Quality Assurance
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-4">
                        Accreditations & Certifications
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Our commitment to excellence is validated by leading national
                        and international healthcare accreditation bodies.
                    </p>
                </div>

                {/* Accreditation Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {accreditations.map((acc) => (
                        <Card
                            key={acc.name}
                            className="border-0 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 text-center"
                        >
                            <CardContent className="p-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-corporate-blue to-blue-600 flex items-center justify-center mx-auto mb-4">
                                    <Award className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-1">
                                    {acc.name}
                                </h3>
                                <p className="text-sm text-corporate-blue font-medium mb-2">
                                    {acc.year}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {acc.fullName}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Other Certifications */}
                <div className="bg-muted/30 rounded-3xl p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-corporate-blue/10 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-corporate-blue" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">
                            Other Certifications & Licenses
                        </h3>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {certifications.map((cert) => (
                            <div
                                key={cert}
                                className="flex items-center gap-3 bg-background rounded-xl p-4 shadow-sm"
                            >
                                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                <span className="text-sm text-foreground">
                                    {cert}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust Badge */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pastel-green">
                        <Star className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                            Rated 4.8/5 by 10,000+ patients
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
