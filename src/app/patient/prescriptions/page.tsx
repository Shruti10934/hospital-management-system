import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Pill, RefreshCcw, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PrescriptionsPage() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Prescriptions</h1>
        <p className="text-muted-foreground">View your active and past prescriptions, and request refills.</p>
      </div>

      <Alert className="bg-primary/5 border-primary/20 text-primary">
        <Info className="h-4 w-4 -mt-0.5" />
        <AlertTitle>Refill Policy</AlertTitle>
        <AlertDescription>
          Requests for refills usually take 1-2 business days to process. Please ensure you have enough medication until then.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-foreground/80 flex items-center gap-2">
            <Pill className="h-5 w-5 text-primary" /> Active Prescriptions
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <PrescriptionCard 
              name="Amoxicillin"
              dosage="500mg"
              frequency="Times a day, for 7 days"
              prescribedBy="Dr. Michael Jones"
              date="Oct 10, 2023"
              instructions="Take one capsule every 8 hours with food."
              status="Active"
              refillsLeft={0}
            />
            <PrescriptionCard 
              name="Lisinopril"
              dosage="10mg"
              frequency="Once daily"
              prescribedBy="Dr. Sarah Smith"
              date="Sep 15, 2023"
              instructions="Take in the morning. May cause dizziness."
              status="Refill Available"
              refillsLeft={2}
            />
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-4 text-foreground/80 flex items-center gap-2 opacity-70">
            <FileText className="h-5 w-5" /> Past Prescriptions
          </h2>
          <div className="grid gap-4 md:grid-cols-2 opacity-70">
            <PrescriptionCard 
              name="Ibuprofen"
              dosage="400mg"
              frequency="As needed for pain"
              prescribedBy="Dr. Emily Williams"
              date="Jan 12, 2023"
              instructions="Do not exceed 3 tablets in 24 hours."
              status="Expired"
              refillsLeft={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PrescriptionCard({
  name,
  dosage,
  frequency,
  prescribedBy,
  date,
  instructions,
  status,
  refillsLeft
}: {
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  date: string;
  instructions: string;
  status: string;
  refillsLeft: number;
}) {
  const isActive = status !== "Expired";
  const canRefill = refillsLeft > 0;

  return (
    <Card className={`relative overflow-hidden ${!isActive ? 'bg-muted/50' : ''}`}>
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${isActive ? "bg-primary" : "bg-muted-foreground/30"}`}></div>
      <CardContent className="p-5 pl-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg leading-tight">{name} <span className="text-muted-foreground font-medium text-sm ml-1">{dosage}</span></h3>
            <p className="text-sm text-primary font-medium mt-1">{frequency}</p>
          </div>
          <Badge variant={isActive ? (canRefill ? "default" : "secondary") : "outline"}>
            {status}
          </Badge>
        </div>

        <div className="bg-muted/40 rounded-md p-3 text-sm text-muted-foreground mb-4 border border-border/50">
          <span className="font-semibold text-foreground/70 block mb-1">Instructions:</span>
          {instructions}
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
          <div>Prescribed by <span className="font-medium text-foreground/80">{prescribedBy}</span></div>
          <div>Date: {date}</div>
        </div>

        {isActive && (
          <div className="flex items-center justify-between border-t border-border pt-4 mt-2">
            <div className="text-sm">
              <span className="font-medium">{refillsLeft}</span> refills remaining
            </div>
            <Button size="sm" variant={canRefill ? "default" : "outline"} disabled={!canRefill} className="gap-1.5 flex items-center">
              <RefreshCcw className="h-3.5 w-3.5" /> 
              {canRefill ? "Request Refill" : "No Refills left"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
