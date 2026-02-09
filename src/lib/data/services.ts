import {
    Ambulance,
    Microscope,
    HeartPulse,
    Stethoscope,
    Syringe,
    TestTube,
    Activity,
    Shield,
} from "lucide-react";

export interface Service {
    id: string;
    name: string;
    slug: string;
    description: string;
    longDescription: string;
    icon: typeof Ambulance;
    image: string;
    features: string[];
}

export const services: Service[] = [
    {
        id: "1",
        name: "Emergency Care",
        slug: "emergency",
        description: "24/7 emergency medical services with rapid response team",
        longDescription: "Our Emergency Department operates 24 hours a day, 7 days a week, providing immediate care for all medical emergencies. Equipped with advanced life-saving equipment and staffed by experienced emergency physicians.",
        icon: Ambulance,
        image: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?q=80&w=800",
        features: ["24/7 Availability", "Rapid Response Team", "Advanced Trauma Care", "Ambulance Services", "Critical Care Unit"],
    },
    {
        id: "2",
        name: "Diagnostics & Labs",
        slug: "diagnostics",
        description: "Comprehensive diagnostic imaging and laboratory services",
        longDescription: "Our state-of-the-art diagnostic center offers a complete range of imaging and laboratory services. From routine blood tests to advanced MRI scans, we provide accurate and timely results.",
        icon: Microscope,
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800",
        features: ["MRI & CT Scans", "Digital X-Ray", "Ultrasound", "Complete Blood Work", "Biopsy Services"],
    },
    {
        id: "3",
        name: "Health Packages",
        slug: "health-packages",
        description: "Comprehensive health checkup packages for preventive care",
        longDescription: "Take charge of your health with our specially designed health checkup packages. From basic screenings to executive health checkups, we offer packages tailored to different age groups and health needs.",
        icon: HeartPulse,
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800",
        features: ["Basic Health Checkup", "Executive Health Package", "Cardiac Screening", "Women's Health Package", "Senior Citizen Package"],
    },
    {
        id: "4",
        name: "Outpatient Care",
        slug: "outpatient",
        description: "Convenient outpatient consultations with specialist doctors",
        longDescription: "Our OPD services offer easy access to specialist consultations without hospitalization. Book appointments with our expert doctors across all specialties for diagnosis and treatment.",
        icon: Stethoscope,
        image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=800",
        features: ["Online Booking", "Same-Day Appointments", "Multi-Specialty Clinics", "Follow-up Care", "E-Prescriptions"],
    },
    {
        id: "5",
        name: "Vaccination Services",
        slug: "vaccinations",
        description: "Complete vaccination services for all age groups",
        longDescription: "Protect yourself and your family with our comprehensive vaccination services. We offer all essential vaccines for children, adults, and travelers, following the latest immunization guidelines.",
        icon: Syringe,
        image: "https://images.unsplash.com/photo-1615631648086-325025c9e51e?q=80&w=800",
        features: ["Child Immunization", "Adult Vaccines", "Travel Vaccines", "Flu Shots", "COVID-19 Vaccines"],
    },
    {
        id: "6",
        name: "Laboratory Services",
        slug: "laboratory",
        description: "Accurate and reliable pathology and laboratory testing",
        longDescription: "Our NABL-accredited laboratory provides accurate diagnostic testing services. With automated analyzers and experienced pathologists, we ensure reliable results with quick turnaround times.",
        icon: TestTube,
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16f484?q=80&w=800",
        features: ["Blood Tests", "Urine Analysis", "Hormone Tests", "Genetic Testing", "Tumor Markers"],
    },
    {
        id: "7",
        name: "Physiotherapy",
        slug: "physiotherapy",
        description: "Rehabilitation and physical therapy services",
        longDescription: "Our physiotherapy department helps patients recover from injuries, surgeries, and chronic conditions. Our skilled therapists use modern techniques to restore mobility and function.",
        icon: Activity,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800",
        features: ["Sports Rehabilitation", "Post-Surgery Rehab", "Pain Management", "Neurological Rehab", "Geriatric Care"],
    },
    {
        id: "8",
        name: "Insurance & TPA",
        slug: "insurance",
        description: "Cashless treatment and insurance support services",
        longDescription: "We have tie-ups with all major insurance companies and TPAs for cashless hospitalization. Our dedicated insurance desk helps you with all paperwork and claim settlements.",
        icon: Shield,
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800",
        features: ["Cashless Treatment", "All Major TPAs", "Claim Assistance", "Pre-Authorization Support", "Document Processing"],
    },
];

export interface HealthPackage {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    tests: string[];
    recommended: string;
    popular?: boolean;
}

export const healthPackages: HealthPackage[] = [
    {
        id: "1",
        name: "Basic Health Checkup",
        price: 1499,
        originalPrice: 2499,
        tests: ["Complete Blood Count", "Blood Sugar", "Lipid Profile", "Liver Function", "Kidney Function", "Urine Analysis"],
        recommended: "For healthy adults aged 18-35",
    },
    {
        id: "2",
        name: "Comprehensive Health Package",
        price: 3999,
        originalPrice: 6999,
        tests: ["All Basic Tests", "Thyroid Profile", "Vitamin D & B12", "Chest X-Ray", "ECG", "Ultrasound Abdomen", "Doctor Consultation"],
        recommended: "For adults aged 35-50",
        popular: true,
    },
    {
        id: "3",
        name: "Executive Health Checkup",
        price: 7999,
        originalPrice: 12999,
        tests: ["All Comprehensive Tests", "Cardiac Stress Test", "2D Echo", "CT Calcium Score", "Pulmonary Function", "Cancer Markers", "Dietitian Consultation"],
        recommended: "For executives and senior professionals",
    },
    {
        id: "4",
        name: "Women's Wellness Package",
        price: 4999,
        originalPrice: 7999,
        tests: ["Complete Health Screening", "Pap Smear", "Mammography", "Bone Density Test", "Hormonal Panel", "Gynecologist Consultation"],
        recommended: "For women aged 30 and above",
    },
    {
        id: "5",
        name: "Senior Citizen Package",
        price: 5999,
        originalPrice: 9999,
        tests: ["Complete Health Screening", "Cardiac Evaluation", "Bone Health Assessment", "Eye Checkup", "Hearing Test", "Memory Assessment", "Geriatric Consultation"],
        recommended: "For adults aged 60 and above",
    },
    {
        id: "6",
        name: "Cardiac Risk Assessment",
        price: 4499,
        originalPrice: 7499,
        tests: ["Lipid Profile Advanced", "hs-CRP", "Homocysteine", "Lipoprotein(a)", "ECG", "2D Echo", "Stress Test", "Cardiologist Consultation"],
        recommended: "For those with heart disease risk factors",
    },
];

export interface DiagnosticTest {
    id: string;
    name: string;
    category: string;
    price: number;
    turnaround: string;
    homeCollection: boolean;
}

export const diagnosticTests: DiagnosticTest[] = [
    { id: "1", name: "Complete Blood Count (CBC)", category: "Blood Tests", price: 350, turnaround: "Same Day", homeCollection: true },
    { id: "2", name: "Lipid Profile", category: "Blood Tests", price: 550, turnaround: "Same Day", homeCollection: true },
    { id: "3", name: "Liver Function Test (LFT)", category: "Blood Tests", price: 650, turnaround: "Same Day", homeCollection: true },
    { id: "4", name: "Kidney Function Test (KFT)", category: "Blood Tests", price: 600, turnaround: "Same Day", homeCollection: true },
    { id: "5", name: "Thyroid Profile (T3, T4, TSH)", category: "Hormones", price: 750, turnaround: "Same Day", homeCollection: true },
    { id: "6", name: "HbA1c", category: "Diabetes", price: 450, turnaround: "Same Day", homeCollection: true },
    { id: "7", name: "Vitamin D", category: "Vitamins", price: 1200, turnaround: "Next Day", homeCollection: true },
    { id: "8", name: "Vitamin B12", category: "Vitamins", price: 850, turnaround: "Next Day", homeCollection: true },
    { id: "9", name: "X-Ray Chest", category: "Imaging", price: 400, turnaround: "2 Hours", homeCollection: false },
    { id: "10", name: "Ultrasound Abdomen", category: "Imaging", price: 1200, turnaround: "2 Hours", homeCollection: false },
    { id: "11", name: "CT Scan - Head", category: "Imaging", price: 4500, turnaround: "Same Day", homeCollection: false },
    { id: "12", name: "MRI Brain", category: "Imaging", price: 8000, turnaround: "Same Day", homeCollection: false },
    { id: "13", name: "ECG", category: "Cardiac", price: 300, turnaround: "Immediate", homeCollection: false },
    { id: "14", name: "2D Echocardiography", category: "Cardiac", price: 1800, turnaround: "Same Day", homeCollection: false },
    { id: "15", name: "Stress Test (TMT)", category: "Cardiac", price: 2500, turnaround: "Same Day", homeCollection: false },
];

export function getServiceBySlug(slug: string): Service | undefined {
    return services.find((s) => s.slug === slug);
}
