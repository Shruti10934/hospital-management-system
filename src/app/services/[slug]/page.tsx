import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/shared/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone } from "lucide-react";
import { getServiceBySlug } from "@/lib/data/services";

interface ServicePageProps {
    params: Promise<{ slug: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />

            <main className="flex-1">
                <PageHero
                    title={service.name}
                    subtitle={service.description}
                    breadcrumbs={[
                        { label: "Services", href: "/services" },
                        { label: service.name, href: `/services/${slug}` },
                    ]}
                    backgroundImage={service.image}
                />

                {/* Service Details */}
                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <h2 className="text-2xl font-bold text-foreground mb-6">
                                    About This Service
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-8">
                                    {service.longDescription}
                                </p>

                                {/* Features */}
                                <div className="bg-muted/30 rounded-3xl p-8">
                                    <h3 className="text-xl font-semibold text-foreground mb-6">
                                        What We Offer
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {service.features.map((feature) => (
                                            <div
                                                key={feature}
                                                className="flex items-center gap-3 bg-background rounded-xl p-4"
                                            >
                                                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                                <span className="text-foreground">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Service Info Card */}
                                <Card className="border-0 shadow-lg">
                                    <CardContent className="p-6">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-corporate-blue to-blue-600 flex items-center justify-center mb-4">
                                            <service.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-foreground mb-4">
                                            {service.name}
                                        </h3>
                                        <Button
                                            asChild
                                            className="w-full bg-corporate-blue hover:bg-corporate-blue/90 text-white rounded-full"
                                        >
                                            <Link href="/#contact">Enquire Now</Link>
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Contact Card */}
                                <Card className="border-0 shadow-md bg-muted/30">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-corporate-blue/10 flex items-center justify-center">
                                                <Phone className="w-5 h-5 text-corporate-blue" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    Need Help?
                                                </p>
                                                <p className="font-semibold text-foreground">
                                                    +1 (555) 123-4567
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Available Monday to Saturday, 8AM to 8PM
                                        </p>
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
