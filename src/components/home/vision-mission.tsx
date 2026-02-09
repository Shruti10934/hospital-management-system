import { Target, Eye, Lightbulb, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function VisionMission() {
    return (
        <section
            id="vision-mission"
            className="py-16 lg:py-24 bg-gradient-to-bl from-blue-100/60 via-background to-pastel-lavender/30 dark:from-navy/40 dark:via-background dark:to-purple-950/20 scroll-mt-20"
        >
            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-corporate-blue font-medium text-sm uppercase tracking-wider">
                        Our Purpose
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-4">
                        Vision & Mission
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Guided by our core values, we strive to be the most trusted
                        healthcare provider in the region.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Vision Card */}
                    <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                        <div className="h-2 bg-gradient-to-r from-corporate-blue to-blue-400" />
                        <CardContent className="p-8">
                            <div className="w-14 h-14 rounded-2xl bg-corporate-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Eye className="w-7 h-7 text-corporate-blue" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-4">
                                Our Vision
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                To be the leading healthcare institution known for
                                clinical excellence, innovative medical practices, and
                                unwavering commitment to patient welfare. We envision a
                                healthier community where quality healthcare is
                                accessible to all.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Mission Card */}
                    <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                        <div className="h-2 bg-gradient-to-r from-emerald-500 to-emerald-400" />
                        <CardContent className="p-8">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Target className="w-7 h-7 text-emerald-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-4">
                                Our Mission
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                To provide compassionate, patient-centered healthcare
                                using advanced medical technology and evidence-based
                                practices. We are dedicated to healing, teaching, and
                                discovering for the betterment of our community.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Core Values */}
                <div className="mt-16">
                    <h3 className="text-xl font-semibold text-foreground text-center mb-8">
                        Our Core Values
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                icon: Heart,
                                label: "Compassion",
                                color: "text-red-500",
                                bg: "bg-red-50 dark:bg-red-950/30",
                            },
                            {
                                icon: Lightbulb,
                                label: "Innovation",
                                color: "text-amber-500",
                                bg: "bg-amber-50 dark:bg-amber-950/30",
                            },
                            {
                                icon: Target,
                                label: "Excellence",
                                color: "text-corporate-blue",
                                bg: "bg-blue-50 dark:bg-blue-950/30",
                            },
                            {
                                icon: Eye,
                                label: "Integrity",
                                color: "text-purple-500",
                                bg: "bg-purple-50 dark:bg-purple-950/30",
                            },
                        ].map((value) => (
                            <div
                                key={value.label}
                                className="text-center p-6 rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div
                                    className={`w-12 h-12 rounded-xl ${value.bg} flex items-center justify-center mx-auto mb-3`}
                                >
                                    <value.icon
                                        className={`w-6 h-6 ${value.color}`}
                                    />
                                </div>
                                <span className="font-medium text-foreground">
                                    {value.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
