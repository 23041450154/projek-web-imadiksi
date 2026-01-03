import * as React from "react";
import { cn } from "../../lib/utils";


type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "sm" | "md" | "lg" | "icon";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", style, ...props }, ref) => {
        const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50";

        const variants = {
            primary: "bg-primary-500 hover:bg-primary-600 text-gray-900 shadow-sm",
            secondary: "bg-gray-800 hover:bg-gray-700 text-white shadow-sm dark:bg-gray-700 dark:hover:bg-gray-600",
            outline: "border border-primary-500 text-primary-700 bg-transparent hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950",
            ghost: "bg-transparent hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800",
            danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm",
        };

        const sizes = {
            sm: "h-8 px-3 text-sm",
            md: "h-10 px-4 py-2",
            lg: "h-12 px-6 text-lg",
            icon: "h-10 w-10 p-2",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    baseClasses,
                    variants[variant],
                    sizes[size],
                    className
                )}
                style={style}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
