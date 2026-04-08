import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CalendarDays, FileText, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function PatientDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, John</h1>
        <p className="text-muted-foreground">Here is an overview of your health and upcoming appointments.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Next one in 3 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 needs refill soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Lab Results</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Blood test from Oct 12</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Good</div>
            <p className="text-xs text-muted-foreground">All vitals are normal</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Next Appointment</CardTitle>
            <CardDescription>You have an upcoming visit with Dr. Smith.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-lg">Cardiology Checkup</p>
                  <p className="text-sm text-muted-foreground">Dr. Sarah Smith</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">Confirmed</Badge>
                  <p className="text-sm font-medium mt-1 text-primary">Oct 18 • 10:00 AM</p>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-2">
                <Button variant="outline">Reschedule</Button>
                <Button>Join Telehealth</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to do.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button variant="outline" className="justify-start w-full h-11" asChild>
              <Link href="/patient/book-appointment">
                <CalendarDays className="mr-2 h-4 w-4" /> Book Appointment
              </Link>
            </Button>
            <Button variant="outline" className="justify-start w-full h-11" asChild>
              <Link href="/patient/prescriptions">
                <Pill className="mr-2 h-4 w-4" /> Request Prescription Refill
              </Link>
            </Button>
            <Button variant="outline" className="justify-start w-full h-11" asChild>
              <Link href="/patient/records">
                <FileText className="mr-2 h-4 w-4" /> View Medical Records
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

