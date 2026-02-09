import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/shared/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Home, Clock, FlaskConical } from "lucide-react";
import { diagnosticTests } from "@/lib/data/services";

export default function DiagnosticsPage() {
    const categories = [...new Set(diagnosticTests.map((t) => t.category))];

    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />

            <main className="flex-1">
                <PageHero
                    title="Diagnostics & Labs"
                    subtitle="State-of-the-art diagnostic imaging and laboratory services with accurate and timely results."
                    breadcrumbs={[
                        { label: "Services", href: "/services" },
                        { label: "Diagnostics & Labs", href: "/services/diagnostics" },
                    ]}
                    backgroundImage="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1920"
                />

                {/* Features */}
                <section className="py-12 bg-muted/30">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid sm:grid-cols-3 gap-6">
                            <div className="flex items-center gap-4 bg-background rounded-2xl p-6 shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-corporate-blue/10 flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-corporate-blue" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">
                                        Quick Results
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Same-day reports available
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-background rounded-2xl p-6 shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                    <Home className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">
                                        Home Collection
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Sample pickup from your doorstep
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-background rounded-2xl p-6 shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                    <FlaskConical className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">
                                        NABL Accredited
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Certified quality standards
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tests by Category */}
                <section className="py-16 lg:py-20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-foreground mb-4">
                                Available Tests
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Browse our comprehensive range of diagnostic tests
                            </p>
                        </div>

                        {categories.map((category) => (
                            <div key={category} className="mb-12">
                                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                                    <span className="w-8 h-1 bg-corporate-blue rounded" />
                                    {category}
                                </h3>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {diagnosticTests
                                        .filter((t) => t.category === category)
                                        .map((test) => (
                                            <Card
                                                key={test.id}
                                                className="border-0 shadow-sm hover:shadow-md transition-shadow"
                                            >
                                                <CardContent className="p-5">
                                                    <h4 className="font-medium text-foreground mb-2">
                                                        {test.name}
                                                    </h4>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-muted-foreground">
                                                            {test.turnaround}
                                                        </span>
                                                        <span className="font-semibold text-corporate-blue">
                                                            ₹{test.price}
                                                        </span>
                                                    </div>
                                                    {test.homeCollection && (
                                                        <span className="inline-flex items-center gap-1 mt-2 text-xs text-emerald-600">
                                                            <Home className="w-3 h-3" />
                                                            Home Collection
                                                        </span>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))}
                                </div>
                            </div>
                        ))}


                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
