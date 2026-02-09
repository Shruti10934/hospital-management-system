"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    User,
    Stethoscope,
    Mail,
    Phone,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    CheckCircle2,
    Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OTPInput } from "@/components/ui/otp-input";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

type UserType = "patient" | "doctor";
type Step = "details" | "otp" | "success";

export default function RegisterPage() {
    const [userType, setUserType] = useState<UserType>("patient");
    const [step, setStep] = useState<Step>("details");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });
    const [otp, setOtp] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setStep("otp");
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) return;
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setStep("success");
    };

    const handleResendOTP = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        setOtp("");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-12 lg:py-16 bg-gradient-to-br from-blue-50 via-background to-pastel-green/30 dark:from-navy/40 dark:via-background dark:to-emerald-950/20">
                    <div className="container mx-auto px-4 lg:px-8">
                        {/* Back Button */}
                        <Button asChild variant="ghost" className="mb-6">
                            <Link href="/">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Link>
                        </Button>

                        {/* Page Header */}
                        <div className="max-w-3xl mb-8">
                            <span className="text-corporate-blue font-medium text-sm uppercase tracking-wider">
                                Join Us
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
                                Create Your Account
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Register as a patient or doctor to access our
                                healthcare services and manage your
                                appointments.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Registration Form Section */}
                <section className="py-12 lg:py-16 bg-gradient-to-br from-blue-50 via-background to-pastel-green/30 dark:from-navy/40 dark:via-background dark:to-emerald-950/20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="max-w-xl mx-auto">
                            <Card className="border-0 shadow-xl">
                                <CardContent className="p-6 sm:p-8">
                                    {step === "details" && (
                                        <form
                                            onSubmit={handleSendOTP}
                                            className="space-y-6"
                                        >
                                            {/* User Type Selection */}
                                            <div className="space-y-3">
                                                <Label className="text-base font-semibold">
                                                    I am registering as a
                                                </Label>
                                                <RadioGroup
                                                    value={userType}
                                                    onValueChange={val =>
                                                        setUserType(
                                                            val as UserType
                                                        )
                                                    }
                                                    className="grid grid-cols-2 gap-4"
                                                >
                                                    <Label
                                                        htmlFor="patient"
                                                        className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                            userType ===
                                                            "patient"
                                                                ? "border-corporate-blue bg-corporate-blue/5"
                                                                : "border-border hover:border-corporate-blue/50"
                                                        }`}
                                                    >
                                                        <RadioGroupItem
                                                            value="patient"
                                                            id="patient"
                                                            className="sr-only"
                                                        />
                                                        <div
                                                            className={`w-14 h-14 rounded-full flex items-center justify-center ${
                                                                userType ===
                                                                "patient"
                                                                    ? "bg-corporate-blue text-white"
                                                                    : "bg-muted text-muted-foreground"
                                                            }`}
                                                        >
                                                            <User className="w-7 h-7" />
                                                        </div>
                                                        <span className="font-medium">
                                                            Patient
                                                        </span>
                                                    </Label>
                                                    <Label
                                                        htmlFor="doctor"
                                                        className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                            userType ===
                                                            "doctor"
                                                                ? "border-corporate-blue bg-corporate-blue/5"
                                                                : "border-border hover:border-corporate-blue/50"
                                                        }`}
                                                    >
                                                        <RadioGroupItem
                                                            value="doctor"
                                                            id="doctor"
                                                            className="sr-only"
                                                        />
                                                        <div
                                                            className={`w-14 h-14 rounded-full flex items-center justify-center ${
                                                                userType ===
                                                                "doctor"
                                                                    ? "bg-corporate-blue text-white"
                                                                    : "bg-muted text-muted-foreground"
                                                            }`}
                                                        >
                                                            <Stethoscope className="w-7 h-7" />
                                                        </div>
                                                        <span className="font-medium">
                                                            Doctor
                                                        </span>
                                                    </Label>
                                                </RadioGroup>
                                            </div>

                                            {/* Name Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="name">
                                                    Full Name
                                                </Label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        placeholder="Enter your full name"
                                                        value={formData.name}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                        className="pl-10 h-12 rounded-xl"
                                                    />
                                                </div>
                                            </div>

                                            {/* Email Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="email">
                                                    Email Address
                                                </Label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        value={formData.email}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                        className="pl-10 h-12 rounded-xl"
                                                    />
                                                </div>
                                            </div>

                                            {/* Phone Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">
                                                    Phone Number
                                                </Label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                    <Input
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        placeholder="Enter your phone number"
                                                        value={formData.phone}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                        className="pl-10 h-12 rounded-xl"
                                                    />
                                                </div>
                                            </div>

                                            {/* Password Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="password">
                                                    Password
                                                </Label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                    <Input
                                                        id="password"
                                                        name="password"
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        placeholder="Create a password"
                                                        value={
                                                            formData.password
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        required
                                                        className="pl-10 pr-10 h-12 rounded-xl"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="w-5 h-5" />
                                                        ) : (
                                                            <Eye className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full h-12 rounded-xl bg-corporate-blue hover:bg-corporate-blue/90 text-lg"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                        Sending OTP...
                                                    </>
                                                ) : (
                                                    <>
                                                        Continue
                                                        <ArrowRight className="w-5 h-5 ml-2" />
                                                    </>
                                                )}
                                            </Button>

                                            {/* Login Link */}
                                            <p className="text-center text-muted-foreground">
                                                Already have an account?{" "}
                                                <Link
                                                    href="/login"
                                                    className="text-corporate-blue hover:underline font-medium"
                                                >
                                                    Sign in
                                                </Link>
                                            </p>
                                        </form>
                                    )}

                                    {step === "otp" && (
                                        <form
                                            onSubmit={handleVerifyOTP}
                                            className="space-y-6"
                                        >
                                            {/* OTP Header */}
                                            <div className="text-center space-y-2">
                                                <div className="w-16 h-16 rounded-full bg-corporate-blue/10 flex items-center justify-center mx-auto mb-4">
                                                    <Mail className="w-8 h-8 text-corporate-blue" />
                                                </div>
                                                <h2 className="text-2xl font-bold text-foreground">
                                                    Verify Your Email
                                                </h2>
                                                <p className="text-muted-foreground">
                                                    We&apos;ve sent a 6-digit
                                                    code to
                                                </p>
                                                <p className="font-medium text-foreground">
                                                    {formData.email}
                                                </p>
                                            </div>

                                            {/* OTP Input */}
                                            <div className="py-4">
                                                <OTPInput
                                                    value={otp}
                                                    onChange={setOtp}
                                                    disabled={isLoading}
                                                />
                                            </div>

                                            {/* Verify Button */}
                                            <Button
                                                type="submit"
                                                disabled={
                                                    isLoading ||
                                                    otp.length !== 6
                                                }
                                                className="w-full h-12 rounded-xl bg-corporate-blue hover:bg-corporate-blue/90 text-lg"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                        Verifying...
                                                    </>
                                                ) : (
                                                    "Verify & Create Account"
                                                )}
                                            </Button>

                                            {/* Resend OTP */}
                                            <div className="text-center space-y-2">
                                                <p className="text-muted-foreground text-sm">
                                                    Didn&apos;t receive the
                                                    code?
                                                </p>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={handleResendOTP}
                                                    disabled={isLoading}
                                                    className="text-corporate-blue hover:text-corporate-blue"
                                                >
                                                    Resend OTP
                                                </Button>
                                            </div>

                                            {/* Back Button */}
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    setStep("details");
                                                    setOtp("");
                                                }}
                                                className="w-full rounded-xl"
                                            >
                                                <ArrowLeft className="w-4 h-4 mr-2" />
                                                Back to Details
                                            </Button>
                                        </form>
                                    )}

                                    {step === "success" && (
                                        <div className="text-center space-y-6 py-4">
                                            {/* Success Icon */}
                                            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center mx-auto">
                                                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                                            </div>

                                            {/* Success Message */}
                                            <div className="space-y-2">
                                                <h2 className="text-2xl font-bold text-foreground">
                                                    Registration Successful!
                                                </h2>
                                                <p className="text-muted-foreground">
                                                    Your {userType} account has
                                                    been created successfully.
                                                </p>
                                            </div>

                                            {/* Account Info */}
                                            <div className="bg-muted/50 rounded-xl p-4 space-y-2 text-left">
                                                <p className="text-sm text-muted-foreground">
                                                    Registered as
                                                </p>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-corporate-blue text-white flex items-center justify-center">
                                                        {userType ===
                                                        "doctor" ? (
                                                            <Stethoscope className="w-5 h-5" />
                                                        ) : (
                                                            <User className="w-5 h-5" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">
                                                            {formData.name}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {formData.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="space-y-3">
                                                <Button
                                                    asChild
                                                    className="w-full h-12 rounded-xl bg-corporate-blue hover:bg-corporate-blue/90"
                                                >
                                                    <Link href="/login">
                                                        Continue to Login
                                                        <ArrowRight className="w-5 h-5 ml-2" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    className="w-full rounded-xl"
                                                >
                                                    <Link href="/">
                                                        Back to Home
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
