import { useState } from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { useData } from "../contexts/DataContext";
import { Calendar, Loader2 } from "lucide-react";

export default function Programs() {
    const { programs, loading } = useData();
    const [filter, setFilter] = useState("Semua");
    const [search, setSearch] = useState("");

    // Get unique tags from all programs
    const allTags = ["Semua", ...Array.from(new Set(programs.flatMap(p => p.tags || [])))];

    const filtered = programs.filter(prog => {
        const matchesTag = filter === "Semua" || (prog.tags || []).includes(filter);
        const matchesSearch = prog.title.toLowerCase().includes(search.toLowerCase());
        return matchesTag && matchesSearch;
    });

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'ongoing': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'upcoming': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'completed': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    const getStatusLabel = (status?: string) => {
        switch (status) {
            case 'ongoing': return 'Sedang Berjalan';
            case 'upcoming': return 'Akan Datang';
            case 'completed': return 'Selesai';
            default: return status || 'Unknown';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                    <p className="text-gray-500">Memuat program...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <SectionHeading title="Program Kerja" subtitle="Agenda kegiatan untuk meningkatkan kualitas anggota." />

                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 max-w-5xl mx-auto bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex gap-2 overflow-x-auto pb-1 w-full md:w-auto">
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setFilter(tag)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === tag
                                    ? "bg-primary-600 text-white"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                    <div className="w-full md:w-64">
                        <Input placeholder="Cari program..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                {/* Grid */}
                {programs.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-lg">Belum ada program kerja</p>
                        <p className="text-sm mt-2">Tambahkan program melalui panel admin</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((prog) => (
                            <Card key={prog.id} className="flex flex-col h-full hover:shadow-lg transition-all duration-300 group">
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(prog.status)}`}>
                                        {getStatusLabel(prog.status)}
                                    </span>
                                    {prog.date && (
                                        <span className="text-gray-400 text-sm flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> {prog.date}
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                                    {prog.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">
                                    {prog.summary}
                                </p>

                                {prog.tags && prog.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                                        {prog.tags.map((tag: string) => (
                                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        ))}
                        {filtered.length === 0 && programs.length > 0 && (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                Tidak ada program ditemukan.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
