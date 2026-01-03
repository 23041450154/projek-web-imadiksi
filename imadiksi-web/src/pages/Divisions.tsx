import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { useData } from "../contexts/DataContext";
import { Users, Briefcase, Loader2 } from "lucide-react";

export default function Divisions() {
    const { divisions, loading } = useData();

    if (loading) {
        return (
            <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                    <p className="text-gray-500">Memuat divisi...</p>
                </div>
            </div>
        );
    }

    if (divisions.length === 0) {
        return (
            <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <SectionHeading title="Divisi & Biro" subtitle="Unit-unit kerja yang menggerakkan roda organisasi." />
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-lg">Belum ada data divisi</p>
                        <p className="text-sm mt-2">Tambahkan divisi melalui panel admin</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <SectionHeading title="Divisi & Biro" subtitle="Unit-unit kerja yang menggerakkan roda organisasi." />

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {divisions.map((div) => (
                        <Card key={div.id} className="hover:border-primary-200 dark:hover:border-primary-800 transition-colors">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{div.name}</h3>
                                    {div.slug && <p className="text-sm text-gray-500 dark:text-gray-400">{div.slug.toUpperCase()}</p>}
                                </div>
                                <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-primary-600 dark:text-primary-400">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                {div.description || "Deskripsi belum tersedia."}
                            </p>

                            {div.work_programs && div.work_programs.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Program Kerja Utama:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {div.work_programs.map((prog: string) => (
                                            <Badge key={prog} variant="secondary">{prog}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {div.members && div.members.length > 0 && (
                                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 -mx-6 -mb-6 mt-auto border-t border-gray-100 dark:border-gray-800">
                                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Struktur Inti</h4>
                                    <div className="space-y-2">
                                        {div.members.map((member: { name: string; role: string }, idx: number) => (
                                            <div key={idx} className="flex items-center gap-3 text-sm">
                                                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                                    <Users className="w-3 h-3 text-gray-500" />
                                                </div>
                                                <span className="font-medium text-gray-900 dark:text-white">{member.name}</span>
                                                <span className="text-gray-400 text-xs">• {member.role}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
