import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const contactInfo = [
    {
        icon: Phone,
        label: "Emergency",
        value: "+1 (555) 911-9111",
        subtext: "24/7 Available",
        color: "text-red-500",
        bg: "bg-red-50 dark:bg-red-950/30",
    },
    {
        icon: Phone,
        label: "Appointments",
        value: "+1 (555) 123-4567",
        subtext: "Mon-Sat: 8AM-8PM",
        color: "text-corporate-blue",
        bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
        icon: Mail,
        label: "Email",
        value: "info@medcare.hospital",
        subtext: "Response within 24hrs",
        color: "text-purple-500",
        bg: "bg-purple-50 dark:bg-purple-950/30",
    },
];

export function ContactSection() {
    return (
        <section id="contact" className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-background to-pastel-green/30 dark:from-navy/40 dark:via-background dark:to-emerald-950/20 scroll-mt-20">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <span className="text-corporate-blue font-medium text-sm uppercase tracking-wider">
                            Get in Touch
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-6">
                            Contact Us
                        </h2>
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            We&apos;re here to help you. Reach out to us for
                            appointments, inquiries, or any assistance you need
                            regarding your healthcare.
                        </p>

                        {/* Contact Cards */}
                        <div className="space-y-4 mb-8">
                            {contactInfo.map((info) => (
                                <div
                                    key={info.label}
                                    className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl"
                                >
                                    <div
                                        className={`w-12 h-12 rounded-xl ${info.bg} flex items-center justify-center`}
                                    >
                                        <info.icon
                                            className={`w-6 h-6 ${info.color}`}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            {info.label}
                                        </p>
                                        <p className="font-semibold text-foreground">
                                            {info.value}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {info.subtext}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Address */}
                        <Card className="border-0 shadow-md">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            Our Location
                                        </h3>
                                        <p className="text-muted-foreground">
                                            123 Healthcare Avenue,
                                            <br />
                                            Medical District,
                                            <br />
                                            City, State 12345
                                        </p>
                                        <Button
                                            asChild
                                            variant="link"
                                            className="p-0 h-auto mt-2 text-corporate-blue"
                                        >
                                            <Link
                                                href="https://maps.google.com"
                                                target="_blank"
                                            >
                                                Get Directions
                                                <ArrowRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Map / Hours */}
                    <div>
                        {/* Hours Card */}
                        <Card className="border-0 shadow-lg mb-6">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-corporate-blue/10 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-corporate-blue" />
                                    </div>
                                    <h3 className="font-semibold text-foreground">
                                        Working Hours
                                    </h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-border">
                                        <span className="text-muted-foreground">
                                            OPD (Mon-Sat)
                                        </span>
                                        <span className="font-medium text-foreground">
                                            8:00 AM - 8:00 PM
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-border">
                                        <span className="text-muted-foreground">
                                            OPD (Sunday)
                                        </span>
                                        <span className="font-medium text-foreground">
                                            10:00 AM - 2:00 PM
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-border">
                                        <span className="text-muted-foreground">
                                            Emergency
                                        </span>
                                        <span className="font-medium text-emerald-600">
                                            24/7 Available
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-muted-foreground">
                                            Pharmacy
                                        </span>
                                        <span className="font-medium text-foreground">
                                            Open 24 Hours
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Map Placeholder */}
                        <div className="relative rounded-3xl overflow-hidden h-[300px] bg-muted">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2!2d-73.98!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzAwLjAiTiA3M8KwNTgnNDguMCJX!5e0!3m2!1sen!2sus!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
