import { SectionHeading } from "../components/ui/SectionHeading";
import { Users, History, Target, Loader2 } from "lucide-react";
import { useData } from "../contexts/DataContext";

export default function About() {
    const { organizationMembers, loading } = useData();

    // Filter core members (no division) and active, sorted by order
    const coreMembers = organizationMembers
        .filter(m => !m.division_id && m.is_active !== false)
        .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

    // Get single member by position keywords
    const getByPosition = (keywords: string[]) => {
        return coreMembers.find(m =>
            keywords.some(k => m.position.toLowerCase().includes(k.toLowerCase()))
        );
    };

    // Get multiple members by position keywords
    const getMultipleByPosition = (keywords: string[]) => {
        return coreMembers.filter(m =>
            keywords.some(k => m.position.toLowerCase().includes(k.toLowerCase()))
        );
    };

    const ketuaUmum = getByPosition(["ketua umum"]);
    const wakilKetua = getByPosition(["wakil ketua", "wakil"]);
    const sekretarisList = getMultipleByPosition(["sekretaris"]);
    const bendaharaList = getMultipleByPosition(["bendahara"]);

    // Define the structure with colors - dynamically include all sekretaris and bendahara
    const structureData = [
        { member: ketuaUmum, fallbackName: "Ketua Umum", fallbackRole: "Ketua Umum", color: "bg-blue-100 dark:bg-blue-900/20" },
        { member: wakilKetua, fallbackName: "Wakil Ketua", fallbackRole: "Wakil Ketua", color: "bg-pink-100 dark:bg-pink-900/20" },
        // All Sekretaris
        ...sekretarisList.map(s => ({
            member: s,
            fallbackName: s.name,
            fallbackRole: s.position,
            color: "bg-green-100 dark:bg-green-900/20"
        })),
        // All Bendahara
        ...bendaharaList.map(b => ({
            member: b,
            fallbackName: b.name,
            fallbackRole: b.position,
            color: "bg-yellow-100 dark:bg-yellow-900/20"
        }))
    ];

    // Add fallback if no sekretaris or bendahara found
    if (sekretarisList.length === 0) {
        structureData.splice(2, 0, { member: undefined, fallbackName: "Sekretaris", fallbackRole: "Sekretaris", color: "bg-green-100 dark:bg-green-900/20" });
    }
    if (bendaharaList.length === 0) {
        structureData.push({ member: undefined, fallbackName: "Bendahara", fallbackRole: "Bendahara", color: "bg-yellow-100 dark:bg-yellow-900/20" });
    }

    return (
        <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Tentang IMADIKSI</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Wadah aspirasi, kreativitas, dan pengembangan diri bagi mahasiswa penerima beasiswa Bidikmisi dan KIP-Kuliah.
                    </p>
                </div>

                {/* Visi Misi */}
                <div className="grid md:grid-cols-2 gap-12 items-start mb-20 bg-white dark:bg-gray-950 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                                <Target className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Visi</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Menjadikan IMADIKSI sebagai organisasi yang profesional, prestatif, dan kekeluargaan dalam mewujudkan SDM yang unggul dan berdaya saing global dengan berlandaskan iman dan taqwa.
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-accent-100 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400">
                                <History className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Misi</h2>
                        </div>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                            {[
                                "Membangun rasa kekeluargaan antar sesama anggota.",
                                "Mengembangkan potensi akademik dan non-akademik anggota.",
                                "Menjalin kerjasama dengan pihak internal maupun eksternal kampus.",
                                "Berperan aktif dalam kegiatan sosial dan kemasyarakatan."
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400">{i + 1}</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* History */}
                <div className="mb-20">
                    <SectionHeading title="Sejarah Singkat" subtitle="Perjalanan kami dari masa ke masa." />
                    <div className="max-w-4xl mx-auto prose dark:prose-invert text-center">
                        <p>
                            Didirikan pada tahun 2016, IMADIKSI berawal dari inisiatif sekumpulan mahasiswa penerima Bidikmisi yang merasakan perlunya wadah untuk saling berbagi informasi dan motivasi. Seiring berjalannya waktu, organisasi ini berkembang tidak hanya sebagai forum komunikasi, tetapi juga sebagai inkubator prestasi.
                        </p>
                        <p>
                            Hingga kini, IMADIKSI telah mencetak ribuan alumni yang tersebar di berbagai sektor profesional, membuktikan bahwa keterbatasan ekonomi bukanlah penghalang untuk meraih kesuksesan.
                        </p>
                    </div>
                </div>

                {/* Struktur Organisasi */}
                <div>
                    <SectionHeading title="Struktur Organisasi" subtitle="Badan Pengurus Harian Inti Periode 2025/2026" />
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
                            {structureData.map((item, idx) => (
                                <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                                    {item.member?.photo_url ? (
                                        <div className={`w-24 h-24 mx-auto rounded-full mb-4 overflow-hidden border-4 ${item.color.replace('bg-', 'border-').replace('/20', '/40')}`}>
                                            <img
                                                src={item.member.photo_url}
                                                alt={item.member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className={`w-24 h-24 mx-auto rounded-full mb-4 ${item.color} flex items-center justify-center`}>
                                            <Users className="w-10 h-10 opacity-50" />
                                        </div>
                                    )}
                                    <h3 className="font-bold text-gray-900 dark:text-white">
                                        {item.member?.name || item.fallbackName}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {item.member?.position || item.fallbackRole}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
