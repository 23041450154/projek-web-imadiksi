import { useData } from "../contexts/DataContext";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { Users, Crown, Loader2 } from "lucide-react";

export default function Organization() {
    const { organizationMembers, divisions, loading } = useData();

    // Filter core members (no division) and active, sorted by order
    const coreMembers = organizationMembers
        .filter(m => !m.division_id && m.is_active !== false)
        .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

    // Group by position hierarchy
    const getByPosition = (keywords: string[]) => {
        return coreMembers.find(m =>
            keywords.some(k => m.position.toLowerCase().includes(k.toLowerCase()))
        );
    };

    const getMultipleByPosition = (keywords: string[]) => {
        return coreMembers.filter(m =>
            keywords.some(k => m.position.toLowerCase().includes(k.toLowerCase()))
        );
    };

    const ketuaUmum = getByPosition(["ketua umum"]);
    const wakilKetua = getByPosition(["wakil ketua", "wakil"]);
    const sekretaris = getMultipleByPosition(["sekretaris"]);
    const bendahara = getMultipleByPosition(["bendahara"]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
        );
    }


    // Get division head (Ketua) from organization_members table
    const getDivisionHead = (divisionId: string) => {
        const divisionMembers = organizationMembers.filter(m => m.division_id === divisionId && m.is_active !== false);
        const head = divisionMembers.find(m =>
            m.position.toLowerCase().includes('ketua')
        );
        return head;
    };

    // Organization Box Component - Mobile Optimized
    const OrgBox = ({ title, name, photo, highlight = false }: { title: string; name?: string; photo?: string; highlight?: boolean }) => (
        <div className={`flex flex-col items-center bg-white dark:bg-gray-800 border-2 ${highlight ? 'border-primary-500 dark:border-primary-400' : 'border-gray-300 dark:border-gray-600'} rounded-lg p-3 text-center min-w-[140px] max-w-[180px] hover:shadow-lg transition-all`}>
            <div className={`font-bold ${highlight ? 'text-primary-700 dark:text-primary-300' : 'text-gray-900 dark:text-white'} text-xs md:text-sm uppercase tracking-wide whitespace-nowrap`}>{title}</div>
            {(name || photo) && (
                <div className="flex flex-col items-center mt-2 w-full pt-2 border-t border-gray-100 dark:border-gray-700">
                    {photo ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden mb-1 border-2 border-gray-200">
                            <img src={photo} alt={name} className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-1 text-gray-400">
                            <Users className="w-4 h-4" />
                        </div>
                    )}
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate w-full">{name || "-"}</div>
                </div>
            )}
        </div>
    );

    // Vertical Line
    const VerticalLine = () => (
        <div className="w-0.5 h-6 bg-gray-400 dark:bg-gray-500 mx-auto" />
    );

    return (
        <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-8">
                    <ScrollReveal direction="up">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-900 mb-4">
                            <Crown className="w-4 h-4 text-primary-600" />
                            <span className="text-xs font-medium text-primary-700 dark:text-primary-300">Struktur Organisasi</span>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.1}>
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 font-heading">
                            Bagan Kepengurusan
                        </h1>
                    </ScrollReveal>
                </div>

                {/* Mobile-First Org Chart */}
                <div className="flex flex-col items-center space-y-2">

                    {/* Level 1: Ketua Umum */}
                    <ScrollReveal direction="up">
                        <OrgBox
                            title="KETUA UMUM"
                            name={ketuaUmum?.name}
                            photo={ketuaUmum?.photo_url}
                            highlight
                        />
                    </ScrollReveal>

                    <VerticalLine />

                    {/* Level 2: Wakil Ketua */}
                    <ScrollReveal direction="up" delay={0.1}>
                        <OrgBox
                            title="WAKIL KETUA"
                            name={wakilKetua?.name}
                            photo={wakilKetua?.photo_url}
                        />
                    </ScrollReveal>

                    <VerticalLine />

                    {/* Level 3: Sekretaris & Bendahara - Side by Side */}
                    <ScrollReveal direction="up" delay={0.15} className="w-full">
                        <div className="flex justify-center gap-3 flex-wrap md:flex-nowrap">
                            {/* Sekretaris */}
                            {sekretaris.length > 0 ? (
                                sekretaris.map((s) => (
                                    <OrgBox key={s.id} title={s.position} name={s.name} photo={s.photo_url} />
                                ))
                            ) : (
                                <OrgBox title="SEKRETARIS" />
                            )}
                            {/* Bendahara */}
                            {bendahara.length > 0 ? (
                                bendahara.map((b) => (
                                    <OrgBox key={b.id} title={b.position} name={b.name} photo={b.photo_url} />
                                ))
                            ) : (
                                <OrgBox title="BENDAHARA" />
                            )}
                        </div>
                    </ScrollReveal>

                    {/* Divider Line */}
                    {divisions.length > 0 && (
                        <>
                            <VerticalLine />
                            <div className="w-full max-w-lg h-0.5 bg-gray-300 dark:bg-gray-600" />
                        </>
                    )}

                    {/* Level 4: Divisions - Grid on Mobile */}
                    {divisions.length > 0 && (
                        <ScrollReveal direction="up" delay={0.2} className="w-full">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4 max-w-5xl mx-auto">
                                {divisions.map((div) => {
                                    const ketuaDivisi = getDivisionHead(div.id!);
                                    return (
                                        <div key={div.id} className="flex flex-col items-center">
                                            {/* Division Box - allows text wrap */}
                                            <div className="flex flex-col items-center bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-3 text-center w-full hover:shadow-lg transition-all">
                                                <div className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wide leading-tight text-center">{div.name}</div>
                                                <div className="flex flex-col items-center mt-2 w-full pt-2 border-t border-gray-100 dark:border-gray-700">
                                                    {ketuaDivisi?.photo_url ? (
                                                        <img src={ketuaDivisi.photo_url} alt={ketuaDivisi.name} className="w-10 h-10 rounded-full object-cover mb-1 border-2 border-gray-200" />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-1 text-gray-400">
                                                            <Users className="w-4 h-4" />
                                                        </div>
                                                    )}
                                                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate w-full">{ketuaDivisi?.name || "Ketua"}</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </ScrollReveal>
                    )}
                </div>
            </div>
        </div>
    );
}
