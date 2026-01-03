import { useData } from "../../contexts/DataContext";
import { Card } from "../../components/ui/Card";
import { FileText, Newspaper, Users, Image, CalendarDays } from "lucide-react";

export default function AdminDashboard() {
    const { programs, posts, divisions, gallery, events, loading, error } = useData();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-4 rounded-lg">
                Error: {error}
            </div>
        );
    }

    const stats = [
        { name: "Program Kerja", count: programs.length, icon: FileText, color: "bg-blue-500" },
        { name: "Berita & Artikel", count: posts.length, icon: Newspaper, color: "bg-green-500" },
        { name: "Divisi", count: divisions.length, icon: Users, color: "bg-purple-500" },
        { name: "Galeri", count: gallery.length, icon: Image, color: "bg-pink-500" },
        { name: "Event", count: events.length, icon: CalendarDays, color: "bg-orange-500" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-500 mt-1">Selamat datang di panel admin IMADIKSI</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.name} className="p-4">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.count}</p>
                                <p className="text-sm text-gray-500">{stat.name}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Panduan Cepat</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li>• Gunakan menu di sidebar untuk mengelola konten</li>
                    <li>• Klik tombol "Tambah" untuk membuat konten baru</li>
                    <li>• Klik ikon edit/hapus pada setiap item untuk memodifikasi</li>
                    <li>• Perubahan akan langsung terlihat di website frontend</li>
                </ul>
            </Card>
        </div>
    );
}
