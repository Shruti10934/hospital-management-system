"use client";

import { useState } from "react";
import {
    Calendar,
    Clock,
    ChevronLeft,
    ChevronRight,
    Video,
    User,
    Plus,
    CalendarOff,
    Check,
    X,
    AlertCircle,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Types based on schema
type AppointmentType = "in_person" | "video";
type AppointmentStatus =
    | "pending"
    | "confirmed"
    | "completed"
    | "cancelled"
    | "no_show";
type LeaveStatus = "pending" | "approved" | "rejected";

interface Appointment {
    id: string;
    patientName: string;
    type: AppointmentType;
    scheduledAt: string;
    durationMinutes: number;
    status: AppointmentStatus;
}

interface Leave {
    id: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: LeaveStatus;
}

// Dummy appointments data
const appointmentsData: Record<string, Appointment[]> = {
    "2026-02-09": [
        {
            id: "1",
            patientName: "John Smith",
            type: "in_person",
            scheduledAt: "09:00",
            durationMinutes: 30,
            status: "completed",
        },
        {
            id: "2",
            patientName: "Emma Johnson",
            type: "video",
            scheduledAt: "10:30",
            durationMinutes: 30,
            status: "completed",
        },
        {
            id: "3",
            patientName: "Michael Brown",
            type: "in_person",
            scheduledAt: "11:30",
            durationMinutes: 45,
            status: "confirmed",
        },
        {
            id: "4",
            patientName: "Sarah Davis",
            type: "in_person",
            scheduledAt: "14:00",
            durationMinutes: 30,
            status: "pending",
        },
        {
            id: "5",
            patientName: "Robert Wilson",
            type: "video",
            scheduledAt: "15:30",
            durationMinutes: 30,
            status: "pending",
        },
    ],
    "2026-02-10": [
        {
            id: "6",
            patientName: "Lisa Anderson",
            type: "in_person",
            scheduledAt: "09:30",
            durationMinutes: 30,
            status: "confirmed",
        },
        {
            id: "7",
            patientName: "James Taylor",
            type: "video",
            scheduledAt: "11:00",
            durationMinutes: 30,
            status: "pending",
        },
    ],
    "2026-02-11": [
        {
            id: "8",
            patientName: "Mary White",
            type: "in_person",
            scheduledAt: "10:00",
            durationMinutes: 45,
            status: "confirmed",
        },
    ],
};

// Dummy leaves data
const leavesData: Leave[] = [
    {
        id: "1",
        startDate: "2026-02-15",
        endDate: "2026-02-16",
        reason: "Medical conference attendance",
        status: "approved",
    },
    {
        id: "2",
        startDate: "2026-02-20",
        endDate: "2026-02-20",
        reason: "Personal leave",
        status: "pending",
    },
];

const statusColors: Record<AppointmentStatus, { bg: string; text: string }> = {
    pending: {
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
        text: "text-yellow-700 dark:text-yellow-400",
    },
    confirmed: {
        bg: "bg-pastel-blue",
        text: "text-corporate-blue dark:text-blue-400",
    },
    completed: {
        bg: "bg-pastel-green",
        text: "text-emergency dark:text-green-400",
    },
    cancelled: {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-600 dark:text-red-400",
    },
    no_show: {
        bg: "bg-gray-100 dark:bg-gray-800",
        text: "text-gray-600 dark:text-gray-400",
    },
};

const leaveStatusColors: Record<LeaveStatus, { bg: string; text: string }> = {
    pending: {
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
        text: "text-yellow-700 dark:text-yellow-400",
    },
    approved: {
        bg: "bg-pastel-green",
        text: "text-emergency dark:text-green-400",
    },
    rejected: {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-600 dark:text-red-400",
    },
};

type TabType = "calendar" | "leaves";

export function ScheduleManager() {
    const [activeTab, setActiveTab] = useState<TabType>("calendar");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const now = new Date();
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(now.setDate(diff));
    });

    // Format date for lookup
    const formatDate = (date: Date) => date.toISOString().split("T")[0];
    const selectedDateStr = formatDate(selectedDate);
    const todaysAppointments = appointmentsData[selectedDateStr] || [];

    // Get week days
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(currentWeekStart);
        date.setDate(date.getDate() + i);
        return date;
    });

    const navigateWeek = (direction: "prev" | "next") => {
        const newStart = new Date(currentWeekStart);
        newStart.setDate(newStart.getDate() + (direction === "next" ? 7 : -7));
        setCurrentWeekStart(newStart);
    };

    const isToday = (date: Date) =>
        formatDate(date) === formatDate(new Date());

    const hasAppointments = (date: Date) =>
        !!appointmentsData[formatDate(date)]?.length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Schedule Manager</h1>
                    <p className="text-muted-foreground">
                        Manage your appointments and availability
                    </p>
                </div>
                <Button>
                    <Plus className="h-4 w-4" />
                    Request Leave
                </Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 rounded-lg bg-muted p-1">
                <button
                    onClick={() => setActiveTab("calendar")}
                    className={cn(
                        "flex items-center gap-2 flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all",
                        activeTab === "calendar"
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <Calendar className="h-4 w-4" />
                    Calendar
                </button>
                <button
                    onClick={() => setActiveTab("leaves")}
                    className={cn(
                        "flex items-center gap-2 flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all",
                        activeTab === "leaves"
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <CalendarOff className="h-4 w-4" />
                    Leave Requests
                    {leavesData.filter((l) => l.status === "pending").length >
                        0 && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-corporate-blue text-xs text-white">
                                {
                                    leavesData.filter((l) => l.status === "pending")
                                        .length
                                }
                            </span>
                        )}
                </button>
            </div>

            {/* Calendar Tab */}
            {activeTab === "calendar" && (
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Week View */}
                    <Card className="lg:col-span-2">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-corporate-blue" />
                                    Weekly Schedule
                                </CardTitle>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon-sm"
                                        onClick={() => navigateWeek("prev")}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <span className="text-sm font-medium min-w-[140px] text-center">
                                        {currentWeekStart.toLocaleDateString(
                                            "en-US",
                                            {
                                                month: "short",
                                                day: "numeric",
                                            }
                                        )}{" "}
                                        -{" "}
                                        {new Date(
                                            currentWeekStart.getTime() +
                                            6 * 24 * 60 * 60 * 1000
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="icon-sm"
                                        onClick={() => navigateWeek("next")}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Week Days Grid */}
                            <div className="grid grid-cols-7 gap-2 mb-4">
                                {weekDays.map((date) => (
                                    <button
                                        key={date.toISOString()}
                                        onClick={() => setSelectedDate(date)}
                                        className={cn(
                                            "flex flex-col items-center gap-1 rounded-lg p-3 transition-all",
                                            formatDate(date) ===
                                                selectedDateStr
                                                ? "bg-corporate-blue text-white"
                                                : isToday(date)
                                                    ? "bg-pastel-blue text-corporate-blue"
                                                    : "hover:bg-muted"
                                        )}
                                    >
                                        <span className="text-xs font-medium uppercase">
                                            {date.toLocaleDateString("en-US", {
                                                weekday: "short",
                                            })}
                                        </span>
                                        <span className="text-lg font-bold">
                                            {date.getDate()}
                                        </span>
                                        {hasAppointments(date) && (
                                            <span
                                                className={cn(
                                                    "h-1.5 w-1.5 rounded-full",
                                                    formatDate(date) ===
                                                        selectedDateStr
                                                        ? "bg-white"
                                                        : "bg-corporate-blue"
                                                )}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Selected Day Appointments */}
                            <div className="border-t pt-4">
                                <h3 className="font-semibold mb-3">
                                    {selectedDate.toLocaleDateString("en-US", {
                                        weekday: "long",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </h3>
                                {todaysAppointments.length > 0 ? (
                                    <div className="space-y-2">
                                        {todaysAppointments.map((apt) => (
                                            <div
                                                key={apt.id}
                                                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                                                    {apt.type === "video" ? (
                                                        <Video className="h-5 w-5 text-corporate-blue" />
                                                    ) : (
                                                        <User className="h-5 w-5 text-corporate-blue" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium truncate">
                                                        {apt.patientName}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {apt.scheduledAt} •{" "}
                                                        {apt.durationMinutes}{" "}
                                                        min •{" "}
                                                        {apt.type === "video"
                                                            ? "Video Call"
                                                            : "In Person"}
                                                    </p>
                                                </div>
                                                <span
                                                    className={cn(
                                                        "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize",
                                                        statusColors[apt.status]
                                                            .bg,
                                                        statusColors[apt.status]
                                                            .text
                                                    )}
                                                >
                                                    {apt.status.replace(
                                                        "_",
                                                        " "
                                                    )}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <Calendar className="h-12 w-12 text-muted-foreground/50 mb-2" />
                                        <p className="text-muted-foreground">
                                            No appointments scheduled
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Sidebar */}
                    <div className="space-y-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">
                                    Today&apos;s Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Total Appointments
                                    </span>
                                    <span className="font-bold">
                                        {
                                            (
                                                appointmentsData[
                                                formatDate(new Date())
                                                ] || []
                                            ).length
                                        }
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Completed
                                    </span>
                                    <span className="font-bold text-emergency">
                                        {
                                            (
                                                appointmentsData[
                                                formatDate(new Date())
                                                ] || []
                                            ).filter(
                                                (a) => a.status === "completed"
                                            ).length
                                        }
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        Pending
                                    </span>
                                    <span className="font-bold text-yellow-600">
                                        {
                                            (
                                                appointmentsData[
                                                formatDate(new Date())
                                                ] || []
                                            ).filter(
                                                (a) => a.status === "pending"
                                            ).length
                                        }
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-corporate-blue" />
                                    Working Hours
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Days
                                    </span>
                                    <span>Mon - Fri</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Hours
                                    </span>
                                    <span>09:00 - 17:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Slot
                                    </span>
                                    <span>30 minutes</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {/* Leaves Tab */}
            {activeTab === "leaves" && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarOff className="h-5 w-5 text-corporate-blue" />
                            Leave Requests
                        </CardTitle>
                        <CardDescription>
                            View and manage your leave applications
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {leavesData.length > 0 ? (
                            <div className="space-y-3">
                                {leavesData.map((leave) => (
                                    <div
                                        key={leave.id}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={cn(
                                                    "flex h-10 w-10 items-center justify-center rounded-lg",
                                                    leaveStatusColors[
                                                        leave.status
                                                    ].bg
                                                )}
                                            >
                                                {leave.status === "approved" ? (
                                                    <Check
                                                        className={cn(
                                                            "h-5 w-5",
                                                            leaveStatusColors[
                                                                leave.status
                                                            ].text
                                                        )}
                                                    />
                                                ) : leave.status ===
                                                    "rejected" ? (
                                                    <X
                                                        className={cn(
                                                            "h-5 w-5",
                                                            leaveStatusColors[
                                                                leave.status
                                                            ].text
                                                        )}
                                                    />
                                                ) : (
                                                    <AlertCircle
                                                        className={cn(
                                                            "h-5 w-5",
                                                            leaveStatusColors[
                                                                leave.status
                                                            ].text
                                                        )}
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium">
                                                    {leave.reason}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(
                                                        leave.startDate
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                    {leave.startDate !==
                                                        leave.endDate &&
                                                        ` - ${new Date(leave.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                                                </p>
                                            </div>
                                        </div>
                                        <span
                                            className={cn(
                                                "rounded-full px-3 py-1 text-xs font-medium capitalize",
                                                leaveStatusColors[leave.status]
                                                    .bg,
                                                leaveStatusColors[leave.status]
                                                    .text
                                            )}
                                        >
                                            {leave.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <CalendarOff className="h-12 w-12 text-muted-foreground/50 mb-2" />
                                <p className="text-muted-foreground">
                                    No leave requests found
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
