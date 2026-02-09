import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/shared/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Phone } from "lucide-react";
import { healthPackages } from "@/lib/data/services";

export default function HealthPackagesPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />

            <main className="flex-1">
                <PageHero
                    title="Health Packages"
                    subtitle="Comprehensive health checkup packages designed for preventive care and early detection."
                    breadcrumbs={[
                        { label: "Services", href: "/services" },
                        { label: "Health Packages", href: "/services/health-packages" },
                    ]}
                    backgroundImage="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1920"
                />

                {/* Packages Grid */}
                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-foreground mb-4">
                                Choose Your Health Package
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Take charge of your health with our carefully curated health
                                checkup packages for all age groups.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {healthPackages.map((pkg) => (
                                <Card
                                    key={pkg.id}
                                    className={`border-0 shadow-lg overflow-hidden relative ${pkg.popular ? "ring-2 ring-corporate-blue" : ""
                                        }`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute top-4 right-4">
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-corporate-blue text-white text-xs font-medium">
                                                <Star className="w-3 h-3" />
                                                Popular
                                            </span>
                                        </div>
                                    )}
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold text-foreground mb-2">
                                            {pkg.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            {pkg.recommended}
                                        </p>

                                        {/* Price */}
                                        <div className="mb-6">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-bold text-corporate-blue">
                                                    ₹{pkg.price.toLocaleString()}
                                                </span>
                                                <span className="text-lg text-muted-foreground line-through">
                                                    ₹{pkg.originalPrice.toLocaleString()}
                                                </span>
                                            </div>
                                            <span className="text-sm text-emerald-600 font-medium">
                                                Save ₹{(pkg.originalPrice - pkg.price).toLocaleString()}
                                            </span>
                                        </div>

                                        {/* Tests */}
                                        <div className="space-y-2 mb-6">
                                            {pkg.tests.map((test) => (
                                                <div
                                                    key={test}
                                                    className="flex items-center gap-2 text-sm"
                                                >
                                                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                                    <span className="text-muted-foreground">
                                                        {test}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <Button
                                            asChild
                                            className={`w-full rounded-full ${pkg.popular
                                                    ? "bg-corporate-blue hover:bg-corporate-blue/90 text-white"
                                                    : ""
                                                }`}
                                            variant={pkg.popular ? "default" : "outline"}
                                        >
                                            <Link href="/#contact">Book Now</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-4 lg:px-8">
                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-8 lg:p-12">
                                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground mb-2">
                                            Need a Custom Package?
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Contact us to create a personalized health checkup
                                            package based on your specific needs.
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="bg-corporate-blue hover:bg-corporate-blue/90 text-white rounded-full px-8"
                                        >
                                            <a href="tel:+15551234567">
                                                <Phone className="w-4 h-4 mr-2" />
                                                Call Us
                                            </a>
                                        </Button>
                                        <Button
                                            asChild
                                            size="lg"
                                            variant="outline"
                                            className="rounded-full px-8"
                                        >
                                            <Link href="/#contact">Contact Online</Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
