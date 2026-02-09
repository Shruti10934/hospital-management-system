import {
    Heart,
    Bone,
    Brain,
    Baby,
    Eye,
    Pill,
    Activity,
    Stethoscope,
} from "lucide-react";

export interface Department {
    id: string;
    name: string;
    slug: string;
    description: string;
    longDescription: string;
    icon: typeof Heart;
    image: string;
    color: string;
    services: string[];
    doctors: string[];
}

export const departments: Department[] = [
    {
        id: "1",
        name: "Cardiology",
        slug: "cardiology",
        description: "Comprehensive heart care with advanced diagnostic and treatment options",
        longDescription: "Our Cardiology department is equipped with state-of-the-art technology for diagnosing and treating all types of heart conditions. From preventive care to complex cardiac surgeries, our team of expert cardiologists provides comprehensive cardiovascular care.",
        icon: Heart,
        image: "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?q=80&w=800",
        color: "text-red-500",
        services: ["ECG & Echocardiography", "Angiography", "Cardiac Catheterization", "Pacemaker Implantation", "Heart Failure Management"],
        doctors: ["1", "5"],
    },
    {
        id: "2",
        name: "Orthopedics",
        slug: "orthopedics",
        description: "Expert care for bones, joints, and musculoskeletal conditions",
        longDescription: "Our Orthopedic department specializes in the diagnosis and treatment of musculoskeletal conditions. We offer advanced surgical and non-surgical treatments for bone, joint, ligament, and muscle problems.",
        icon: Bone,
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800",
        color: "text-amber-500",
        services: ["Joint Replacement Surgery", "Sports Medicine", "Spine Surgery", "Fracture Treatment", "Arthroscopy"],
        doctors: ["4"],
    },
    {
        id: "3",
        name: "Neurology",
        slug: "neurology",
        description: "Specialized treatment for brain and nervous system disorders",
        longDescription: "Our Neurology department provides expert care for disorders of the brain, spinal cord, nerves, and muscles. We use advanced diagnostic tools and treatments to manage conditions ranging from headaches to complex neurological disorders.",
        icon: Brain,
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800",
        color: "text-purple-500",
        services: ["EEG & EMG", "Stroke Treatment", "Epilepsy Management", "Parkinson's Disease Care", "Headache Clinic"],
        doctors: ["2"],
    },
    {
        id: "4",
        name: "Pediatrics",
        slug: "pediatrics",
        description: "Gentle, comprehensive healthcare for infants, children, and teens",
        longDescription: "Our Pediatrics department is dedicated to the health and well-being of children from birth through adolescence. We provide preventive care, immunizations, and treatment for childhood illnesses in a child-friendly environment.",
        icon: Baby,
        image: "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?q=80&w=800",
        color: "text-pink-500",
        services: ["Well-Child Visits", "Vaccinations", "Developmental Screening", "Pediatric Emergency Care", "Newborn Care"],
        doctors: ["3"],
    },
    {
        id: "5",
        name: "Ophthalmology",
        slug: "ophthalmology",
        description: "Complete eye care from routine exams to complex surgeries",
        longDescription: "Our Ophthalmology department offers comprehensive eye care services including routine eye exams, vision correction, and advanced surgical procedures. We use the latest technology to diagnose and treat all eye conditions.",
        icon: Eye,
        image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?q=80&w=800",
        color: "text-cyan-500",
        services: ["LASIK Surgery", "Cataract Surgery", "Glaucoma Treatment", "Retina Care", "Pediatric Ophthalmology"],
        doctors: ["6"],
    },
    {
        id: "6",
        name: "Pharmacy",
        slug: "pharmacy",
        description: "On-site pharmacy with expert medication management services",
        longDescription: "Our in-house pharmacy provides convenient access to medications and expert pharmaceutical care. Our pharmacists work closely with your healthcare team to ensure safe and effective medication management.",
        icon: Pill,
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800",
        color: "text-green-500",
        services: ["Prescription Filling", "Medication Counseling", "Drug Interaction Checks", "Compounding Services", "Home Delivery"],
        doctors: [],
    },
    {
        id: "7",
        name: "Diagnostics",
        slug: "diagnostics",
        description: "State-of-the-art imaging and laboratory services",
        longDescription: "Our Diagnostics department houses advanced imaging equipment and a fully equipped laboratory. We provide accurate and timely diagnostic services to support your healthcare providers in making informed treatment decisions.",
        icon: Activity,
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800",
        color: "text-blue-500",
        services: ["MRI & CT Scans", "X-Ray & Ultrasound", "Blood Tests", "Pathology Services", "Cardiac Imaging"],
        doctors: [],
    },
    {
        id: "8",
        name: "General Medicine",
        slug: "general-medicine",
        description: "Primary care and preventive health services for all ages",
        longDescription: "Our General Medicine department serves as the first point of contact for all your healthcare needs. Our experienced physicians provide comprehensive primary care, preventive services, and coordinate specialized care when needed.",
        icon: Stethoscope,
        image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?q=80&w=800",
        color: "text-indigo-500",
        services: ["Annual Health Checkups", "Chronic Disease Management", "Preventive Care", "Vaccinations", "Health Counseling"],
        doctors: ["5"],
    },
];

export function getDepartmentBySlug(slug: string): Department | undefined {
    return departments.find((d) => d.slug === slug);
}
