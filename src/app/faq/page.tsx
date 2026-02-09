"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowLeft, Search, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { faqs } from "@/lib/data/faqs";

const categories = [
    { id: "all", label: "All Questions" },
    { id: "general", label: "General" },
    { id: "appointments", label: "Appointments" },
    { id: "billing", label: "Billing" },
    { id: "services", label: "Services" },
    { id: "emergency", label: "Emergency" },
];

export default function FaqPage() {
    const [openId, setOpenId] = useState<string | null>("1");
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const toggleFaq = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    const filteredFaqs = faqs.filter((faq) => {
        const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
        const matchesSearch =
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 lg:py-24 bg-gradient-to-bl from-pastel-lavender/30 via-background to-blue-100/40 dark:from-purple-950/20 dark:via-background dark:to-navy/40">
                    <div className="container mx-auto px-4 lg:px-8">
                        {/* Back Button */}
                        <Button asChild variant="ghost" className="mb-6">
                            <Link href="/">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Link>
                        </Button>

                        {/* Page Header */}
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="text-corporate-blue font-medium text-sm uppercase tracking-wider">
                                Have Questions?
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
                                Frequently Asked Questions
                            </h1>
                            <p className="text-lg text-muted-foreground mb-8">
                                Find answers to common questions about our services,
                                appointments, and facilities.
                            </p>

                            {/* Search Bar */}
                            <div className="relative max-w-xl mx-auto">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search questions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-corporate-blue shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories & FAQ Section */}
                <section className="py-16 lg:py-24 bg-gradient-to-bl from-pastel-lavender/30 via-background to-blue-100/40 dark:from-purple-950/20 dark:via-background dark:to-navy/40">
                    <div className="container mx-auto px-4 lg:px-8">
                        {/* Category Tabs */}
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={cn(
                                        "px-5 py-2.5 rounded-full text-sm font-medium transition-all",
                                        activeCategory === category.id
                                            ? "bg-corporate-blue text-white shadow-lg"
                                            : "bg-muted/50 text-muted-foreground hover:bg-muted"
                                    )}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>

                        {/* FAQ Accordion */}
                        <div className="max-w-3xl mx-auto space-y-4">
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.map((faq) => (
                                    <div
                                        key={faq.id}
                                        className="bg-muted/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <button
                                            onClick={() => toggleFaq(faq.id)}
                                            className="w-full flex items-center justify-between gap-4 p-5 text-left"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-corporate-blue/10 flex items-center justify-center flex-shrink-0">
                                                    <HelpCircle className="w-5 h-5 text-corporate-blue" />
                                                </div>
                                                <span className="font-medium text-foreground pt-2">
                                                    {faq.question}
                                                </span>
                                            </div>
                                            <ChevronDown
                                                className={cn(
                                                    "w-5 h-5 text-muted-foreground transition-transform flex-shrink-0",
                                                    openId === faq.id && "rotate-180"
                                                )}
                                            />
                                        </button>
                                        <div
                                            className={cn(
                                                "overflow-hidden transition-all duration-300",
                                                openId === faq.id
                                                    ? "max-h-96 opacity-100"
                                                    : "max-h-0 opacity-0"
                                            )}
                                        >
                                            <div className="px-5 pb-5 pl-[76px]">
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">
                                        No questions found matching your search.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Contact CTA */}
                        <Card className="max-w-3xl mx-auto mt-12 border-0 shadow-lg bg-gradient-to-r from-corporate-blue/10 to-purple-500/10">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 rounded-full bg-corporate-blue/10 flex items-center justify-center mx-auto mb-4">
                                    <MessageCircle className="w-8 h-8 text-corporate-blue" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">
                                    Still have questions?
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    Can&apos;t find what you&apos;re looking for? Our support team is here to help.
                                </p>
                                <Button asChild className="rounded-full px-8 bg-corporate-blue hover:bg-corporate-blue/90">
                                    <Link href="/contact">
                                        Contact Support
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
