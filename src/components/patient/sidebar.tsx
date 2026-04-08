 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    CalendarPlus,
    CalendarDays,
    Pill,
    Activity,
    User,
    HeartPulse,
    Store,
    Package,
} from "lucide-react";

export const patientLinks = [
    { name: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
    {
        name: "Book Appointment",
        href: "/patient/book-appointment",
        icon: CalendarPlus,
    },
    {
        name: "My Appointments",
        href: "/patient/appointments",
        icon: CalendarDays,
    },
    { name: "Prescriptions", href: "/patient/prescriptions", icon: Pill },
    { name: "Medical Records", href: "/patient/records", icon: Activity },
    { name: "Pharmacy", href: "/patient/pharmacy", icon: Store },
    { name: "My Orders", href: "/patient/orders", icon: Package },
    { name: "Profile", href: "/patient/profile", icon: User },
];

export function PatientSidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden border-r bg-muted/40 md:block max-h-screen h-screen sticky top-0">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-primary"
                >
                    <HeartPulse className="h-6 w-6" />
                    <span>HealthSync</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4 gap-1">
                    {patientLinks.map(link => {
                        const isActive =
                            pathname === link.href ||
                            pathname.startsWith(`${link.href}/`);
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                    isActive
                                        ? "bg-primary text-primary-foreground hover:text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted"
                                )}
                            >
                                <link.icon className="h-4 w-4" />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
