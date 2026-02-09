import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/shared/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    GraduationCap,
    Briefcase,
    Clock,
    IndianRupee,
    Languages,
    Award,
    Calendar,
    Building,
} from "lucide-react";
import { getDoctorById } from "@/lib/data/doctors";

interface DoctorPageProps {
    params: Promise<{ id: string }>;
}

export default async function DoctorPage({ params }: DoctorPageProps) {
    const { id } = await params;
    const doctor = getDoctorById(id);

    if (!doctor) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />

            <main className="flex-1">
                <PageHero
                    title={doctor.name}
                    subtitle={`${doctor.specialty} • ${doctor.department}`}
                    breadcrumbs={[
                        { label: "Find a Doctor", href: "/doctors" },
                        { label: doctor.name, href: `/doctors/${id}` },
                    ]}
                />

                {/* Doctor Profile */}
                <section className="py-12 lg:py-16">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Profile Card */}
                                <Card className="border-0 shadow-lg overflow-hidden">
                                    <div className="md:flex">
                                        <div className="md:w-64 h-72 md:h-auto flex-shrink-0">
                                            <img
                                                src={doctor.image}
                                                alt={doctor.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <CardContent className="p-6 flex-1">
                                            <h2 className="text-2xl font-bold text-foreground mb-1">
                                                {doctor.name}
                                            </h2>
                                            <p className="text-corporate-blue font-medium mb-4">
                                                {doctor.specialty}
                                            </p>

                                            <div className="flex flex-wrap gap-3 mb-6">
                                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm">
                                                    <Building className="w-4 h-4 text-corporate-blue" />
                                                    {doctor.department}
                                                </span>
                                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm">
                                                    <Briefcase className="w-4 h-4 text-corporate-blue" />
                                                    {doctor.experience}
                                                </span>
                                            </div>

                                            <h3 className="font-semibold text-foreground mb-3">
                                                About
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {doctor.bio}
                                            </p>
                                        </CardContent>
                                    </div>
                                </Card>

                                {/* Qualifications */}
                                <Card className="border-0 shadow-md">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl bg-corporate-blue/10 flex items-center justify-center">
                                                <GraduationCap className="w-5 h-5 text-corporate-blue" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-foreground">
                                                Qualifications
                                            </h3>
                                        </div>
                                        <ul className="space-y-3">
                                            {doctor.qualifications.map((qual, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-3"
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-corporate-blue mt-2" />
                                                    <span className="text-muted-foreground">
                                                        {qual}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                                {/* Expertise */}
                                <Card className="border-0 shadow-md">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                                <Award className="w-5 h-5 text-amber-600" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-foreground">
                                                Areas of Expertise
                                            </h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {doctor.expertise.map((exp, index) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 rounded-full bg-muted text-sm text-foreground"
                                                >
                                                    {exp}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>



                            </div>

                            {/* Sidebar - Booking Info */}
                            <div className="space-y-6">
                                {/* OPD Timings */}
                                <Card className="border-0 shadow-lg">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                                <Clock className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-foreground">
                                                OPD Timings
                                            </h3>
                                        </div>
                                        <div className="space-y-3">
                                            {doctor.opdTimings.map((timing, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between items-center py-2 border-b border-border last:border-0"
                                                >
                                                    <span className="text-muted-foreground text-sm">
                                                        {timing.days}
                                                    </span>
                                                    <span className="font-medium text-foreground text-sm">
                                                        {timing.time}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Consultation Fee */}
                                <Card className="border-0 shadow-lg bg-gradient-to-br from-corporate-blue to-blue-600 text-white">
                                    <CardContent className="p-6">
                                        <h3 className="text-lg font-semibold mb-2">
                                            Consultation Fee
                                        </h3>
                                        <div className="flex items-center gap-1 mb-4">
                                            <IndianRupee className="w-6 h-6" />
                                            <span className="text-3xl font-bold">
                                                {doctor.consultationFee}
                                            </span>
                                        </div>
                                        <p className="text-sm text-white/80 mb-6">
                                            Per visit • Payment at hospital
                                        </p>
                                        <Button
                                            asChild
                                            size="lg"
                                            className="w-full bg-white text-corporate-blue hover:bg-white/90 rounded-full"
                                        >
                                            <Link href="/appointments">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                Book Appointment
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Contact */}
                                <Card className="border-0 shadow-md bg-muted/30">
                                    <CardContent className="p-6">
                                        <h4 className="font-semibold text-foreground mb-3">
                                            Need Help?
                                        </h4>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Contact us for appointment assistance or queries.
                                        </p>
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="w-full rounded-full"
                                        >
                                            <Link href="/#contact">Contact Us</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
