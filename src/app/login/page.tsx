"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    User,
    Stethoscope,
    ShieldCheck,
    Mail,
    Phone,
    Lock,
    Eye,
    EyeOff,
    Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

type UserType = "admin" | "doctor" | "patient";
type LoginMethod = "email" | "phone";

export default function LoginPage() {
    const [userType, setUserType] = useState<UserType>("patient");
    const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        // Handle login logic here
        console.log("Login attempt:", { userType, loginMethod, ...formData });
    };

    const getUserIcon = (type: UserType) => {
        switch (type) {
            case "admin":
                return <ShieldCheck className="w-5 h-5" />;
            case "doctor":
                return <Stethoscope className="w-5 h-5" />;
            case "patient":
                return <User className="w-5 h-5" />;
        }
    };

    const getUserLabel = (type: UserType) => {
        switch (type) {
            case "admin":
                return "Admin";
            case "doctor":
                return "Doctor";
            case "patient":
                return "Patient";
        }
    };

    const getPlaceholder = () => {
        if (loginMethod === "email") {
            return "Enter your email address";
        }
        return "Enter your phone number";
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
                                Welcome Back
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
                                Sign In to Your Account
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                Access your healthcare dashboard, manage
                                appointments, and more.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Login Form Section */}
                <section className="py-12 lg:py-16 bg-gradient-to-br from-blue-50 via-background to-pastel-green/30 dark:from-navy/40 dark:via-background dark:to-emerald-950/20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="max-w-xl mx-auto">
                            <Card className="border-0 shadow-xl">
                                <CardContent className="p-6 sm:p-8">
                                    {/* User Type Tabs */}
                                    <Tabs
                                        value={userType}
                                        onValueChange={val => {
                                            setUserType(val as UserType);
                                            // Reset login method for admin (email only)
                                            if (val === "admin") {
                                                setLoginMethod("email");
                                            }
                                        }}
                                        className="w-full"
                                    >
                                        <TabsList className="grid w-full grid-cols-3 mb-6 h-14 p-1 bg-muted/50 rounded-xl">
                                            <TabsTrigger
                                                value="patient"
                                                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-corporate-blue data-[state=active]:text-white transition-all"
                                            >
                                                <User className="w-4 h-4" />
                                                <span className="hidden sm:inline">
                                                    Patient
                                                </span>
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="doctor"
                                                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-corporate-blue data-[state=active]:text-white transition-all"
                                            >
                                                <Stethoscope className="w-4 h-4" />
                                                <span className="hidden sm:inline">
                                                    Doctor
                                                </span>
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="admin"
                                                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-corporate-blue data-[state=active]:text-white transition-all"
                                            >
                                                <ShieldCheck className="w-4 h-4" />
                                                <span className="hidden sm:inline">
                                                    Admin
                                                </span>
                                            </TabsTrigger>
                                        </TabsList>

                                        {/* Patient Login Form */}
                                        <TabsContent
                                            value="patient"
                                            className="mt-0"
                                        >
                                            <LoginForm
                                                userType="patient"
                                                loginMethod={loginMethod}
                                                setLoginMethod={setLoginMethod}
                                                formData={formData}
                                                handleInputChange={
                                                    handleInputChange
                                                }
                                                showPassword={showPassword}
                                                setShowPassword={
                                                    setShowPassword
                                                }
                                                isLoading={isLoading}
                                                handleLogin={handleLogin}
                                                showLoginMethodToggle={true}
                                            />
                                        </TabsContent>

                                        {/* Doctor Login Form */}
                                        <TabsContent
                                            value="doctor"
                                            className="mt-0"
                                        >
                                            <LoginForm
                                                userType="doctor"
                                                loginMethod={loginMethod}
                                                setLoginMethod={setLoginMethod}
                                                formData={formData}
                                                handleInputChange={
                                                    handleInputChange
                                                }
                                                showPassword={showPassword}
                                                setShowPassword={
                                                    setShowPassword
                                                }
                                                isLoading={isLoading}
                                                handleLogin={handleLogin}
                                                showLoginMethodToggle={true}
                                            />
                                        </TabsContent>

                                        {/* Admin Login Form */}
                                        <TabsContent
                                            value="admin"
                                            className="mt-0"
                                        >
                                            <LoginForm
                                                userType="admin"
                                                loginMethod="email"
                                                setLoginMethod={setLoginMethod}
                                                formData={formData}
                                                handleInputChange={
                                                    handleInputChange
                                                }
                                                showPassword={showPassword}
                                                setShowPassword={
                                                    setShowPassword
                                                }
                                                isLoading={isLoading}
                                                handleLogin={handleLogin}
                                                showLoginMethodToggle={false}
                                            />
                                        </TabsContent>
                                    </Tabs>
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

// Reusable Login Form Component
interface LoginFormProps {
    userType: UserType;
    loginMethod: LoginMethod;
    setLoginMethod: (method: LoginMethod) => void;
    formData: {
        email: string;
        phone: string;
        password: string;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
    isLoading: boolean;
    handleLogin: (e: React.FormEvent) => void;
    showLoginMethodToggle: boolean;
}

function LoginForm({
    userType,
    loginMethod,
    setLoginMethod,
    formData,
    handleInputChange,
    showPassword,
    setShowPassword,
    isLoading,
    handleLogin,
    showLoginMethodToggle,
}: LoginFormProps) {
    const getUserIcon = (type: UserType) => {
        switch (type) {
            case "admin":
                return <ShieldCheck className="w-6 h-6" />;
            case "doctor":
                return <Stethoscope className="w-6 h-6" />;
            case "patient":
                return <User className="w-6 h-6" />;
        }
    };

    const getUserLabel = (type: UserType) => {
        switch (type) {
            case "admin":
                return "Admin";
            case "doctor":
                return "Doctor";
            case "patient":
                return "Patient";
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-6">
            {/* User Type Header */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-corporate-blue/5 border border-corporate-blue/20">
                <div className="w-12 h-12 rounded-full bg-corporate-blue text-white flex items-center justify-center">
                    {getUserIcon(userType)}
                </div>
                <div>
                    <p className="font-semibold text-foreground">
                        {getUserLabel(userType)} Login
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {userType === "admin"
                            ? "Access the admin dashboard"
                            : userType === "doctor"
                              ? "Access your doctor portal"
                              : "Access your patient dashboard"}
                    </p>
                </div>
            </div>

            {/* Login Method Toggle (for Doctor and Patient only) */}
            {showLoginMethodToggle && (
                <div className="flex gap-2 p-1 bg-muted/50 rounded-xl">
                    <button
                        type="button"
                        onClick={() => setLoginMethod("email")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                            loginMethod === "email"
                                ? "bg-white dark:bg-navy text-corporate-blue shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <Mail className="w-4 h-4" />
                        Email
                    </button>
                    <button
                        type="button"
                        onClick={() => setLoginMethod("phone")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                            loginMethod === "phone"
                                ? "bg-white dark:bg-navy text-corporate-blue shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <Phone className="w-4 h-4" />
                        Phone
                    </button>
                </div>
            )}

            {/* Email/Phone Field */}
            <div className="space-y-2">
                <Label htmlFor={loginMethod === "email" ? "email" : "phone"}>
                    {loginMethod === "email" ? "Email Address" : "Phone Number"}
                </Label>
                <div className="relative">
                    {loginMethod === "email" ? (
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    ) : (
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    )}
                    <Input
                        id={loginMethod === "email" ? "email" : "phone"}
                        name={loginMethod === "email" ? "email" : "phone"}
                        type={loginMethod === "email" ? "email" : "tel"}
                        placeholder={
                            loginMethod === "email"
                                ? "Enter your email address"
                                : "Enter your phone number"
                        }
                        value={
                            loginMethod === "email"
                                ? formData.email
                                : formData.phone
                        }
                        onChange={handleInputChange}
                        required
                        className="pl-10 h-12 rounded-xl"
                    />
                </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                        href="/forgot-password"
                        className="text-sm text-corporate-blue hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="pl-10 pr-10 h-12 rounded-xl"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
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
                        Signing in...
                    </>
                ) : (
                    "Sign In"
                )}
            </Button>

            {/* Register Link (not for Admin) */}
            {userType !== "admin" && (
                <p className="text-center text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-corporate-blue hover:underline font-medium"
                    >
                        Register now
                    </Link>
                </p>
            )}
        </form>
    );
}
