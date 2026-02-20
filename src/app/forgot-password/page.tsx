"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Loader2,
    CheckCircle2,
    KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OTPInput } from "@/components/ui/otp-input";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

type Step = "email" | "otp" | "reset" | "success";

export default function ForgotPasswordPage() {
    const [step, setStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setStep("otp");
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) return;
        setError("");
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setStep("reset");
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // if (password.length < 8) {
        //     setError("Password must be at least 8 characters");
        //     return;
        // }

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
                            <Link href="/login">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Login
                            </Link>
                        </Button>

                        {/* Page Header */}
                        <div className="max-w-3xl mb-8">
                            <span className="text-corporate-blue font-medium text-sm uppercase tracking-wider">
                                Account Recovery
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
                                Reset Your Password
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Enter your email address and we&apos;ll send you
                                a verification code to reset your password.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Form Section */}
                <section className="py-12 lg:py-16 bg-gradient-to-br from-blue-50 via-background to-pastel-green/30 dark:from-navy/40 dark:via-background dark:to-emerald-950/20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="max-w-xl mx-auto">
                            <Card className="border-0 shadow-xl">
                                <CardContent className="p-6 sm:p-8">
                                    {/* Step 1: Enter Email */}
                                    {step === "email" && (
                                        <form
                                            onSubmit={handleSendOTP}
                                            className="space-y-6"
                                        >
                                            {/* Header */}
                                            <div className="text-center space-y-2">
                                                <div className="w-16 h-16 rounded-full bg-corporate-blue/10 flex items-center justify-center mx-auto mb-4">
                                                    <KeyRound className="w-8 h-8 text-corporate-blue" />
                                                </div>
                                                <h2 className="text-2xl font-bold text-foreground">
                                                    Forgot Password?
                                                </h2>
                                                <p className="text-muted-foreground">
                                                    No worries, we&apos;ll send
                                                    you reset instructions.
                                                </p>
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
                                                        type="email"
                                                        placeholder="Enter your registered email"
                                                        value={email}
                                                        onChange={e =>
                                                            setEmail(
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                        className="pl-10 h-12 rounded-xl"
                                                    />
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
                                                    "Send Verification Code"
                                                )}
                                            </Button>

                                            {/* Back to Login */}
                                            <p className="text-center text-muted-foreground">
                                                Remember your password?{" "}
                                                <Link
                                                    href="/login"
                                                    className="text-corporate-blue hover:underline font-medium"
                                                >
                                                    Sign in
                                                </Link>
                                            </p>
                                        </form>
                                    )}

                                    {/* Step 2: Enter OTP */}
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
                                                    Check Your Email
                                                </h2>
                                                <p className="text-muted-foreground">
                                                    We&apos;ve sent a 6-digit
                                                    verification code to
                                                </p>
                                                <p className="font-medium text-foreground">
                                                    {email}
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
                                                    "Verify Code"
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
                                                    setStep("email");
                                                    setOtp("");
                                                }}
                                                className="w-full rounded-xl"
                                            >
                                                <ArrowLeft className="w-4 h-4 mr-2" />
                                                Change Email
                                            </Button>
                                        </form>
                                    )}

                                    {/* Step 3: Reset Password */}
                                    {step === "reset" && (
                                        <form
                                            onSubmit={handleResetPassword}
                                            className="space-y-6"
                                        >
                                            {/* Header */}
                                            <div className="text-center space-y-2">
                                                <div className="w-16 h-16 rounded-full bg-corporate-blue/10 flex items-center justify-center mx-auto mb-4">
                                                    <Lock className="w-8 h-8 text-corporate-blue" />
                                                </div>
                                                <h2 className="text-2xl font-bold text-foreground">
                                                    Set New Password
                                                </h2>
                                                <p className="text-muted-foreground">
                                                    Your new password must be
                                                    different from previously
                                                    used passwords.
                                                </p>
                                            </div>

                                            {/* Error Message */}
                                            {error && (
                                                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
                                                    {error}
                                                </div>
                                            )}

                                            {/* New Password Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="password">
                                                    New Password
                                                </Label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                    <Input
                                                        id="password"
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        placeholder="Enter new password"
                                                        value={password}
                                                        onChange={e =>
                                                            setPassword(
                                                                e.target.value
                                                            )
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
                                                <p className="text-xs text-muted-foreground">
                                                    Must be at least 8
                                                    characters
                                                </p>
                                            </div>

                                            {/* Confirm Password Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="confirmPassword">
                                                    Confirm New Password
                                                </Label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                    <Input
                                                        id="confirmPassword"
                                                        type={
                                                            showConfirmPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        placeholder="Confirm new password"
                                                        value={confirmPassword}
                                                        onChange={e =>
                                                            setConfirmPassword(
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                        className="pl-10 pr-10 h-12 rounded-xl"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowConfirmPassword(
                                                                !showConfirmPassword
                                                            )
                                                        }
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                    >
                                                        {showConfirmPassword ? (
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
                                                        Resetting Password...
                                                    </>
                                                ) : (
                                                    "Reset Password"
                                                )}
                                            </Button>
                                        </form>
                                    )}

                                    {/* Step 4: Success */}
                                    {step === "success" && (
                                        <div className="text-center space-y-6 py-4">
                                            {/* Success Icon */}
                                            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center mx-auto">
                                                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                                            </div>

                                            {/* Success Message */}
                                            <div className="space-y-2">
                                                <h2 className="text-2xl font-bold text-foreground">
                                                    Password Reset Successful!
                                                </h2>
                                                <p className="text-muted-foreground">
                                                    Your password has been
                                                    successfully reset. You can
                                                    now sign in with your new
                                                    password.
                                                </p>
                                            </div>

                                            {/* Action Button */}
                                            <Button
                                                asChild
                                                className="w-full h-12 rounded-xl bg-corporate-blue hover:bg-corporate-blue/90 text-lg"
                                            >
                                                <Link href="/login">
                                                    Continue to Login
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Progress Indicator */}
                            {step !== "success" && (
                                <div className="flex justify-center gap-2 mt-6">
                                    {["email", "otp", "reset"].map(
                                        (s, index) => (
                                            <div
                                                key={s}
                                                className={`h-2 rounded-full transition-all ${
                                                    step === s
                                                        ? "w-8 bg-corporate-blue"
                                                        : index <
                                                            [
                                                                "email",
                                                                "otp",
                                                                "reset",
                                                            ].indexOf(step)
                                                          ? "w-2 bg-corporate-blue"
                                                          : "w-2 bg-muted"
                                                }`}
                                            />
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
