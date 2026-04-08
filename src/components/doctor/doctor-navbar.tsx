"use client";

import { Bell, Moon, Sun, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Dummy doctor data
const doctor = {
    name: "Dr. Sarah Wilson",
    specialty: "Cardiology",
    avatar: null,
};

export function DoctorNavbar() {
    const { theme, setTheme } = useTheme();

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
            {/* Search Bar */}
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search patients, appointments..."
                    className="pl-10 bg-muted/50"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-foreground/70"
                >
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emergency" />
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
                </Button>

                {/* Doctor Profile */}
                <div className="ml-2 flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-1.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-corporate-blue to-primary text-sm font-semibold text-white">
                        {doctor.name
                            .split(" ")
                            .slice(1)
                            .map((n) => n[0])
                            .join("")}
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-medium">{doctor.name}</p>
                        <p className="text-xs text-muted-foreground">
                            {doctor.specialty}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}
