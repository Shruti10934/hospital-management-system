"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    User,
    Calendar,
    History,
    Stethoscope,
    LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
    {
        label: "Home",
        href: "/doctor",
        icon: Home,
    },
    {
        label: "Profile",
        href: "/doctor/profile",
        icon: User,
    },
    {
        label: "Schedule Manager",
        href: "/doctor/schedule",
        icon: Calendar,
    },
    {
        label: "Previous Consultations",
        href: "/doctor/consultations",
        icon: History,
    },
];

export function DoctorSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar transition-transform">
            <div className="flex h-full flex-col">
                {/* Logo Section */}
                <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-corporate-blue">
                        <Stethoscope className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <span className="font-bold text-sidebar-foreground">
                            MedCare
                        </span>
                        <span className="block text-xs text-muted-foreground -mt-0.5">
                            Doctor Portal
                        </span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        const Icon = link.icon;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="border-t border-sidebar-border p-3">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </aside>
    );
}
