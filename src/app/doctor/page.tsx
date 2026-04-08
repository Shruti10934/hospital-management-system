import { DoctorGreeting } from "@/components/doctor/doctor-greeting";
import { TodaysAppointments } from "@/components/doctor/todays-appointments";
import { DoctorNotes } from "@/components/doctor/doctor-notes";

export default function DoctorDashboard() {
    return (
        <div className="space-y-6">
            {/* Greeting Section */}
            <DoctorGreeting />

            {/* Bottom Grid: Appointments (left, bigger) and Notes (right) */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Today's Appointments - takes 2 columns */}
                <div className="lg:col-span-2">
                    <TodaysAppointments />
                </div>

                {/* Notes Section - takes 1 column */}
                <DoctorNotes />
            </div>
        </div>
    );
}
