import { cn } from "../../lib/utils";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    align?: "left" | "center";
    className?: string;
}

export function SectionHeading({ title, subtitle, align = "center", className }: SectionHeadingProps) {
    return (
        <div className={cn("mb-12 space-y-3", align === "center" ? "text-center" : "text-left", className)}>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {title}
            </h2>
            {subtitle && (
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
            <div className={cn(
                "h-1.5 w-20 bg-primary-600 rounded-full",
                align === "center" ? "mx-auto" : "mx-0"
            )} />
        </div>
    );
}
