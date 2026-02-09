"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
    title: string;
    subtitle?: string;
    breadcrumbs?: { label: string; href: string }[];
    backgroundImage?: string;
}

export function PageHero({
    title,
    subtitle,
    breadcrumbs,
    backgroundImage,
}: PageHeroProps) {
    return (
        <section className="relative min-h-[280px] lg:min-h-[350px] flex items-center overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: backgroundImage
                        ? `url('${backgroundImage}')`
                        : undefined,
                    backgroundColor: backgroundImage ? undefined : "var(--navy)",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/80 to-navy/70" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-corporate-blue/10 blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-pastel-blue/10 blur-3xl" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Breadcrumbs */}
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
                        <Link
                            href="/"
                            className="hover:text-white transition-colors"
                        >
                            Home
                        </Link>
                        {breadcrumbs.map((crumb, index) => (
                            <span key={index} className="flex items-center gap-2">
                                <ChevronRight className="w-4 h-4" />
                                {index === breadcrumbs.length - 1 ? (
                                    <span className="text-white">
                                        {crumb.label}
                                    </span>
                                ) : (
                                    <Link
                                        href={crumb.href}
                                        className="hover:text-white transition-colors"
                                    >
                                        {crumb.label}
                                    </Link>
                                )}
                            </span>
                        ))}
                    </nav>
                )}

                {/* Title */}
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">
                    {title}
                </h1>

                {/* Subtitle */}
                {subtitle && (
                    <p className="text-lg lg:text-xl text-white/80 max-w-2xl">
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    );
}
