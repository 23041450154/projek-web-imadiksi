import { useData } from "../contexts/DataContext";
import { Card } from "../components/ui/Card";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { Users, Crown, Loader2 } from "lucide-react";

export default function Organization() {
    const { organizationMembers, divisions, loading } = useData();

    // Filter core members (no division) and active
    const coreMembers = organizationMembers.filter(m => !m.division_id && m.is_active !== false);

    // Group members by division
    const getMembersByDivision = (divisionId: string) => {
        return organizationMembers.filter(m => m.division_id === divisionId && m.is_active !== false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <ScrollReveal direction="up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-900 mb-6">
                            <Crown className="w-4 h-4 text-primary-600" />
                            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Struktur Organisasi</span>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.1}>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-heading">
                            Kepengurusan IMADIKSI
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.2}>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                            Struktur kepengurusan inti dan divisi IMADIKSI UIN Raden Fatah Palembang
                        </p>
                    </ScrollReveal>
                </div>

                {/* Core Leadership Section */}
                {coreMembers.length > 0 && (
                    <section className="mb-20">
                        <ScrollReveal direction="up">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                                Pengurus Inti
                            </h2>
                        </ScrollReveal>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
                            {coreMembers.sort((a, b) => (a.order_index || 0) - (b.order_index || 0)).map((member, index) => (
                                <ScrollReveal key={member.id} direction="up" delay={index * 0.1}>
                                    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                                            {member.photo_url ? (
                                                <img
                                                    src={member.photo_url}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-primary-400">
                                                    <Users className="w-10 h-10" />
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">{member.name}</h3>
                                        <p className="text-xs text-primary-600 dark:text-primary-400 font-medium">{member.position}</p>
                                    </Card>
                                </ScrollReveal>
                            ))}
                        </div>
                    </section>
                )}

                {/* Divisions Section */}
                {divisions.length > 0 && (
                    <section>
                        <ScrollReveal direction="up">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                                Divisi
                            </h2>
                        </ScrollReveal>
                        <div className="grid md:grid-cols-2 gap-6">
                            {divisions.map((division, divIndex) => {
                                const divisionMembers = getMembersByDivision(division.id!);
                                if (divisionMembers.length === 0) return null;

                                return (
                                    <ScrollReveal key={division.id} direction="up" delay={divIndex * 0.1}>
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                                <div className="w-1.5 h-5 bg-primary-500 rounded-full"></div>
                                                {division.name}
                                            </h3>
                                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                                                {divisionMembers.sort((a, b) => (a.order_index || 0) - (b.order_index || 0)).map((member) => (
                                                    <div key={member.id} className="text-center">
                                                        <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                                                            {member.photo_url ? (
                                                                <img
                                                                    src={member.photo_url}
                                                                    alt={member.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                    <Users className="w-6 h-6" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">{member.name}</h4>
                                                        <p className="text-xs text-gray-500">{member.position}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* Empty State */}
                {coreMembers.length === 0 && divisions.every(d => getMembersByDivision(d.id!).length === 0) && (
                    <div className="text-center py-20">
                        <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">Struktur organisasi belum tersedia.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
