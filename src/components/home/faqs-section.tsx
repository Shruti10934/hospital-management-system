"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqs } from "@/lib/data/faqs";

export function FaqsSection() {
    const [openId, setOpenId] = useState<string | null>("1");

    const toggleFaq = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    const displayFaqs = faqs.slice(0, 6);

    return (
        <section id="faqs" className="py-16 lg:py-24 bg-gradient-to-bl from-pastel-lavender/30 via-background to-blue-100/40 dark:from-purple-950/20 dark:via-background dark:to-navy/40 scroll-mt-20">
            <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-corporate-blue font-medium text-sm uppercase tracking-wider">
                        Have Questions?
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Find answers to common questions about our services,
                        appointments, and facilities.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {displayFaqs.map((faq) => (
                        <div
                            key={faq.id}
                            className="bg-muted/30 rounded-2xl overflow-hidden"
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
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-12 text-center">
                    <p className="text-muted-foreground mb-2">
                        Can&apos;t find what you&apos;re looking for?
                    </p>
                    <a
                        href="/#contact"
                        className="text-corporate-blue font-medium hover:underline"
                    >
                        Contact our support team →
                    </a>
                </div>
            </div>
        </section>
    );
}
