"use client";

import { Clock, User, MoreVertical } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppointmentStatus = "upcoming" | "in-progress" | "completed" | "cancelled";

interface Appointment {
    id: string;
    patientName: string;
    time: string;
    type: string;
    status: AppointmentStatus;
}

// Dummy appointments data
const appointments: Appointment[] = [
    {
        id: "1",
        patientName: "John Smith",
        time: "09:00 AM",
        type: "Follow-up",
        status: "completed",
    },
    {
        id: "2",
        patientName: "Emma Johnson",
        time: "10:30 AM",
        type: "Consultation",
        status: "completed",
    },
    {
        id: "3",
        patientName: "Michael Brown",
        time: "11:45 AM",
        type: "Check-up",
        status: "in-progress",
    },
    {
        id: "4",
        patientName: "Sarah Davis",
        time: "02:00 PM",
        type: "ECG Test",
        status: "upcoming",
    },
    {
        id: "5",
        patientName: "Robert Wilson",
        time: "03:30 PM",
        type: "Consultation",
        status: "upcoming",
    },
    {
        id: "6",
        patientName: "Lisa Anderson",
        time: "04:15 PM",
        type: "Follow-up",
        status: "upcoming",
    },
];

const statusStyles: Record<
    AppointmentStatus,
    { bg: string; text: string; label: string }
> = {
    upcoming: {
        bg: "bg-pastel-blue",
        text: "text-corporate-blue dark:text-blue-400",
        label: "Upcoming",
    },
    "in-progress": {
        bg: "bg-pastel-peach",
        text: "text-orange-600 dark:text-orange-400",
        label: "In Progress",
    },
    completed: {
        bg: "bg-pastel-green",
        text: "text-emergency dark:text-green-400",
        label: "Completed",
    },
    cancelled: {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-600 dark:text-red-400",
        label: "Cancelled",
    },
};

export function TodaysAppointments() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-corporate-blue" />
                    Today&apos;s Appointments
                </CardTitle>
                <CardAction>
                    <Button variant="ghost" size="sm" className="text-xs">
                        View All
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-3">
                {appointments.map((appointment) => {
                    const status = statusStyles[appointment.status];

                    return (
                        <div
                            key={appointment.id}
                            className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                        >
                            <div className="flex items-center gap-3">
                                {/* Avatar */}
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-corporate-blue/20">
                                    <User className="h-5 w-5 text-corporate-blue" />
                                </div>

                                {/* Patient Info */}
                                <div>
                                    <p className="font-medium">
                                        {appointment.patientName}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {appointment.time} •{" "}
                                        {appointment.type}
                                    </p>
                                </div>
                            </div>

                            {/* Status & Actions */}
                            <div className="flex items-center gap-2">
                                <span
                                    className={cn(
                                        "rounded-full px-2.5 py-1 text-xs font-medium",
                                        status.bg,
                                        status.text
                                    )}
                                >
                                    {status.label}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon-xs"
                                    className="text-muted-foreground"
                                >
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
