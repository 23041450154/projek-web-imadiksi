import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import type { HeroSlide } from "../../contexts/DataContext";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { ImageUpload } from "../../components/ui/ImageUpload";
import { Plus, Trash2, Loader2, GripVertical, Image as ImageIcon } from "lucide-react";

export default function ManageHeroSlides() {
    const { heroSlides, addHeroSlide, updateHeroSlide, deleteHeroSlide, loading, fetchAll } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<Partial<HeroSlide>>({
        image_url: "",
        title: "",
        subtitle: "",
        order_index: 0,
        is_active: true,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Get all slides including inactive for admin
    const [allSlides, setAllSlides] = useState<HeroSlide[]>([]);

    // Fetch all slides (including inactive) on mount
    useState(() => {
        const fetchAdminSlides = async () => {
            const { supabase } = await import("../../lib/supabase");
            const { data } = await supabase
                .from("hero_slides")
                .select("*")
                .order("order_index", { ascending: true });
            setAllSlides(data || []);
        };
        fetchAdminSlides();
    });

    const openModal = (slide?: HeroSlide) => {
        if (slide) {
            setFormData(slide);
            setEditingId(slide.id || null);
        } else {
            setFormData({
                image_url: "",
                title: "",
                subtitle: "",
                order_index: allSlides.length,
                is_active: true,
            });
            setEditingId(null);
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.image_url) {
            alert("Gambar wajib diupload");
            return;
        }
        setIsSubmitting(true);
        try {
            if (editingId) {
                await updateHeroSlide(editingId, formData);
            } else {
                await addHeroSlide(formData as HeroSlide);
            }
            setIsModalOpen(false);
            // Refresh admin list
            const { supabase } = await import("../../lib/supabase");
            const { data } = await supabase
                .from("hero_slides")
                .select("*")
                .order("order_index", { ascending: true });
            setAllSlides(data || []);
        } catch (error) {
            console.error("Error saving slide:", error);
            alert("Gagal menyimpan slide");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Hapus slide ini?")) return;
        try {
            await deleteHeroSlide(id);
            setAllSlides((prev) => prev.filter((s) => s.id !== id));
        } catch (error) {
            console.error("Error deleting:", error);
            alert("Gagal menghapus");
        }
    };

    if (loading && allSlides.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Hero Slides
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Kelola gambar carousel di halaman utama
                    </p>
                </div>
                <Button onClick={() => openModal()}>
                    <Plus className="w-4 h-4 mr-2" /> Tambah Slide
                </Button>
            </div>

            {allSlides.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-dashed border-gray-300 dark:border-gray-700">
                    <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Belum ada slide. Tambahkan gambar pertama.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allSlides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border ${slide.is_active
                                ? "border-primary-200 dark:border-primary-800"
                                : "border-gray-200 dark:border-gray-700 opacity-60"
                                }`}
                        >
                            <div className="aspect-video bg-gray-100 dark:bg-gray-900 relative">
                                <img
                                    src={slide.image_url}
                                    alt={slide.title || "Slide"}
                                    className="w-full h-full object-cover"
                                />
                                {/* Order Badge */}
                                <div className="absolute top-2 left-2 bg-primary-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                                    <GripVertical className="w-4 h-4" /> Urutan #{slide.order_index ?? index + 1}
                                </div>
                                {/* Status Badge */}
                                <div className={`absolute top-2 right-2 text-white text-xs px-2 py-1 rounded font-medium ${slide.is_active ? "bg-green-500" : "bg-red-500"}`}>
                                    {slide.is_active ? "✓ Aktif" : "✗ Nonaktif"}
                                </div>
                            </div>
                            <div className="p-4 space-y-3">
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                        {slide.title || "(Tanpa Judul)"}
                                    </h3>
                                    <p className="text-sm text-gray-500 truncate">{slide.subtitle || "-"}</p>
                                </div>

                                {/* Quick Toggle Active */}
                                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tampilkan di Home</span>
                                    <button
                                        onClick={async () => {
                                            try {
                                                await updateHeroSlide(slide.id!, { is_active: !slide.is_active });
                                                setAllSlides(prev => prev.map(s =>
                                                    s.id === slide.id ? { ...s, is_active: !s.is_active } : s
                                                ));
                                            } catch (err) {
                                                console.error(err);
                                            }
                                        }}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${slide.is_active ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-600"}`}
                                    >
                                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${slide.is_active ? "translate-x-5" : "translate-x-0"}`} />
                                    </button>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => openModal(slide)}
                                        className="flex-1"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDelete(slide.id!)}
                                        className="text-red-500 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? "Edit Slide" : "Tambah Slide Baru"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            Gambar *
                        </label>
                        <ImageUpload
                            value={formData.image_url || ""}
                            onChange={(url) => setFormData({ ...formData, image_url: url })}
                            bucket="hero-slides"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            Judul (Opsional)
                        </label>
                        <input
                            type="text"
                            value={formData.title || ""}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                            placeholder="Contoh: Kegiatan Pelantikan"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            Subtitle (Opsional)
                        </label>
                        <input
                            type="text"
                            value={formData.subtitle || ""}
                            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                            placeholder="Contoh: 12 November 2025"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            Urutan
                        </label>
                        <input
                            type="number"
                            value={formData.order_index || 0}
                            onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                            min={0}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={formData.is_active ?? true}
                            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                            className="w-4 h-4 text-primary-600"
                        />
                        <label htmlFor="is_active" className="text-sm text-gray-700 dark:text-gray-300">
                            Aktif (Tampilkan di halaman utama)
                        </label>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            {editingId ? "Simpan" : "Tambah"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
