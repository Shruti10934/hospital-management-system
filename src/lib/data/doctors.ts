export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    department: string;
    departmentSlug: string;
    experience: string;
    image: string;
    bio: string;
    qualifications: string[];
    expertise: string[];
    languages: string[];
    opdTimings: {
        days: string;
        time: string;
    }[];
    consultationFee: number;
    availability: "available" | "busy" | "on-leave";
}

export const doctors: Doctor[] = [
    {
        id: "1",
        name: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        department: "Cardiology",
        departmentSlug: "cardiology",
        experience: "15+ years",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400",
        bio: "Dr. Sarah Johnson is a renowned cardiologist with over 15 years of experience in treating complex cardiac conditions. She completed her fellowship at Johns Hopkins Hospital and has published numerous research papers on heart failure management.",
        qualifications: ["MBBS - Harvard Medical School", "MD - Cardiology, Stanford University", "Fellowship - Johns Hopkins Hospital"],
        expertise: ["Interventional Cardiology", "Heart Failure Management", "Cardiac Imaging", "Preventive Cardiology"],
        languages: ["English", "Spanish"],
        opdTimings: [
            { days: "Monday - Friday", time: "9:00 AM - 1:00 PM" },
            { days: "Saturday", time: "10:00 AM - 12:00 PM" },
        ],
        consultationFee: 1500,
        availability: "available",
    },
    {
        id: "2",
        name: "Dr. Michael Chen",
        specialty: "Neurologist",
        department: "Neurology",
        departmentSlug: "neurology",
        experience: "12+ years",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400",
        bio: "Dr. Michael Chen specializes in neurological disorders with a focus on stroke prevention and treatment. He is known for his innovative approaches to treating Parkinson's disease and epilepsy.",
        qualifications: ["MBBS - Yale University", "MD - Neurology, UCLA", "DM - Neurology, AIIMS"],
        expertise: ["Stroke Treatment", "Epilepsy Management", "Movement Disorders", "Headache Medicine"],
        languages: ["English", "Mandarin"],
        opdTimings: [
            { days: "Monday, Wednesday, Friday", time: "10:00 AM - 2:00 PM" },
            { days: "Tuesday, Thursday", time: "3:00 PM - 6:00 PM" },
        ],
        consultationFee: 1200,
        availability: "available",
    },
    {
        id: "3",
        name: "Dr. Priya Patel",
        specialty: "Pediatrician",
        department: "Pediatrics",
        departmentSlug: "pediatrics",
        experience: "10+ years",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400",
        bio: "Dr. Priya Patel is a compassionate pediatrician dedicated to providing excellent care for children from newborns to adolescents. She has a special interest in developmental pediatrics and childhood nutrition.",
        qualifications: ["MBBS - All India Institute of Medical Sciences", "MD - Pediatrics, PGIMER", "Fellowship - Developmental Pediatrics"],
        expertise: ["General Pediatrics", "Developmental Disorders", "Childhood Nutrition", "Adolescent Health"],
        languages: ["English", "Hindi", "Gujarati"],
        opdTimings: [
            { days: "Monday - Friday", time: "9:00 AM - 12:00 PM" },
            { days: "Monday - Friday", time: "4:00 PM - 7:00 PM" },
        ],
        consultationFee: 800,
        availability: "available",
    },
    {
        id: "4",
        name: "Dr. James Williams",
        specialty: "Orthopedic Surgeon",
        department: "Orthopedics",
        departmentSlug: "orthopedics",
        experience: "18+ years",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400",
        bio: "Dr. James Williams is a highly skilled orthopedic surgeon specializing in joint replacement and sports medicine. He has successfully performed over 5,000 surgeries and is a pioneer in minimally invasive techniques.",
        qualifications: ["MBBS - University of Pennsylvania", "MS - Orthopedics, Mayo Clinic", "Fellowship - Sports Medicine, UK"],
        expertise: ["Joint Replacement", "Sports Injuries", "Spine Surgery", "Trauma Surgery"],
        languages: ["English"],
        opdTimings: [
            { days: "Tuesday, Thursday", time: "10:00 AM - 1:00 PM" },
            { days: "Saturday", time: "9:00 AM - 12:00 PM" },
        ],
        consultationFee: 1800,
        availability: "busy",
    },
    {
        id: "5",
        name: "Dr. Maria Garcia",
        specialty: "General Physician",
        department: "General Medicine",
        departmentSlug: "general-medicine",
        experience: "8+ years",
        image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=400",
        bio: "Dr. Maria Garcia is a dedicated general physician providing comprehensive primary care. She focuses on preventive medicine and chronic disease management, ensuring patients receive holistic healthcare.",
        qualifications: ["MBBS - University of Barcelona", "MD - Internal Medicine", "Certificate - Family Medicine"],
        expertise: ["Primary Care", "Chronic Disease Management", "Preventive Medicine", "Women's Health"],
        languages: ["English", "Spanish", "Portuguese"],
        opdTimings: [
            { days: "Monday - Friday", time: "8:00 AM - 12:00 PM" },
            { days: "Monday - Friday", time: "2:00 PM - 5:00 PM" },
        ],
        consultationFee: 600,
        availability: "available",
    },
    {
        id: "6",
        name: "Dr. David Kim",
        specialty: "Ophthalmologist",
        department: "Ophthalmology",
        departmentSlug: "ophthalmology",
        experience: "14+ years",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400",
        bio: "Dr. David Kim is an expert ophthalmologist with extensive experience in LASIK and cataract surgeries. He has helped thousands of patients regain clear vision using the latest laser technology.",
        qualifications: ["MBBS - Seoul National University", "MS - Ophthalmology", "Fellowship - Cornea & Refractive Surgery, USA"],
        expertise: ["LASIK Surgery", "Cataract Surgery", "Corneal Disorders", "Pediatric Ophthalmology"],
        languages: ["English", "Korean"],
        opdTimings: [
            { days: "Monday, Wednesday, Friday", time: "9:00 AM - 1:00 PM" },
            { days: "Thursday", time: "2:00 PM - 6:00 PM" },
        ],
        consultationFee: 1000,
        availability: "on-leave",
    },
];

export function getDoctorById(id: string): Doctor | undefined {
    return doctors.find((d) => d.id === id);
}

export function getDoctorsByDepartment(departmentSlug: string): Doctor[] {
    return doctors.filter((d) => d.departmentSlug === departmentSlug);
}
