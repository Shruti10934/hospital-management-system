import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Eye, FileText, FlaskConical, Stethoscope } from "lucide-react";

export default function MedicalRecordsPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
          <p className="text-muted-foreground">Access your lab results, imaging reports, and visit summaries.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Download All
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-primary" />
                Lab Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Ordered By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Complete Blood Count (CBC)</TableCell>
                    <TableCell>Oct 12, 2023</TableCell>
                    <TableCell>Dr. Smith</TableCell>
                    <TableCell><Badge className="bg-green-500/15 text-green-700 hover:bg-green-500/25 border-green-500/20">Normal</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lipid Panel</TableCell>
                    <TableCell>Oct 12, 2023</TableCell>
                    <TableCell>Dr. Smith</TableCell>
                    <TableCell><Badge variant="secondary">Review</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-primary" />
                Visit Summaries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Visit Date</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Sep 15, 2023</TableCell>
                    <TableCell>Dermatology</TableCell>
                    <TableCell>Dr. Williams</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="gap-2"><FileText className="h-4 w-4" /> View Summary</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jun 02, 2023</TableCell>
                    <TableCell>General Practice</TableCell>
                    <TableCell>Dr. Jones</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="gap-2"><FileText className="h-4 w-4" /> View Summary</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Imaging Reports</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="h-10 w-10 bg-primary/10 text-primary rounded-md flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-sm font-medium truncate">Chest X-Ray</h4>
                  <p className="text-xs text-muted-foreground">Aug 22, 2023</p>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0"><Download className="h-4 w-4" /></Button>
              </div>
              <div className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="h-10 w-10 bg-primary/10 text-primary rounded-md flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-sm font-medium truncate">MRI Brain</h4>
                  <p className="text-xs text-muted-foreground">Feb 10, 2022</p>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0"><Download className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/30 border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center p-8 text-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Download className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Upload Outside Records</h3>
              <p className="text-sm text-muted-foreground">Have medical records from another facility? Upload them here.</p>
              <Button variant="outline" className="mt-2">Upload Files</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
