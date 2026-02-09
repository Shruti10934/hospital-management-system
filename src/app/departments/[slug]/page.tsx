import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/shared/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Clock } from "lucide-react";
import { getDepartmentBySlug } from "@/lib/data/departments";
import { getDoctorsByDepartment } from "@/lib/data/doctors";

interface DepartmentPageProps {
    params: Promise<{ slug: string }>;
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
    const { slug } = await params;
    const department = getDepartmentBySlug(slug);

    if (!department) {
        notFound();
    }

    const doctors = getDoctorsByDepartment(slug);

    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />

            <main className="flex-1">
                <PageHero
                    title={department.name}
                    subtitle={department.description}
                    breadcrumbs={[
                        { label: "Departments", href: "/departments" },
                        { label: department.name, href: `/departments/${slug}` },
                    ]}
                    backgroundImage={department.image}
                />

                {/* Overview Section */}
                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <h2 className="text-2xl font-bold text-foreground mb-6">
                                    About {department.name}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-8">
                                    {department.longDescription}
                                </p>

                                {/* Services */}
                                <div className="bg-muted/30 rounded-3xl p-8 mb-8">
                                    <h3 className="text-xl font-semibold text-foreground mb-6">
                                        Services Offered
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {department.services.map((service) => (
                                            <div
                                                key={service}
                                                className="flex items-center gap-3 bg-background rounded-xl p-4"
                                            >
                                                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                                <span className="text-foreground">
                                                    {service}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Associated Doctors */}
                                {doctors.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground mb-6">
                                            Our {department.name} Specialists
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            {doctors.map((doctor) => (
                                                <Card
                                                    key={doctor.id}
                                                    className="border-0 shadow-md overflow-hidden group"
                                                >
                                                    <div className="flex">
                                                        <div className="w-24 h-24 flex-shrink-0">
                                                            <img
                                                                src={doctor.image}
                                                                alt={doctor.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <CardContent className="p-4 flex-1">
                                                            <h4 className="font-semibold text-foreground">
                                                                {doctor.name}
                                                            </h4>
                                                            <p className="text-sm text-corporate-blue mb-1">
                                                                {doctor.specialty}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground mb-2">
                                                                {doctor.experience} Experience
                                                            </p>
                                                            <Button
                                                                asChild
                                                                size="sm"
                                                                variant="outline"
                                                                className="rounded-full h-7 text-xs"
                                                            >
                                                                <Link href={`/doctors/${doctor.id}`}>
                                                                    View Profile
                                                                </Link>
                                                            </Button>
                                                        </CardContent>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Quick Info Card */}
                                <Card className="border-0 shadow-lg">
                                    <CardContent className="p-6">
                                        <div
                                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-corporate-blue to-blue-600 flex items-center justify-center mb-4`}
                                        >
                                            <department.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-foreground mb-4">
                                            {department.name} Department
                                        </h3>
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-3 text-sm">
                                                <Clock className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">
                                                    OPD: Mon-Sat, 8AM-8PM
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-muted-foreground">
                                                    {doctors.length} Specialists Available
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            asChild
                                            className="w-full bg-corporate-blue hover:bg-corporate-blue/90 text-white rounded-full"
                                        >
                                            <Link href="/doctors">Find a Doctor</Link>
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Contact Card */}
                                <Card className="border-0 shadow-md bg-muted/30">
                                    <CardContent className="p-6">
                                        <h4 className="font-semibold text-foreground mb-3">
                                            Need Assistance?
                                        </h4>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Contact our {department.name} department for any queries.
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
