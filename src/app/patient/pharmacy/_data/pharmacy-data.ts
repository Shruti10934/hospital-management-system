import {
    Pill,
    Shield,
    Package,
} from "lucide-react";
import type { PharmacyItemData } from "@/components/providers/cart-context";

// ── Mock pharmacy items ───────────────────────────────────────────────
export const MOCK_ITEMS: PharmacyItemData[] = [
    {
        id: "ph-001",
        name: "Paracetamol",
        strength: "500mg",
        description:
            "Paracetamol is a widely used over-the-counter analgesic (pain reliever) and antipyretic (fever reducer). It is commonly used to treat mild to moderate pain including headaches, muscle aches, toothaches, and cold/flu symptoms. Suitable for adults and children over 12 years.",
        manufacturer: "Sun Pharma",
        category: "medicine",
        imageUrl: null,
        price: "35.00",
        requiresPrescription: false,
        stock: 150,
        isActive: true,
    },
    {
        id: "ph-002",
        name: "Amoxicillin",
        strength: "250mg",
        description:
            "Amoxicillin is a penicillin-type antibiotic used to treat a wide variety of bacterial infections. It works by stopping the growth of bacteria. This antibiotic treats only bacterial infections and will not work for viral infections.",
        manufacturer: "Cipla Ltd",
        category: "medicine",
        imageUrl: null,
        price: "120.00",
        requiresPrescription: true,
        stock: 85,
        isActive: true,
    },
    {
        id: "ph-003",
        name: "Digital Thermometer",
        strength: null,
        description:
            "High-precision digital thermometer with LCD display. Provides accurate body temperature readings in 60 seconds. Features memory recall of last reading, auto shut-off, and fever alert beep. Water-resistant and easy to clean.",
        manufacturer: "Omron Healthcare",
        category: "equipment",
        imageUrl: null,
        price: "299.00",
        requiresPrescription: false,
        stock: 42,
        isActive: true,
    },
    {
        id: "ph-004",
        name: "Surgical Masks",
        strength: "Pack of 50",
        description:
            "3-ply disposable surgical face masks with elastic ear loops. Provides bacterial filtration efficiency (BFE) of ≥95%. Comfortable, breathable, and lightweight. Suitable for medical and general use.",
        manufacturer: "MedLine",
        category: "consumables",
        imageUrl: null,
        price: "199.00",
        requiresPrescription: false,
        stock: 320,
        isActive: true,
    },
    {
        id: "ph-005",
        name: "Metformin",
        strength: "500mg",
        description:
            "Metformin is an oral diabetes medicine that helps control blood sugar levels. It is used together with diet and exercise to improve blood sugar control in adults with type 2 diabetes mellitus. Available in tablet form.",
        manufacturer: "USV Pvt Ltd",
        category: "medicine",
        imageUrl: null,
        price: "65.00",
        requiresPrescription: true,
        stock: 200,
        isActive: true,
    },
    {
        id: "ph-006",
        name: "Blood Pressure Monitor",
        strength: null,
        description:
            "Automatic upper arm blood pressure monitor with large LCD display. Features irregular heartbeat detection, memory for 2 users with 60 readings each, and WHO blood pressure classification indicator. Includes storage case and batteries.",
        manufacturer: "Omron Healthcare",
        category: "equipment",
        imageUrl: null,
        price: "1899.00",
        requiresPrescription: false,
        stock: 18,
        isActive: true,
    },
    {
        id: "ph-007",
        name: "Cetirizine",
        strength: "10mg",
        description:
            "Cetirizine is an antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, itching eyes/nose, sneezing, hives, and itching. It works by blocking histamine that your body makes during an allergic reaction.",
        manufacturer: "Dr. Reddy's",
        category: "medicine",
        imageUrl: null,
        price: "42.00",
        requiresPrescription: false,
        stock: 175,
        isActive: true,
    },
    {
        id: "ph-008",
        name: "Cotton Bandage Roll",
        strength: "10cm x 4m",
        description:
            "Premium quality cotton bandage roll for wound dressing and support. Highly absorbent, soft, and breathable. Provides firm yet comfortable support. Ideal for first aid and medical applications.",
        manufacturer: "Becton Dickinson",
        category: "consumables",
        imageUrl: null,
        price: "45.00",
        requiresPrescription: false,
        stock: 250,
        isActive: true,
    },
    {
        id: "ph-009",
        name: "Atorvastatin",
        strength: "10mg",
        description:
            "Atorvastatin is used along with a proper diet to help lower 'bad' cholesterol and fats (such as LDL, triglycerides) and raise 'good' cholesterol (HDL) in the blood. It belongs to a group of drugs known as statins.",
        manufacturer: "Pfizer Inc",
        category: "medicine",
        imageUrl: null,
        price: "185.00",
        requiresPrescription: true,
        stock: 95,
        isActive: true,
    },
    {
        id: "ph-010",
        name: "Pulse Oximeter",
        strength: null,
        description:
            "Fingertip pulse oximeter for measuring blood oxygen saturation (SpO2) and pulse rate. Features bright OLED display with multi-directional viewing, one-button operation, and auto power off. Includes lanyard and carrying case.",
        manufacturer: "Omron Healthcare",
        category: "equipment",
        imageUrl: null,
        price: "1299.00",
        requiresPrescription: false,
        stock: 0,
        isActive: true,
    },
    {
        id: "ph-011",
        name: "Hand Sanitizer",
        strength: "500ml",
        description:
            "Alcohol-based hand sanitizer with 70% isopropyl alcohol. Kills 99.9% of germs without water. Enriched with aloe vera and vitamin E to keep hands soft and moisturized. Quick-drying formula.",
        manufacturer: "Himalaya Wellness",
        category: "consumables",
        imageUrl: null,
        price: "149.00",
        requiresPrescription: false,
        stock: 5,
        isActive: true,
    },
    {
        id: "ph-012",
        name: "Omeprazole",
        strength: "20mg",
        description:
            "Omeprazole is used to treat certain stomach and esophagus problems (such as acid reflux, ulcers). It works by decreasing the amount of acid your stomach makes. It belongs to a class of drugs known as proton pump inhibitors (PPIs).",
        manufacturer: "AstraZeneca",
        category: "medicine",
        imageUrl: null,
        price: "78.00",
        requiresPrescription: true,
        stock: 130,
        isActive: true,
    },
];

// ── Category config ───────────────────────────────────────────────────
export const CATEGORY_CONFIG = {
    medicine: {
        label: "Medicine",
        icon: Pill,
        color: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
        gradient: "from-blue-500/20 to-blue-600/5",
    },
    equipment: {
        label: "Equipment",
        icon: Shield,
        color: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
        gradient: "from-purple-500/20 to-purple-600/5",
    },
    consumables: {
        label: "Consumables",
        icon: Package,
        color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
        gradient: "from-emerald-500/20 to-emerald-600/5",
    },
};

export function getStockStatus(stock: number) {
    if (stock === 0) return { label: "Out of Stock", class: "text-red-600 dark:text-red-400", dot: "bg-red-500" };
    if (stock <= 10) return { label: "Low Stock", class: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" };
    return { label: "In Stock", class: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" };
}
