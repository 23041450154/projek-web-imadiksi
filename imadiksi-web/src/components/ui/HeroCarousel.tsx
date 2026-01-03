import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { HeroSlide } from "../../contexts/DataContext";

interface HeroCarouselProps {
    slides: HeroSlide[];
    autoPlayInterval?: number;
}

export function HeroCarousel({ slides, autoPlayInterval = 5000 }: HeroCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    }, [slides.length]);

    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(nextSlide, autoPlayInterval);
        return () => clearInterval(interval);
    }, [nextSlide, autoPlayInterval, slides.length]);

    if (slides.length === 0) {
        return null;
    }

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-900">
            <AnimatePresence mode="wait">
                <motion.img
                    key={slides[currentIndex]?.id || currentIndex}
                    src={slides[currentIndex]?.image_url}
                    alt={slides[currentIndex]?.title || "Hero Image"}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </AnimatePresence>

            {/* Dots Indicator - bottom center */}
            {slides.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? "bg-white w-6"
                                    : "bg-white/50 hover:bg-white/80 w-2"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
