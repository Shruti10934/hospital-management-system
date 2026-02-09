import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowLeft, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

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

const departments = [
    { name: "General Inquiries", phone: "+1 (555) 123-4567" },
    { name: "Emergency", phone: "+1 (555) 911-9111" },
    { name: "Radiology", phone: "+1 (555) 123-4570" },
    { name: "Laboratory", phone: "+1 (555) 123-4571" },
    { name: "Pharmacy", phone: "+1 (555) 123-4572" },
    { name: "Billing", phone: "+1 (555) 123-4573" },
];

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-background to-pastel-green/30 dark:from-navy/40 dark:via-background dark:to-emerald-950/20">
                    <div className="container mx-auto px-4 lg:px-8">
                        {/* Back Button */}
                        <Button asChild variant="ghost" className="mb-6">
                            <Link href="/">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Link>
                        </Button>

                        {/* Page Header */}
                        <div className="max-w-3xl">
                            <span className="text-corporate-blue font-medium text-sm uppercase tracking-wider">
                                Get in Touch
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
                                Contact Us
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                We&apos;re here to help you. Reach out to us for appointments,
                                inquiries, or any assistance you need regarding your healthcare.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Cards Section */}
                <section className="py-16 bg-gradient-to-br from-blue-50 via-background to-pastel-green/30 dark:from-navy/40 dark:via-background dark:to-emerald-950/20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            {contactInfo.map((info) => (
                                <Card key={info.label} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`w-14 h-14 rounded-xl ${info.bg} flex items-center justify-center`}
                                            >
                                                <info.icon
                                                    className={`w-7 h-7 ${info.color}`}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    {info.label}
                                                </p>
                                                <p className="font-semibold text-lg text-foreground">
                                                    {info.value}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {info.subtext}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-background to-pastel-green/30 dark:from-navy/40 dark:via-background dark:to-emerald-950/20">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Left Column - Address & Hours */}
                            <div className="space-y-8">
                                {/* Address */}
                                <Card className="border-0 shadow-lg">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-6 h-6 text-emerald-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground text-lg mb-2">
                                                    Our Location
                                                </h3>
                                                <p className="text-muted-foreground mb-4">
                                                    123 Healthcare Avenue,
                                                    <br />
                                                    Medical District,
                                                    <br />
                                                    City, State 12345
                                                </p>
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    className="rounded-full"
                                                >
                                                    <Link
                                                        href="https://maps.google.com"
                                                        target="_blank"
                                                    >
                                                        Get Directions
                                                        <ArrowRight className="w-4 h-4 ml-2" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Hours Card */}
                                <Card className="border-0 shadow-lg">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 rounded-xl bg-corporate-blue/10 flex items-center justify-center">
                                                <Clock className="w-6 h-6 text-corporate-blue" />
                                            </div>
                                            <h3 className="font-semibold text-foreground text-lg">
                                                Working Hours
                                            </h3>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center py-3 border-b border-border">
                                                <span className="text-muted-foreground">
                                                    OPD (Mon-Sat)
                                                </span>
                                                <span className="font-medium text-foreground">
                                                    8:00 AM - 8:00 PM
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center py-3 border-b border-border">
                                                <span className="text-muted-foreground">
                                                    OPD (Sunday)
                                                </span>
                                                <span className="font-medium text-foreground">
                                                    10:00 AM - 2:00 PM
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center py-3 border-b border-border">
                                                <span className="text-muted-foreground">
                                                    Emergency
                                                </span>
                                                <span className="font-medium text-emerald-600">
                                                    24/7 Available
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center py-3">
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

                                {/* Department Directory */}
                                <Card className="border-0 shadow-lg">
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold text-foreground text-lg mb-6">
                                            Department Directory
                                        </h3>
                                        <div className="space-y-3">
                                            {departments.map((dept) => (
                                                <div key={dept.name} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                                                    <span className="text-muted-foreground">{dept.name}</span>
                                                    <span className="font-medium text-foreground">{dept.phone}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Map & Contact Form */}
                            <div className="space-y-8">
                                {/* Map */}
                                <div className="relative rounded-3xl overflow-hidden h-[350px] bg-muted shadow-lg">
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

                                {/* Contact Form */}
                                <Card className="border-0 shadow-lg">
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold text-foreground text-lg mb-6">
                                            Send us a Message
                                        </h3>
                                        <form className="space-y-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-foreground mb-2">
                                                        Full Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-corporate-blue"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-foreground mb-2">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-corporate-blue"
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-foreground mb-2">
                                                    Subject
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-corporate-blue"
                                                    placeholder="How can we help?"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-foreground mb-2">
                                                    Message
                                                </label>
                                                <textarea
                                                    rows={4}
                                                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-corporate-blue resize-none"
                                                    placeholder="Your message..."
                                                />
                                            </div>
                                            <Button className="w-full rounded-xl py-6 bg-corporate-blue hover:bg-corporate-blue/90">
                                                Send Message
                                                <Send className="w-4 h-4 ml-2" />
                                            </Button>
                                        </form>
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
