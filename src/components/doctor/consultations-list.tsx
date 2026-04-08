"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FileText,
    Search,
    Calendar,
    User,
    Video,
    ChevronRight,
    Filter,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Types based on schema
type AppointmentType = "in_person" | "video";

interface ConsultationListItem {
    id: string;
    appointmentId: string;
    patientName: string;
    patientGender: string;
    patientAge: number;
    appointmentType: AppointmentType;
    mainComplaint: string;
    diagnosis: string;
    createdAt: string;
}

// Dummy consultations data
const consultationsData: ConsultationListItem[] = [
    {
        id: "c1",
        appointmentId: "a1",
        patientName: "John Smith",
        patientGender: "Male",
        patientAge: 45,
        appointmentType: "in_person",
        mainComplaint: "Chest pain and shortness of breath",
        diagnosis: "Angina Pectoris",
        createdAt: "2026-02-08T14:30:00",
    },
    {
        id: "c2",
        appointmentId: "a2",
        patientName: "Emma Johnson",
        patientGender: "Female",
        patientAge: 32,
        appointmentType: "video",
        mainComplaint: "Palpitations and dizziness",
        diagnosis: "Supraventricular Tachycardia",
        createdAt: "2026-02-07T10:15:00",
    },
    {
        id: "c3",
        appointmentId: "a3",
        patientName: "Michael Brown",
        patientGender: "Male",
        patientAge: 58,
        appointmentType: "in_person",
        mainComplaint: "High blood pressure reading at home",
        diagnosis: "Hypertension Stage 2",
        createdAt: "2026-02-06T16:00:00",
    },
    {
        id: "c4",
        appointmentId: "a4",
        patientName: "Sarah Davis",
        patientGender: "Female",
        patientAge: 41,
        appointmentType: "in_person",
        mainComplaint: "Swelling in legs and fatigue",
        diagnosis: "Congestive Heart Failure - Early Stage",
        createdAt: "2026-02-05T11:30:00",
    },
    {
        id: "c5",
        appointmentId: "a5",
        patientName: "Robert Wilson",
        patientGender: "Male",
        patientAge: 67,
        appointmentType: "video",
        mainComplaint: "Follow-up after stent placement",
        diagnosis: "Post-PCI Follow-up - Stable",
        createdAt: "2026-02-04T09:00:00",
    },
    {
        id: "c6",
        appointmentId: "a6",
        patientName: "Lisa Anderson",
        patientGender: "Female",
        patientAge: 29,
        appointmentType: "in_person",
        mainComplaint: "Heart murmur detected during routine checkup",
        diagnosis: "Mitral Valve Prolapse - Mild",
        createdAt: "2026-02-03T15:45:00",
    },
];

export function ConsultationsList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<"all" | AppointmentType>(
        "all"
    );

    const filteredConsultations = consultationsData.filter((c) => {
        const matchesSearch =
            c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.mainComplaint.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType =
            filterType === "all" || c.appointmentType === filterType;

        return matchesSearch && matchesType;
    });

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const formatTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold">Previous Consultations</h1>
                <p className="text-muted-foreground">
                    View and manage your past patient consultations
                </p>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="py-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search by patient name, diagnosis..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Type Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <div className="flex gap-1 rounded-lg bg-muted p-1">
                                {(
                                    ["all", "in_person", "video"] as const
                                ).map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setFilterType(type)}
                                        className={cn(
                                            "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                                            filterType === type
                                                ? "bg-background text-foreground shadow-sm"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {type === "all"
                                            ? "All"
                                            : type === "in_person"
                                                ? "In Person"
                                                : "Video"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Consultations List */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-corporate-blue" />
                        Consultation Records
                    </CardTitle>
                    <CardDescription>
                        {filteredConsultations.length} consultation
                        {filteredConsultations.length !== 1 ? "s" : ""} found
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {filteredConsultations.length > 0 ? (
                        <div className="space-y-3">
                            {filteredConsultations.map((consultation) => (
                                <Link
                                    key={consultation.id}
                                    href={`/doctor/consultations/${consultation.id}`}
                                    className="group flex items-center gap-4 rounded-lg border p-4 transition-all hover:border-corporate-blue hover:bg-muted/50"
                                >
                                    {/* Patient Avatar */}
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-corporate-blue/20">
                                        <User className="h-6 w-6 text-corporate-blue" />
                                    </div>

                                    {/* Main Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold truncate">
                                                {consultation.patientName}
                                            </h3>
                                            <span className="shrink-0 text-xs text-muted-foreground">
                                                {consultation.patientAge}y,{" "}
                                                {consultation.patientGender}
                                            </span>
                                            {consultation.appointmentType ===
                                                "video" ? (
                                                <Video className="h-4 w-4 text-corporate-blue shrink-0" />
                                            ) : null}
                                        </div>
                                        <p className="text-sm text-muted-foreground truncate">
                                            {consultation.mainComplaint}
                                        </p>
                                        <p className="mt-1 text-sm font-medium text-corporate-blue">
                                            Dx: {consultation.diagnosis}
                                        </p>
                                    </div>

                                    {/* Date & Arrow */}
                                    <div className="shrink-0 text-right">
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            {formatDate(consultation.createdAt)}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {formatTime(consultation.createdAt)}
                                        </p>
                                    </div>

                                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <FileText className="h-12 w-12 text-muted-foreground/50 mb-2" />
                            <p className="text-muted-foreground">
                                No consultations found
                            </p>
                            {searchTerm && (
                                <Button
                                    variant="link"
                                    onClick={() => setSearchTerm("")}
                                    className="mt-2"
                                >
                                    Clear search
                                </Button>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
