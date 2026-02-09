export interface NewsItem {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
    category: "announcement" | "news" | "event" | "health-tip";
    author: string;
}

export const news: NewsItem[] = [
    {
        id: "1",
        title: "MedCare Hospital Ranks Among Top 10 Hospitals Nationwide",
        excerpt: "Our commitment to excellence has been recognized with a prestigious ranking in the national healthcare survey.",
        content: "We are proud to announce that MedCare Hospital has been ranked among the top 10 hospitals in the nation for patient care quality and satisfaction. This recognition is a testament to our dedicated staff and commitment to excellence.",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800",
        date: "2026-02-05",
        category: "news",
        author: "Dr. Robert Anderson",
    },
    {
        id: "2",
        title: "New Advanced Robotic Surgery System Now Available",
        excerpt: "We have installed the latest da Vinci surgical system for minimally invasive procedures.",
        content: "MedCare Hospital has invested in state-of-the-art robotic surgery technology, allowing our surgeons to perform complex procedures with greater precision and faster patient recovery times.",
        image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=800",
        date: "2026-02-03",
        category: "announcement",
        author: "Hospital Administration",
    },
    {
        id: "3",
        title: "Free Health Camp This Weekend: Cardiac Screening",
        excerpt: "Join us for a free cardiac health screening camp this Saturday and Sunday.",
        content: "As part of Heart Month, we are organizing a free cardiac screening camp. Get your blood pressure, cholesterol, and ECG checked by our expert cardiologists. Registration is now open.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800",
        date: "2026-02-01",
        category: "event",
        author: "Community Health Team",
    },
    {
        id: "4",
        title: "5 Tips for Maintaining Heart Health This Winter",
        excerpt: "Cold weather can affect your heart. Here are expert tips to stay healthy.",
        content: "Dr. Sarah Johnson shares essential tips for maintaining cardiovascular health during the cold winter months, including diet recommendations and exercise guidelines.",
        image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800",
        date: "2026-01-28",
        category: "health-tip",
        author: "Dr. Sarah Johnson",
    },
    {
        id: "5",
        title: "MedCare Launches Telemedicine Services",
        excerpt: "Consult with our specialists from the comfort of your home with our new telemedicine platform.",
        content: "We are excited to launch our telemedicine services, making healthcare more accessible. Book video consultations with our doctors through our new patient portal.",
        image: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?q=80&w=800",
        date: "2026-01-25",
        category: "announcement",
        author: "Digital Health Team",
    },
    {
        id: "6",
        title: "Annual Medical Conference: Innovations in Healthcare",
        excerpt: "Join us for our annual medical conference featuring leading healthcare experts.",
        content: "MedCare Hospital is hosting its annual medical conference on March 15-17. The event will feature renowned speakers discussing the latest innovations in medical technology and patient care.",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800",
        date: "2026-01-20",
        category: "event",
        author: "Events Committee",
    },
];

export function getNewsById(id: string): NewsItem | undefined {
    return news.find((n) => n.id === id);
}
