import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    className?: string;
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
}

export const ScrollReveal = ({
    children,
    width = "fit-content",
    delay = 0,
    className = "",
    direction = "up",
    duration = 0.5
}: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const getVariants = () => {
        const distance = 75;
        switch (direction) {
            case "up":
                return { hidden: { y: distance, opacity: 0 }, visible: { y: 0, opacity: 1 } };
            case "down":
                return { hidden: { y: -distance, opacity: 0 }, visible: { y: 0, opacity: 1 } };
            case "left":
                return { hidden: { x: distance, opacity: 0 }, visible: { x: 0, opacity: 1 } };
            case "right":
                return { hidden: { x: -distance, opacity: 0 }, visible: { x: 0, opacity: 1 } };
        }
    };

    return (
        <div ref={ref} style={{ width }} className={className}>
            <motion.div
                variants={getVariants()}
                initial="hidden"
                animate={mainControls}
                transition={{ duration, delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
};
