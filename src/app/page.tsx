import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/home/hero-section";
import { QuickActionGrid } from "@/components/home/quick-action-grid";
import { DepartmentsGrid } from "@/components/home/departments-grid";
import { SpecialtyServices } from "@/components/home/specialty-services";
import { AppointmentBooking } from "@/components/home/appointment-booking";
import { DoctorCarousel } from "@/components/home/doctor-carousel";
import { AboutHospital } from "@/components/home/about-hospital";
import { VisionMission } from "@/components/home/vision-mission";
import { Accreditations } from "@/components/home/accreditations";
import { Infrastructure } from "@/components/home/infrastructure";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />

            <main className="flex-1">
                <HeroSection />
                <QuickActionGrid />
                <AboutHospital />
                <DepartmentsGrid />
                <VisionMission />
                <SpecialtyServices />
                <Accreditations />
                <AppointmentBooking />
                <DoctorCarousel />
                <Infrastructure />
            </main>

            <SiteFooter />
        </div>
    );
}
