import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/shared/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Phone,
    Ambulance,
    HeartPulse,
    Clock,
    Users,
    Siren,
    CheckCircle,
} from "lucide-react";

const emergencyFeatures = [
    {
        icon: Clock,
        title: "24/7 Availability",
        description: "Round-the-clock emergency care with no waiting time",
    },
    {
        icon: Ambulance,
        title: "Ambulance Services",
        description: "Fully equipped ambulances with trained paramedics",
    },
    {
        icon: Users,
        title: "Expert Team",
        description: "Experienced emergency physicians always on duty",
    },
    {
        icon: HeartPulse,
        title: "Advanced Care",
        description: "State-of-the-art trauma and critical care units",
    },
];

const emergencyServices = [
    "Trauma Care",
    "Cardiac Emergencies",
    "Stroke Management",
    "Pediatric Emergencies",
    "Poisoning Cases",
    "Accident & Burns",
    "Respiratory Emergencies",
    "Surgical Emergencies",
];

export default function EmergencyPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />

            <main className="flex-1">
                <PageHero
                    title="Emergency Services"
                    subtitle="24/7 emergency medical care with rapid response and expert treatment for all medical emergencies."
                    breadcrumbs={[
                        { label: "Services", href: "/services" },
                        { label: "Emergency Services", href: "/services/emergency" },
                    ]}
                    backgroundImage="https://images.unsplash.com/photo-1587745416684-47953f16f02f?q=80&w=1920"
                />

                {/* Emergency Contact Banner */}
                <section className="bg-red-500 py-8">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                                    <Siren className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-white">
                                    <p className="text-sm opacity-90">
                                        Emergency Helpline
                                    </p>
                                    <p className="text-3xl font-bold">
                                        +1 (555) 911-9111
                                    </p>
                                </div>
                            </div>
                            <Button
                                asChild
                                size="lg"
                                className="bg-white text-red-500 hover:bg-white/90 rounded-full px-8"
                            >
                                <a href="tel:+15559119111">
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call Now
                                </a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4 lg:px-8">


                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {emergencyFeatures.map((feature) => (
                                <Card
                                    key={feature.title}
                                    className="border-0 shadow-md text-center"
                                >
                                    <CardContent className="p-6">
                                        <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                                            <feature.icon className="w-7 h-7 text-red-500" />
                                        </div>
                                        <h3 className="font-semibold text-foreground mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Emergency Services List */}
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground mb-6">
                                    Emergency Services We Provide
                                </h2>
                                <p className="text-muted-foreground mb-8">
                                    Our emergency department is fully equipped to handle a wide
                                    range of medical emergencies with expertise and care.
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {emergencyServices.map((service) => (
                                        <div
                                            key={service}
                                            className="flex items-center gap-3 bg-background rounded-xl p-4"
                                        >
                                            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                            <span className="text-foreground">
                                                {service}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800"
                                    alt="Emergency Department"
                                    className="w-full h-[400px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ambulance CTA */}
                <section className="py-16">
                    <div className="container mx-auto px-4 lg:px-8">
                        <Card className="border-0 shadow-xl bg-gradient-to-r from-red-500 to-red-600 overflow-hidden">
                            <CardContent className="p-8 lg:p-12">
                                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                                    <div className="text-white text-center lg:text-left">
                                        <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                                            Need an Ambulance?
                                        </h3>
                                        <p className="text-white/80 max-w-lg">
                                            Our fleet of advanced life support ambulances are
                                            available 24/7 for medical emergencies.
                                        </p>
                                    </div>
                                    <Button
                                        asChild
                                        size="lg"
                                        className="bg-white text-red-500 hover:bg-white/90 rounded-full px-8"
                                    >
                                        <a href="tel:+15559119111">
                                            <Ambulance className="w-5 h-5 mr-2" />
                                            Request Ambulance
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
