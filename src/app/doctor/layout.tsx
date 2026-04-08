import { ReactNode } from "react";
import { DoctorSidebar } from "@/components/doctor/doctor-sidebar";
import { DoctorNavbar } from "@/components/doctor/doctor-navbar";

interface Props {
    children: ReactNode;
}

export default function DoctorLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar */}
            <DoctorSidebar />

            {/* Main Content Area */}
            <div className="ml-64">
                {/* Top Navbar */}
                <DoctorNavbar />

                {/* Page Content */}
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
