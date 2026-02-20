"use client";

import Link from "next/link";
import { useState } from "react";
import {
    Search,
    Clock,
    Menu,
    X,
    ChevronDown,
    Moon,
    Sun,
    Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

const navItems = [
    {
        label: "Home",
        href: "/",
        children: [
            { label: "About Hospital", href: "/#about" },
            { label: "Vision & Mission", href: "/#vision-mission" },
            { label: "Accreditations", href: "/#accreditations" },
            { label: "Infrastructure", href: "/#infrastructure" },
        ],
    },
    {
        label: "Departments",
        href: "/departments",
        children: [
            { label: "Cardiology", href: "/departments/cardiology" },
            { label: "Orthopedics", href: "/departments/orthopedics" },
            { label: "Neurology", href: "/departments/neurology" },
            { label: "Pediatrics", href: "/departments/pediatrics" },
            { label: "Ophthalmology", href: "/departments/ophthalmology" },
            { label: "Pharmacy", href: "/departments/pharmacy" },
            { label: "Diagnostics", href: "/departments/diagnostics" },
            {
                label: "General Medicine",
                href: "/departments/general-medicine",
            },
        ],
    },
    {
        label: "Doctors",
        href: "/our-doctors",
    },
    {
        label: "Services",
        href: "/services",
        children: [
            { label: "Emergency Care", href: "/services/emergency" },
            { label: "Diagnostics & Labs", href: "/services/diagnostics" },
            { label: "Health Packages", href: "/services/health-packages" },
            { label: "Outpatient Care", href: "/services/outpatient" },
            { label: "Vaccination Services", href: "/services/vaccinations" },
            { label: "Laboratory Services", href: "/services/laboratory" },
            { label: "Physiotherapy", href: "/services/physiotherapy" },
            { label: "Insurance & TPA", href: "/services/insurance" },
        ],
    },
];

export function MainNav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-corporate-blue flex items-center justify-center">
                            <Stethoscope className="w-6 h-6 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="font-bold text-lg text-foreground">
                                MedCare
                            </span>
                            <span className="text-xs text-muted-foreground block -mt-1">
                                Hospital
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map(item =>
                            item.children ? (
                                item.label === "Home" ||
                                item.label === "Departments" ||
                                item.label === "Services" ? (
                                    // Special handling for Home, Departments & Services: Label links to href, only arrow opens dropdown
                                    <div
                                        key={item.label}
                                        className="flex items-center"
                                    >
                                        <Button
                                            variant="ghost"
                                            asChild
                                            className="text-foreground/80 hover:text-foreground hover:bg-accent pr-1"
                                        >
                                            <Link href={item.href}>
                                                {item.label}
                                            </Link>
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-6 text-foreground/80 hover:text-foreground hover:bg-accent"
                                                >
                                                    <ChevronDown className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="start"
                                                className="w-48"
                                            >
                                                {item.children.map(child => (
                                                    <DropdownMenuItem
                                                        key={child.label}
                                                        asChild
                                                    >
                                                        <Link href={child.href}>
                                                            {child.label}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                ) : (
                                    // Standard dropdown for other items
                                    <DropdownMenu key={item.label}>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="text-foreground/80 hover:text-foreground hover:bg-accent"
                                            >
                                                {item.label}
                                                <ChevronDown className="w-4 h-4 ml-1" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="start"
                                            className="w-48"
                                        >
                                            {item.children.map(child => (
                                                <DropdownMenuItem
                                                    key={child.label}
                                                    asChild
                                                >
                                                    <Link href={child.href}>
                                                        {child.label}
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )
                            ) : (
                                <Button
                                    key={item.label}
                                    variant="ghost"
                                    asChild
                                    className="text-foreground/80 hover:text-foreground hover:bg-accent"
                                >
                                    <Link href={item.href}>{item.label}</Link>
                                </Button>
                            )
                        )}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2">
                        {/* Search Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-foreground/70"
                        >
                            <Search className="w-5 h-5" />
                        </Button>

                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                            className="text-foreground/70"
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>

                        {/* Emergency Button */}
                        <Button
                            asChild
                            className="hidden sm:flex bg-emergency hover:bg-emergency/90 text-white rounded-full px-4"
                        >
                            <Link href="/emergency">
                                <Clock className="w-4 h-4 mr-2" />
                                Emergency
                            </Link>
                        </Button>

                        {/* Login Button */}
                        <Button
                            asChild
                            className="hidden sm:flex bg-corporate-blue hover:bg-corporate-blue/90 text-white rounded-full px-4"
                        >
                            <Link href="/login">Login</Link>
                        </Button>

                        {/* Register Button */}
                        <Button
                            asChild
                            variant="outline"
                            className="hidden sm:flex rounded-full px-4"
                        >
                            <Link href="/register">Register</Link>
                        </Button>

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-border">
                        <nav className="flex flex-col gap-2">
                            {navItems.map(item => (
                                <div key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="block px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-accent rounded-lg"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                    {item.children && (
                                        <div className="ml-4 mt-1 space-y-1">
                                            {item.children.map(child => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className="block px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg"
                                                    onClick={() =>
                                                        setMobileMenuOpen(false)
                                                    }
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Link
                                href="/login"
                                className="mx-4 flex items-center justify-center gap-2 px-4 py-2 bg-corporate-blue text-white rounded-full font-medium hover:bg-corporate-blue/90"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="mx-4 flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-full font-medium text-foreground hover:bg-accent"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Register
                            </Link>
                            <Link
                                href="/emergency"
                                className="mt-2 mx-4 flex items-center justify-center gap-2 px-4 py-2 bg-emergency text-white rounded-full font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Clock className="w-4 h-4" />
                                Emergency
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
