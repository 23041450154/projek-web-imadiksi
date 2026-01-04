import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    FileText,
    Newspaper,
    Users,
    Image,
    CalendarDays,
    LogOut,
    Home,
    Sparkles,
    Crown,
    Menu,
    X
} from "lucide-react";
import logoImadiksi from "../assets/logo-imadiksi.jpg";

const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Hero Slides", path: "/admin/hero-slides", icon: Sparkles },
    { name: "Struktur Organisasi", path: "/admin/organization", icon: Crown },
    { name: "Program Kerja", path: "/admin/programs", icon: FileText },
    { name: "Berita & Pengumuman", path: "/admin/posts", icon: Newspaper },
    { name: "Divisi", path: "/admin/divisions", icon: Users },
    { name: "Galeri", path: "/admin/gallery", icon: Image },
    { name: "Event", path: "/admin/events", icon: CalendarDays },
];

export default function AdminLayout() {
    const { signOut, user } = useAuth();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
                flex flex-col transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={logoImadiksi} alt="IMADIKSI Logo" className="w-10 h-10 object-contain rounded-full" />
                        <div>
                            <h1 className="text-lg font-bold text-primary-600">IMADIKSI</h1>
                            <p className="text-xs text-gray-500">Admin Panel</p>
                        </div>
                    </div>
                    <button
                        onClick={closeSidebar}
                        className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (item.path !== "/admin" && location.pathname.startsWith(item.path));
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={closeSidebar}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors font-medium text-sm ${isActive
                                    ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                            >
                                <item.icon className="w-5 h-5 shrink-0" />
                                <span className="truncate">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                    >
                        <Home className="w-5 h-5" />
                        Lihat Website
                    </Link>
                    <button
                        onClick={() => signOut()}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-sm"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Panel Admin</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[150px] sm:max-w-none">{user?.email}</span>
                    </div>
                </header>

                <main className="flex-1 p-4 lg:p-6 overflow-y-auto overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
