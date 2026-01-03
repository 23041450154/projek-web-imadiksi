import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "../components/ui/PageTransition";

export function Layout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow pt-0">
                <AnimatePresence mode="wait">
                    <PageTransition key={pathname}>
                        <Outlet />
                    </PageTransition>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
}
