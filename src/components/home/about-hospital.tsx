import Link from "next/link";
import { ArrowRight, Building, Users, Award, History } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutHospital() {
    return (
        <section id="about" className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-background to-blue-100/50 dark:from-navy/50 dark:via-background dark:to-navy/30 scroll-mt-20">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Image Side */}
                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800"
                                alt="MedCare Hospital Building"
                                className="w-full h-[400px] lg:h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                        </div>
                        {/* Stats Card */}
                        <div className="absolute -bottom-6 -right-6 bg-white dark:bg-card rounded-2xl p-6 shadow-xl border border-border/50">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-corporate-blue/10 flex items-center justify-center">
                                    <History className="w-6 h-6 text-corporate-blue" />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-foreground">
                                        40+
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Years of Excellence
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div>
                        <span className="text-corporate-blue font-medium text-sm uppercase tracking-wider">
                            About Us
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-6">
                            Welcome to MedCare Hospital
                        </h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            Established in 1985, MedCare Hospital has been a beacon of
                            healthcare excellence for over four decades. We are committed to
                            providing world-class medical care with compassion, innovation,
                            and integrity.
                        </p>
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            Our state-of-the-art facility houses the latest medical technology
                            and a team of 200+ highly qualified doctors and specialists
                            dedicated to your well-being. From routine check-ups to complex
                            surgeries, we deliver comprehensive healthcare solutions.
                        </p>

                        {/* Features */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-pastel-blue flex items-center justify-center flex-shrink-0">
                                    <Building className="w-5 h-5 text-corporate-blue" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">
                                        500+ Bed Capacity
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Modern rooms & ICUs
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-pastel-green flex items-center justify-center flex-shrink-0">
                                    <Users className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">
                                        50,000+ Patients
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Treated annually
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-pastel-lavender flex items-center justify-center flex-shrink-0">
                                    <Award className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">
                                        NABH Accredited
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Quality certified
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Button
                            asChild
                            size="lg"
                            className="bg-corporate-blue hover:bg-corporate-blue/90 text-white rounded-full px-8"
                        >
                            <Link href="/about">
                                Learn More About Us
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
