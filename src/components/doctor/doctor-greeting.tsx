"use client";

import { CalendarDays, Users, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Dummy doctor data
const doctor = {
    name: "Sarah Wilson",
    patientsToday: 8,
    pendingConsultations: 3,
};

function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
}

function formatDate(): string {
    return new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function DoctorGreeting() {
    return (
        <Card className="border-0 bg-gradient-to-r from-corporate-blue to-primary text-white shadow-lg">
            <CardContent className="py-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    {/* Greeting Text */}
                    <div>
                        <h1 className="text-2xl font-bold md:text-3xl">
                            {getGreeting()}, Dr. {doctor.name}! 👋
                        </h1>
                        <p className="mt-1 flex items-center gap-2 text-white/80">
                            <CalendarDays className="h-4 w-4" />
                            {formatDate()}
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex gap-4">
                        <div className="flex items-center gap-3 rounded-lg bg-white/15 px-4 py-3 backdrop-blur-sm">
                            <Users className="h-5 w-5" />
                            <div>
                                <p className="text-xl font-bold">
                                    {doctor.patientsToday}
                                </p>
                                <p className="text-xs text-white/80">
                                    Patients Today
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-white/15 px-4 py-3 backdrop-blur-sm">
                            <Clock className="h-5 w-5" />
                            <div>
                                <p className="text-xl font-bold">
                                    {doctor.pendingConsultations}
                                </p>
                                <p className="text-xs text-white/80">Pending</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
