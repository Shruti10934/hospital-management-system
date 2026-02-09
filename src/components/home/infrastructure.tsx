"use client";

import { useState } from "react";
import {
    Building2,
    Bed,
    FlaskConical,
    HeartPulse,
    Car,
    Utensils,
    Wifi,
    Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const facilities = [
    {
        id: "rooms",
        name: "Patient Rooms",
        icon: Bed,
        image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?q=80&w=800",
        features: [
            "500+ bed capacity with modern amenities",
            "Private, semi-private, and general wards",
            "Fully air-conditioned rooms",
            "24/7 nurse call system",
            "En-suite bathrooms with accessibility features",
        ],
    },
    {
        id: "icu",
        name: "ICU & Critical Care",
        icon: HeartPulse,
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800",
        features: [
            "100-bed multi-specialty ICU",
            "Cardiac Care Unit (CCU)",
            "Neonatal ICU (NICU)",
            "Advanced life support systems",
            "Dedicated isolation rooms",
        ],
    },
    {
        id: "diagnostic",
        name: "Diagnostic Center",
        icon: FlaskConical,
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800",
        features: [
            "3T MRI scanner",
            "128-slice CT scanner",
            "Digital X-ray & mammography",
            "Fully automated pathology lab",
            "24/7 emergency diagnostics",
        ],
    },
    {
        id: "ot",
        name: "Operation Theatres",
        icon: Building2,
        image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=800",
        features: [
            "15 modular operation theatres",
            "Laminar air flow systems",
            "Robotic surgery suite",
            "Hybrid OR for complex procedures",
            "HEPA-filtered sterile environment",
        ],
    },
];

const amenities = [
    { icon: Car, label: "Multi-level Parking" },
    { icon: Utensils, label: "24/7 Cafeteria" },
    { icon: Wifi, label: "Free WiFi" },
    { icon: Shield, label: "24/7 Security" },
];

export function Infrastructure() {
    const [activeTab, setActiveTab] = useState("rooms");
    const activeFacility = facilities.find((f) => f.id === activeTab)!;

    return (
        <section
            id="infrastructure"
            className="py-16 lg:py-24 bg-gradient-to-br from-blue-100/50 via-muted/30 to-pastel-cyan/30 dark:from-navy/50 dark:via-muted/30 dark:to-blue-950/30 scroll-mt-20"
        >
            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-corporate-blue font-medium text-sm uppercase tracking-wider">
                        World-Class Facilities
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-4">
                        Infrastructure & Facilities
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Our state-of-the-art infrastructure is designed to provide
                        the best possible care in a comfortable environment.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {facilities.map((facility) => (
                        <button
                            key={facility.id}
                            onClick={() => setActiveTab(facility.id)}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
                                activeTab === facility.id
                                    ? "bg-corporate-blue text-white shadow-lg"
                                    : "bg-background text-muted-foreground hover:bg-accent"
                            )}
                        >
                            <facility.icon className="w-5 h-5" />
                            {facility.name}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Image */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src={activeFacility.image}
                            alt={activeFacility.name}
                            className="w-full h-[400px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <h3 className="text-2xl font-bold text-white mb-2">
                                {activeFacility.name}
                            </h3>
                        </div>
                    </div>

                    {/* Features List */}
                    <div className="bg-background rounded-3xl p-8 shadow-lg">
                        <h4 className="text-lg font-semibold text-foreground mb-6">
                            Key Features
                        </h4>
                        <ul className="space-y-4">
                            {activeFacility.features.map((feature, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <div className="w-6 h-6 rounded-full bg-corporate-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-corporate-blue" />
                                    </div>
                                    <span className="text-muted-foreground">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Amenities */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {amenities.map((amenity) => (
                        <div
                            key={amenity.label}
                            className="flex items-center gap-3 bg-background rounded-2xl p-4 shadow-sm"
                        >
                            <div className="w-10 h-10 rounded-xl bg-corporate-blue/10 flex items-center justify-center">
                                <amenity.icon className="w-5 h-5 text-corporate-blue" />
                            </div>
                            <span className="font-medium text-foreground">
                                {amenity.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
