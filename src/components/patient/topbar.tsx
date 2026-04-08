"use client";

import Link from "next/link";
import { Bell, Menu, HeartPulse, LogOut, ShoppingCart } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { patientLinks } from "./sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/providers/cart-context";

export function PatientTopbar() {
    const pathname = usePathname();
    const { cartCount } = useCart();

    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10 backdrop-blur-md">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                    <SheetDescription className="sr-only">
                        Patient portal mobile navigation menu
                    </SheetDescription>
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-lg font-bold text-primary mb-4"
                        >
                            <HeartPulse className="h-6 w-6" />
                            <span>HealthSync</span>
                        </Link>
                        {patientLinks.map(link => {
                            const isActive =
                                pathname === link.href ||
                                pathname.startsWith(`${link.href}/`);
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                                        isActive && "bg-muted text-foreground"
                                    )}
                                >
                                    <link.icon className="h-5 w-5" />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                {/* Can add page specific title or global search here */}
            </div>
            <Link href="/patient/cart">
                <Button
                    variant="outline"
                    size="icon"
                    className="relative h-8 w-8 rounded-full"
                    id="topbar-cart-button"
                >
                    <ShoppingCart className="h-4 w-4" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground animate-in zoom-in-50 duration-200">
                            {cartCount > 99 ? "99+" : cartCount}
                        </span>
                    )}
                    <span className="sr-only">Shopping cart</span>
                </Button>
            </Link>
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
            >
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
            </Button>
            <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="@patient" />
                <AvatarFallback>PA</AvatarFallback>
            </Avatar>
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-red-500 transition-colors"
                onClick={async () => {
                    await fetch("/api/auth/logout", { method: "POST" });
                    window.location.href = "/login";
                }}
            >
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Logout</span>
            </Button>
        </header>
    );
}
