import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageHero } from "@/components/shared/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { departments } from "@/lib/data/departments";

export default function DepartmentsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />

            <main className="flex-1">
                <PageHero
                    title="Our Departments"
                    subtitle="Explore our comprehensive range of medical specialties, each staffed with expert physicians and cutting-edge technology."
                    breadcrumbs={[{ label: "Departments", href: "/departments" }]}
                    backgroundImage="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1920"
                />

                {/* Departments Grid */}
                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {departments.map((dept) => (
                                <Card
                                    key={dept.id}
                                    className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={dept.image}
                                            alt={dept.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div
                                            className={`absolute bottom-3 left-3 w-12 h-12 rounded-xl bg-white/90 flex items-center justify-center ${dept.color}`}
                                        >
                                            <dept.icon className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <CardContent className="p-5">
                                        <h3 className="text-lg font-semibold text-foreground mb-2">
                                            {dept.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                            {dept.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-muted-foreground">
                                                {dept.services.length} Services
                                            </span>
                                            <Button
                                                asChild
                                                variant="link"
                                                className="p-0 h-auto text-corporate-blue"
                                            >
                                                <Link href={`/departments/${dept.slug}`}>
                                                    Learn More →
                                                </Link>
                                            </Button>
                                        </div>
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
