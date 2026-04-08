"use client";

import Link from "next/link";
import {
    ArrowLeft,
    User,
    Calendar,
    Clock,
    Video,
    Activity,
    Stethoscope,
    FileText,
    ClipboardList,
    Pill,
    CalendarCheck,
    Thermometer,
    Heart,
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
interface Vitals {
    bloodPressureSystolic?: number;
    bloodPressureDiastolic?: number;
    temperature?: number;
    pulse?: number;
}

interface ConsultationDetail {
    id: string;
    appointmentId: string;

    // Patient info (from appointment -> patient)
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    patientDob: string;
    patientGender: string;
    patientBloodGroup: string;
    patientAllergies: string | null;
    patientChronicConditions: string | null;

    // Appointment info
    appointmentType: "in_person" | "video";
    scheduledAt: string;
    durationMinutes: number;

    // Consultation details
    mainComplaint: string;
    currentIllness: string | null;
    history: string | null;
    symptoms: string;
    vitals: Vitals | null;

    diagnosis: string;
    treatmentPlan: string;

    followUpInstructions: string | null;
    followUpDate: string | null;
    notes: string | null;

    createdAt: string;
}

// Dummy consultation detail data
const consultationData: Record<string, ConsultationDetail> = {
    c1: {
        id: "c1",
        appointmentId: "a1",

        patientName: "John Smith",
        patientEmail: "john.smith@email.com",
        patientPhone: "9876543210",
        patientDob: "1981-05-15",
        patientGender: "Male",
        patientBloodGroup: "O+",
        patientAllergies: "Penicillin",
        patientChronicConditions: "Type 2 Diabetes",

        appointmentType: "in_person",
        scheduledAt: "2026-02-08T14:30:00",
        durationMinutes: 45,

        mainComplaint: "Chest pain and shortness of breath",
        currentIllness:
            "Patient reports experiencing intermittent chest pain for the past 2 weeks. Pain is described as pressure-like, radiating to left arm, typically occurring during physical exertion and relieved by rest.",
        history:
            "Previous history of hyperlipidemia. Father had MI at age 55. Non-smoker. Occasional alcohol use.",
        symptoms:
            "Chest pain (exertional), Shortness of breath, Fatigue, Occasional palpitations",
        vitals: {
            bloodPressureSystolic: 145,
            bloodPressureDiastolic: 92,
            temperature: 98.4,
            pulse: 88,
        },

        diagnosis: "Angina Pectoris (Stable)",
        treatmentPlan:
            "1. Start Aspirin 75mg OD\n2. Atorvastatin 20mg OD\n3. Isosorbide mononitrate 10mg BD\n4. ECG and 2D Echo recommended\n5. Treadmill test after echo results\n6. Dietary modifications - low sodium, low fat diet\n7. Gradual exercise program",

        followUpInstructions:
            "Return with ECG and Echo reports. Monitor BP at home. Avoid strenuous activity until next visit. Come immediately if chest pain persists more than 15 minutes or occurs at rest.",
        followUpDate: "2026-02-15",
        notes: "Patient is anxious about cardiac diagnosis. Reassured about good prognosis with proper management. Spouse present during consultation.",

        createdAt: "2026-02-08T14:30:00",
    },
};

interface ConsultationDetailProps {
    consultationId: string;
}

export function ConsultationDetail({
    consultationId,
}: ConsultationDetailProps) {
    const consultation = consultationData[consultationId];

    if (!consultation) {
        return (
            <div className="space-y-6">
                <Link href="/doctor/consultations">
                    <Button variant="ghost" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Consultations
                    </Button>
                </Link>
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <FileText className="h-12 w-12 text-muted-foreground/50 mb-2" />
                        <p className="text-muted-foreground">
                            Consultation not found
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
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

    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <Link href="/doctor/consultations">
                <Button variant="ghost" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Consultations
                </Button>
            </Link>

            {/* Header */}
            <Card className="border-0 bg-gradient-to-r from-corporate-blue to-primary text-white shadow-lg">
                <CardContent className="py-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl font-bold">
                                {consultation.patientName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">
                                    {consultation.patientName}
                                </h1>
                                <p className="text-white/80">
                                    {calculateAge(consultation.patientDob)}{" "}
                                    years, {consultation.patientGender} •{" "}
                                    {consultation.patientBloodGroup}
                                </p>
                                <div className="mt-2 flex items-center gap-4 text-sm text-white/70">
                                    <span>{consultation.patientEmail}</span>
                                    <span>{consultation.patientPhone}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 text-sm">
                            <div className="flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5">
                                <Calendar className="h-4 w-4" />
                                {formatDate(consultation.scheduledAt)}
                            </div>
                            <div className="flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5">
                                <Clock className="h-4 w-4" />
                                {formatTime(consultation.scheduledAt)}
                            </div>
                            <div className="flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5">
                                {consultation.appointmentType === "video" ? (
                                    <Video className="h-4 w-4" />
                                ) : (
                                    <User className="h-4 w-4" />
                                )}
                                {consultation.appointmentType === "video"
                                    ? "Video"
                                    : "In Person"}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Chief Complaint */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Stethoscope className="h-5 w-5 text-corporate-blue" />
                                Chief Complaint
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-medium">
                                {consultation.mainComplaint}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Symptoms & History */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <ClipboardList className="h-5 w-5 text-corporate-blue" />
                                Clinical Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                    Symptoms
                                </h4>
                                <p>{consultation.symptoms}</p>
                            </div>
                            {consultation.currentIllness && (
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                        History of Present Illness
                                    </h4>
                                    <p>{consultation.currentIllness}</p>
                                </div>
                            )}
                            {consultation.history && (
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                        Past Medical History
                                    </h4>
                                    <p>{consultation.history}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Diagnosis & Treatment */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Pill className="h-5 w-5 text-corporate-blue" />
                                Diagnosis & Treatment
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                    Diagnosis
                                </h4>
                                <p className="font-semibold text-corporate-blue">
                                    {consultation.diagnosis}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                    Treatment Plan
                                </h4>
                                <pre className="whitespace-pre-wrap font-sans text-sm">
                                    {consultation.treatmentPlan}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Follow-up */}
                    {(consultation.followUpDate ||
                        consultation.followUpInstructions) && (
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <CalendarCheck className="h-5 w-5 text-corporate-blue" />
                                        Follow-up
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {consultation.followUpDate && (
                                        <div className="flex items-center gap-2 rounded-lg bg-pastel-blue p-3">
                                            <Calendar className="h-5 w-5 text-corporate-blue" />
                                            <span className="font-medium">
                                                Scheduled:{" "}
                                                {formatDate(
                                                    consultation.followUpDate
                                                )}
                                            </span>
                                        </div>
                                    )}
                                    {consultation.followUpInstructions && (
                                        <div>
                                            <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                                Instructions
                                            </h4>
                                            <p>
                                                {consultation.followUpInstructions}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                    {/* Notes */}
                    {consultation.notes && (
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <FileText className="h-5 w-5 text-corporate-blue" />
                                    Additional Notes
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    {consultation.notes}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Vitals */}
                    {consultation.vitals && (
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Activity className="h-5 w-5 text-corporate-blue" />
                                    Vitals
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {consultation.vitals.bloodPressureSystolic && (
                                    <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                                        <div className="flex items-center gap-2">
                                            <Heart className="h-4 w-4 text-red-500" />
                                            <span className="text-sm">BP</span>
                                        </div>
                                        <span className="font-bold">
                                            {
                                                consultation.vitals
                                                    .bloodPressureSystolic
                                            }
                                            /
                                            {
                                                consultation.vitals
                                                    .bloodPressureDiastolic
                                            }{" "}
                                            mmHg
                                        </span>
                                    </div>
                                )}
                                {consultation.vitals.pulse && (
                                    <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                                        <div className="flex items-center gap-2">
                                            <Activity className="h-4 w-4 text-orange-500" />
                                            <span className="text-sm">
                                                Pulse
                                            </span>
                                        </div>
                                        <span className="font-bold">
                                            {consultation.vitals.pulse} bpm
                                        </span>
                                    </div>
                                )}
                                {consultation.vitals.temperature && (
                                    <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                                        <div className="flex items-center gap-2">
                                            <Thermometer className="h-4 w-4 text-blue-500" />
                                            <span className="text-sm">
                                                Temp
                                            </span>
                                        </div>
                                        <span className="font-bold">
                                            {consultation.vitals.temperature}°F
                                        </span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Patient Info */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <User className="h-5 w-5 text-corporate-blue" />
                                Patient Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            {consultation.patientAllergies && (
                                <div>
                                    <span className="text-muted-foreground">
                                        Allergies
                                    </span>
                                    <p className="font-medium text-destructive">
                                        {consultation.patientAllergies}
                                    </p>
                                </div>
                            )}
                            {consultation.patientChronicConditions && (
                                <div>
                                    <span className="text-muted-foreground">
                                        Chronic Conditions
                                    </span>
                                    <p className="font-medium">
                                        {consultation.patientChronicConditions}
                                    </p>
                                </div>
                            )}
                            <div>
                                <span className="text-muted-foreground">
                                    Date of Birth
                                </span>
                                <p className="font-medium">
                                    {formatDate(consultation.patientDob)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
