import { cn } from "@/lib/utils";

interface SectionHeadingProps {
    label?: string;
    title: string;
    description?: string;
    centered?: boolean;
    className?: string;
}

export function SectionHeading({
    label,
    title,
    description,
    centered = true,
    className,
}: SectionHeadingProps) {
    return (
        <div className={cn(centered && "text-center", "mb-12", className)}>
            {label && (
                <span className="text-corporate-blue font-medium text-sm uppercase tracking-wider">
                    {label}
                </span>
            )}
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-4">
                {title}
            </h2>
            {description && (
                <p
                    className={cn(
                        "text-muted-foreground",
                        centered && "max-w-2xl mx-auto"
                    )}
                >
                    {description}
                </p>
            )}
        </div>
    );
}
