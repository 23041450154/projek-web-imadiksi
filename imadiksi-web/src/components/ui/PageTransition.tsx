import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface PageTransitionProps {
    children: ReactNode;
    className?: string;
}

const pageVariants: Variants = {
    initial: {
        opacity: 0,
        scale: 0.98
    },
    enter: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
        opacity: 0,
        scale: 0.98,
        transition: {
            duration: 0.3,
            ease: "easeIn",
        },
    },
};

export const PageTransition = ({ children, className = "" }: PageTransitionProps) => {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className={className}
        >
            {children}
        </motion.div>
    );
};
