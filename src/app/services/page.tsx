import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/shared/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data/services";

export default function ServicesPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />

            <main className="flex-1">
                <PageHero
                    title="Our Services"
                    subtitle="Comprehensive healthcare services designed to meet all your medical needs under one roof."
                    breadcrumbs={[{ label: "Services", href: "/services" }]}
                    backgroundImage="https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1920"
                />

                {/* Services Grid */}
                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {services.map((service) => (
                                <Card
                                    key={service.id}
                                    className="group border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* Image */}
                                    <div className="relative h-44 overflow-hidden rounded-t-xl">
                                        <img
                                            src={service.image}
                                            alt={service.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-3 left-3 w-12 h-12 rounded-xl bg-white/90 flex items-center justify-center">
                                            <service.icon className="w-6 h-6 text-corporate-blue" />
                                        </div>
                                    </div>

                                    <CardContent className="p-5">
                                        <h3 className="text-lg font-semibold text-foreground mb-2">
                                            {service.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                            {service.description}
                                        </p>
                                        <Button
                                            asChild
                                            variant="link"
                                            className="p-0 h-auto text-corporate-blue"
                                        >
                                            <Link href={`/services/${service.slug}`}>
                                                Learn More
                                                <ArrowRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>


            </main>

            <SiteFooter />
        </div>
    );
}
