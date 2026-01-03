import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/Button";
import { ThemeToggle } from "../components/ui/ThemeToggle";

import logoImadiksi from "../assets/logo-imadiksi.jpg";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileOpen(false); // Close mobile menu on route change
    }, [location]);

    const navLinks = [
        { name: "Beranda", href: "/" },
        { name: "Tentang", href: "/tentang" },
        { name: "Divisi", href: "/divisi" },
        { name: "Struktur", href: "/struktur" },
        { name: "Program", href: "/program" },
        { name: "Berita", href: "/publikasi" },
        { name: "Galeri", href: "/galeri" },
        { name: "Kontak", href: "/kontak" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300 border-b",
                isScrolled
                    ? "bg-white/80 backdrop-blur-md border-gray-200 dark:bg-gray-950/80 dark:border-gray-800 py-4 shadow-sm"
                    : "bg-transparent border-transparent py-6 dark:bg-transparent"
                // Conditional styling for when at top of page (hero)
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-primary-700 dark:text-primary-400">
                    <img src={logoImadiksi} alt="IMADIKSI Logo" className="w-12 h-12 object-contain rounded-full" />
                    <span>IMADIKSI</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400",
                                location.pathname === link.href
                                    ? "text-primary-600 dark:text-primary-400"
                                    : "text-gray-700 dark:text-gray-300"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-3">
                    <ThemeToggle />
                    <Link to="/admin/login">
                        <Button variant="ghost" size="sm">
                            Login Admin
                        </Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="flex md:hidden items-center gap-2">
                    <ThemeToggle />
                    <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 text-gray-700 dark:text-gray-200">
                        {isMobileOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {isMobileOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-lg flex flex-col p-4 gap-4 animate-in slide-in-from-top-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={cn(
                                "text-base font-medium p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800",
                                location.pathname === link.href ? "text-primary-600 bg-gray-50 dark:text-primary-400 dark:bg-gray-900" : "text-gray-700 dark:text-gray-300"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/admin/login">
                        <Button variant="ghost" className="w-full">
                            Login Admin
                        </Button>
                    </Link>
                </div>
            )}
        </nav>
    );
}
