import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { news } from "@/lib/data/news";

const categoryColors = {
    announcement: "bg-corporate-blue text-white",
    news: "bg-emerald-500 text-white",
    event: "bg-purple-500 text-white",
    "health-tip": "bg-amber-500 text-white",
};

const categoryLabels = {
    announcement: "Announcement",
    news: "News",
    event: "Event",
    "health-tip": "Health Tip",
};

export function NewsAnnouncements() {
    const latestNews = news.slice(0, 3);

    return (
        <section id="news" className="py-16 lg:py-24 bg-gradient-to-tl from-pastel-peach/30 via-background to-blue-100/40 dark:from-amber-950/20 dark:via-background dark:to-navy/40 scroll-mt-20">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                    <div>
                        <span className="text-corporate-blue font-medium text-sm uppercase tracking-wider">
                            Stay Updated
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-2">
                            News & Announcements
                        </h2>
                        <p className="text-muted-foreground max-w-lg">
                            Latest updates, health tips, and events from MedCare
                            Hospital
                        </p>
                    </div>
                    <Button
                        asChild
                        variant="outline"
                        className="rounded-full px-6"
                    >
                        <Link href="/news">
                            View All News
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </div>

                {/* News Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {latestNews.map((item) => (
                        <Card
                            key={item.id}
                            className="border-0 shadow-md overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <span
                                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${categoryColors[item.category]}`}
                                >
                                    {categoryLabels[item.category]}
                                </span>
                            </div>

                            <CardContent className="p-5">
                                {/* Date */}
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(item.date).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-corporate-blue transition-colors">
                                    {item.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                    {item.excerpt}
                                </p>

                                <Button
                                    asChild
                                    variant="link"
                                    className="p-0 h-auto text-corporate-blue"
                                >
                                    <Link href={`/news/${item.id}`}>
                                        Read More →
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
