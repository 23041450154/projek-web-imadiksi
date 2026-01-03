import { cn } from "../../lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "outline" | "secondary" | "accent";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const variants = {
        default: "bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300",
        secondary: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
        outline: "border border-gray-200 text-gray-800 dark:border-gray-700 dark:text-gray-300",
        accent: "bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-300",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                variants[variant],
                className
            )}
            {...props}
        />
    );
}
