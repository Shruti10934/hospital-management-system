import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin, UserRound } from "lucide-react";
import Link from "next/link";

export default function AppointmentsPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
          <p className="text-muted-foreground">Manage your past and upcoming appointments.</p>
        </div>
        <Button asChild>
          <Link href="/patient/book-appointment">Book New Appointment</Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-6 flex flex-col gap-4">
          <AppointmentCard 
            doctor="Dr. Sarah Smith"
            department="Cardiology"
            date="Oct 18, 2023"
            time="10:00 AM"
            location="Main Hospital, Floor 3, Room 302"
            status="Confirmed"
            statusType="success"
            isUpcoming
          />
          <AppointmentCard 
            doctor="Dr. Michael Jones"
            department="General Practice"
            date="Nov 05, 2023"
            time="02:30 PM"
            location="Main Hospital, Floor 1, Room 105"
            status="Pending"
            statusType="warning"
            isUpcoming
          />
        </TabsContent>
        <TabsContent value="past" className="mt-6 flex flex-col gap-4">
          <AppointmentCard 
            doctor="Dr. Emily Williams"
            department="Dermatology"
            date="Sep 10, 2023"
            time="09:15 AM"
            location="Main Hospital, Floor 2, Room 210"
            status="Completed"
            statusType="default"
          />
        </TabsContent>
        <TabsContent value="cancelled" className="mt-6 flex flex-col gap-4">
          <AppointmentCard 
            doctor="Dr. Sarah Smith"
            department="Cardiology"
            date="Aug 22, 2023"
            time="11:00 AM"
            location="Main Hospital, Floor 3, Room 302"
            status="Cancelled"
            statusType="destructive"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AppointmentCard({ 
  doctor, 
  department, 
  date, 
  time, 
  location, 
  status, 
  statusType, 
  isUpcoming = false 
}: { 
  doctor: string; 
  department: string; 
  date: string; 
  time: string; 
  location: string; 
  status: string; 
  statusType: "default" | "success" | "warning" | "destructive"; 
  isUpcoming?: boolean;
}) {

  const badgeVariants = {
    default: "bg-secondary text-secondary-foreground",
    success: "bg-green-500/15 text-green-700 dark:text-green-400 hover:bg-green-500/25",
    warning: "bg-amber-500/15 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25",
    destructive: "bg-red-500/15 text-red-700 dark:text-red-400 hover:bg-red-500/25",
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{department} Consultation</h3>
                <div className="flex items-center text-muted-foreground mt-1 text-sm">
                  <UserRound className="mr-1.5 h-4 w-4" />
                  {doctor}
                </div>
              </div>
              <Badge className={badgeVariants[statusType]} variant="outline">{status}</Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground sm:col-span-3">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{location}</span>
              </div>
            </div>
          </div>
          
          {isUpcoming && (
            <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l pl-0 md:pl-6 mt-2 md:mt-0">
              <Button className="w-full">Reschedule</Button>
              <Button variant="outline" className="w-full text-destructive hover:text-destructive">Cancel</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
