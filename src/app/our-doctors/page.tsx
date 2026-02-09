"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/shared/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, Search } from "lucide-react";
import { doctors } from "@/lib/data/doctors";
import { departments } from "@/lib/data/departments";
import { cn } from "@/lib/utils";

const availabilityLabels = {
    available: { label: "Available", color: "bg-emerald-500" },
    busy: { label: "Busy", color: "bg-amber-500" },
    "on-leave": { label: "On Leave", color: "bg-red-500" },
};

export default function DoctorsPage() {
    const [selectedDepartment, setSelectedDepartment] = useState<string>("all");



    const filteredDoctors = doctors.filter((doctor) => {
        const matchesDepartment =
            selectedDepartment === "all" ||
            doctor.departmentSlug === selectedDepartment;

        return matchesDepartment;
    });

    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />

            <main className="flex-1">
                <PageHero
                    title="Find a Doctor"
                    subtitle="Search our directory of expert physicians and specialists to find the right doctor for your healthcare needs."
                    breadcrumbs={[{ label: "Find a Doctor", href: "/doctors" }]}
                    backgroundImage="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1920"
                />

                {/* Filters */}
                <section className="py-8 bg-muted/30 sticky top-[64px] lg:top-[80px] z-40 border-b border-border/50">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">


                            {/* Department Filter */}
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-muted-foreground" />
                                <select
                                    value={selectedDepartment}
                                    onChange={(e) => setSelectedDepartment(e.target.value)}
                                    className="px-4 py-3 rounded-full bg-background border border-border focus:border-corporate-blue focus:outline-none appearance-none cursor-pointer pr-10"
                                >
                                    <option value="all">All Departments</option>
                                    {departments.map((dept) => (
                                        <option key={dept.slug} value={dept.slug}>
                                            {dept.name}
                                        </option>
                                    ))}
                                </select>
                            </div>



                        </div>
                    </div>
                </section>

                {/* Doctors Grid */}
                <section className="py-12 lg:py-16">
                    <div className="container mx-auto px-4 lg:px-8">
                        {/* Results Count */}
                        <p className="text-muted-foreground mb-8">
                            Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 && "s"}
                        </p>

                        {filteredDoctors.length > 0 ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredDoctors.map((doctor) => (
                                    <Card
                                        key={doctor.id}
                                        className="border-0 shadow-lg overflow-hidden group"
                                    >
                                        {/* Image */}
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={doctor.image}
                                                alt={doctor.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            {/* Availability Badge */}
                                            <div className="absolute top-4 right-4">
                                                <span
                                                    className={cn(
                                                        "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-white",
                                                        availabilityLabels[doctor.availability].color
                                                    )}
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                                    {availabilityLabels[doctor.availability].label}
                                                </span>
                                            </div>
                                            {/* Overlay Button */}
                                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <Button
                                                    asChild
                                                    size="sm"
                                                    className="w-full bg-corporate-blue hover:bg-corporate-blue/90 text-white rounded-full"
                                                >
                                                    <Link href={`/our-doctors/${doctor.id}`}>
                                                        <Calendar className="w-4 h-4 mr-2" />
                                                        Book Appointment
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>

                                        <CardContent className="p-5">
                                            <h3 className="text-lg font-semibold text-foreground mb-1">
                                                {doctor.name}
                                            </h3>
                                            <p className="text-corporate-blue font-medium text-sm mb-1">
                                                {doctor.specialty}
                                            </p>
                                            <p className="text-xs text-muted-foreground mb-3">
                                                {doctor.department} • {doctor.experience}
                                            </p>
                                            <Button
                                                asChild
                                                variant="outline"
                                                size="sm"
                                                className="w-full rounded-full"
                                            >
                                                <Link href={`/our-doctors/${doctor.id}`}>
                                                    View Profile
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-muted-foreground mb-4">
                                    No doctors found matching your criteria.
                                </p>
                                <Button
                                    onClick={() => {
                                        setSelectedDepartment("all");


                                    }}
                                    variant="outline"
                                    className="rounded-full"
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
