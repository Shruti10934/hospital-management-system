import { ConsultationDetail } from "@/components/doctor/consultation-detail";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ConsultationDetailPage({ params }: PageProps) {
    const { id } = await params;

    return <ConsultationDetail consultationId={id} />;
}
