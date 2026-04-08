"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function BookAppointmentPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Book an Appointment</h1>
        <p className="text-muted-foreground">Schedule a new visit or consultation with our doctors.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
          <CardDescription>Please provide the details below to find the best time for you.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-3">
              <Label htmlFor="department">Department</Label>
              <Select>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Practice</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="doctor">Doctor</Label>
              <Select>
                <SelectTrigger id="doctor">
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr-smith">Dr. Sarah Smith</SelectItem>
                  <SelectItem value="dr-jones">Dr. Michael Jones</SelectItem>
                  <SelectItem value="dr-williams">Dr. Emily Williams</SelectItem>
                  <SelectItem value="any">Any Available Doctor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-3">
              <Label>Select Date</Label>
              <div className="border rounded-md p-2 flex justify-center bg-background">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
            </div>
            <div className="grid gap-3">
              <Label>Select Time</Label>
              <div className="grid grid-cols-3 gap-2">
                {["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM", "03:00 PM"].map((time, i) => (
                  <Button key={i} variant={i === 2 ? "default" : "outline"} className="w-full text-xs sm:text-sm">
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="reason">Reason for Visit</Label>
            <Textarea 
              id="reason" 
              placeholder="Briefly describe your symptoms or reason for the appointment." 
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4 border-t px-6 py-4">
          <Button variant="outline">Cancel</Button>
          <Button>Book Appointment</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
