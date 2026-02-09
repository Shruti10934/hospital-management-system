export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: "general" | "appointments" | "billing" | "services" | "emergency";
}

export const faqs: FAQ[] = [
    {
        id: "1",
        question: "What are the visiting hours at MedCare Hospital?",
        answer: "General visiting hours are from 10:00 AM to 12:00 PM and 4:00 PM to 7:00 PM daily. ICU visiting is limited to 15 minutes during specified slots. Please check with the nursing station for specific ward timings.",
        category: "general",
    },
    {
        id: "2",
        question: "How can I book an appointment with a doctor?",
        answer: "You can book appointments through our website, mobile app, or by calling our appointment helpline at +1 (555) 123-4567. Online booking is available 24/7, and you can also walk in to our reception desk during working hours.",
        category: "appointments",
    },
    {
        id: "3",
        question: "Do you accept insurance and cashless hospitalization?",
        answer: "Yes, we have tie-ups with all major insurance companies and TPAs. We offer cashless hospitalization for most insurance plans. Please contact our insurance desk to verify your coverage before admission.",
        category: "billing",
    },
    {
        id: "4",
        question: "What should I bring for my hospital admission?",
        answer: "Please bring your ID proof, insurance documents (if applicable), previous medical records, list of current medications, and comfortable clothing. We provide most amenities, but you may bring personal toiletries.",
        category: "general",
    },
    {
        id: "5",
        question: "Is emergency care available 24/7?",
        answer: "Yes, our Emergency Department operates 24 hours a day, 7 days a week, 365 days a year. Our trauma center is equipped to handle all medical emergencies with a team of experienced emergency physicians always on duty.",
        category: "emergency",
    },
    {
        id: "6",
        question: "How do I get my medical records or reports?",
        answer: "Medical records can be requested through our patient portal, by visiting the Medical Records department, or by email request. Lab reports are typically available within 24 hours and can be accessed online through your patient account.",
        category: "services",
    },
    {
        id: "7",
        question: "What payment options are available?",
        answer: "We accept cash, credit/debit cards, UPI, net banking, and EMI options for larger bills. We also offer payment plans for eligible patients. For insurance claims, our team will guide you through the process.",
        category: "billing",
    },
    {
        id: "8",
        question: "Can I cancel or reschedule my appointment?",
        answer: "Yes, appointments can be cancelled or rescheduled up to 2 hours before the scheduled time without any charges. You can manage your appointments through our website, app, or by calling our helpline.",
        category: "appointments",
    },
    {
        id: "9",
        question: "Is parking available at the hospital?",
        answer: "Yes, we have a multi-level parking facility with ample space. Valet parking is also available at the main entrance. Parking is free for the first 2 hours, with nominal charges thereafter.",
        category: "general",
    },
    {
        id: "10",
        question: "Do you offer home sample collection for lab tests?",
        answer: "Yes, we offer home sample collection services for most laboratory tests. You can book a home collection through our website or by calling our diagnostic center. The phlebotomist will visit at your preferred time slot.",
        category: "services",
    },
];
