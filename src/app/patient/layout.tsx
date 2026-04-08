import { PatientSidebar } from "@/components/patient/sidebar";
import { PatientTopbar } from "@/components/patient/topbar";
import { CartProvider } from "@/components/providers/cart-context";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <PatientSidebar />
        <div className="flex flex-col h-screen overflow-y-auto w-full">
          <PatientTopbar />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8 bg-muted/10">
            {children}
          </main>
        </div>
      </div>
    </CartProvider>
  );
}
