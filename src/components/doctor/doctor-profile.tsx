"use client";

import { useState } from "react";
import {
    User,
    Mail,
    Phone,
    Award,
    Briefcase,
    GraduationCap,
    Clock,
    IndianRupee,
    Building,
    FileText,
    Camera,
    Save,
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
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Dummy doctor data based on schema
const doctorData = {
    // From users table
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@medcare.com",
    phone: "9876543210",
    isVerified: true,
    createdAt: "2023-06-15",

    // From doctors table
    licenseNumber: "MED-2023-78456",
    qualifications: "MBBS, MD (Cardiology), DM (Interventional Cardiology)",
    specialization: "Cardiology",
    experienceYears: 12,
    bio: "Dr. Sarah Wilson is a board-certified cardiologist with over 12 years of experience in diagnosing and treating cardiovascular diseases. She specializes in interventional cardiology and has performed over 2000 cardiac procedures.",
    avatarUrl: null,
    consultationFee: "800.00",

    // From departments table
    department: {
        id: 1,
        name: "Cardiology",
    },

    // From doctorAvailability table
    availability: {
        workingDays: "Mon, Tue, Wed, Thu, Fri",
        startTime: "09:00",
        endTime: "17:00",
        slotDurationMinutes: 30,
    },
};

type TabType = "personal" | "professional" | "availability";

const tabs: { id: TabType; label: string }[] = [
    { id: "personal", label: "Personal Info" },
    { id: "professional", label: "Professional" },
    { id: "availability", label: "Availability" },
];

export function DoctorProfile() {
    const [activeTab, setActiveTab] = useState<TabType>("personal");
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="space-y-6">
            {/* Profile Header Card */}
            <Card className="border-0 bg-gradient-to-r from-corporate-blue to-primary text-white shadow-lg overflow-hidden">
                <CardContent className="py-8">
                    <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/20 text-4xl font-bold backdrop-blur-sm ring-4 ring-white/30">
                                {doctorData.name
                                    .split(" ")
                                    .slice(1)
                                    .map((n) => n[0])
                                    .join("")}
                            </div>
                            <button className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white text-corporate-blue shadow-lg transition-transform hover:scale-110">
                                <Camera className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center gap-2 md:justify-start">
                                <h1 className="text-2xl font-bold md:text-3xl">
                                    {doctorData.name}
                                </h1>
                                {doctorData.isVerified && (
                                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm">
                                        ✓ Verified
                                    </span>
                                )}
                            </div>
                            <p className="mt-1 text-white/80">
                                {doctorData.specialization} •{" "}
                                {doctorData.department.name} Department
                            </p>
                            <p className="mt-0.5 text-sm text-white/60">
                                License: {doctorData.licenseNumber}
                            </p>

                            {/* Quick Stats */}
                            <div className="mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
                                <div className="rounded-lg bg-white/15 px-4 py-2 backdrop-blur-sm">
                                    <p className="text-lg font-bold">
                                        {doctorData.experienceYears}+
                                    </p>
                                    <p className="text-xs text-white/80">
                                        Years Exp.
                                    </p>
                                </div>
                                <div className="rounded-lg bg-white/15 px-4 py-2 backdrop-blur-sm">
                                    <p className="text-lg font-bold">
                                        ₹{doctorData.consultationFee}
                                    </p>
                                    <p className="text-xs text-white/80">
                                        Consultation
                                    </p>
                                </div>
                                <div className="rounded-lg bg-white/15 px-4 py-2 backdrop-blur-sm">
                                    <p className="text-lg font-bold">
                                        {
                                            doctorData.availability.slotDurationMinutes
                                        }{" "}
                                        min
                                    </p>
                                    <p className="text-xs text-white/80">
                                        Slot Duration
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Edit Button */}
                        <Button
                            variant={isEditing ? "default" : "secondary"}
                            onClick={() => setIsEditing(!isEditing)}
                            className={cn(
                                isEditing
                                    ? "bg-white text-corporate-blue hover:bg-white/90"
                                    : "bg-white/20 text-white hover:bg-white/30"
                            )}
                        >
                            {isEditing ? (
                                <>
                                    <Save className="h-4 w-4" />
                                    Save Changes
                                </>
                            ) : (
                                "Edit Profile"
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Tabs */}
            <div className="flex gap-1 rounded-lg bg-muted p-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all",
                            activeTab === tab.id
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === "personal" && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-corporate-blue" />
                            Personal Information
                        </CardTitle>
                        <CardDescription>
                            Basic contact and identification details
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                Full Name
                            </Label>
                            <Input
                                value={doctorData.name}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                Email Address
                            </Label>
                            <Input
                                type="email"
                                value={doctorData.email}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                Phone Number
                            </Label>
                            <Input
                                type="tel"
                                value={doctorData.phone}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                License Number
                            </Label>
                            <Input
                                value={doctorData.licenseNumber}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="col-span-full space-y-2">
                            <Label className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                Bio
                            </Label>
                            <textarea
                                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                                value={doctorData.bio || ""}
                                disabled={!isEditing}
                            />
                        </div>
                    </CardContent>
                </Card>
            )}

            {activeTab === "professional" && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-corporate-blue" />
                            Professional Details
                        </CardTitle>
                        <CardDescription>
                            Medical qualifications and expertise
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-muted-foreground" />
                                Specialization
                            </Label>
                            <Input
                                value={doctorData.specialization}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Building className="h-4 w-4 text-muted-foreground" />
                                Department
                            </Label>
                            <Input
                                value={doctorData.department.name}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                                Experience (Years)
                            </Label>
                            <Input
                                type="number"
                                value={doctorData.experienceYears}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <IndianRupee className="h-4 w-4 text-muted-foreground" />
                                Consultation Fee
                            </Label>
                            <Input
                                type="number"
                                value={doctorData.consultationFee}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="col-span-full space-y-2">
                            <Label className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                Qualifications
                            </Label>
                            <textarea
                                className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                                value={doctorData.qualifications}
                                disabled={!isEditing}
                            />
                        </div>
                    </CardContent>
                </Card>
            )}

            {activeTab === "availability" && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-corporate-blue" />
                            Availability Settings
                        </CardTitle>
                        <CardDescription>
                            Working hours and appointment slots
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <div className="col-span-full space-y-2">
                            <Label className="flex items-center gap-2">
                                Working Days
                            </Label>
                            <Input
                                value={doctorData.availability.workingDays}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Start Time</Label>
                            <Input
                                type="time"
                                value={doctorData.availability.startTime}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>End Time</Label>
                            <Input
                                type="time"
                                value={doctorData.availability.endTime}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Slot Duration (minutes)</Label>
                            <Input
                                type="number"
                                value={
                                    doctorData.availability.slotDurationMinutes
                                }
                                disabled={!isEditing}
                            />
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
