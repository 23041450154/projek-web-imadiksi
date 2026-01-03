import { useState } from "react";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useData } from "../contexts/DataContext";
import type { GalleryItem } from "../contexts/DataContext";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Gallery() {
    const { gallery, loading } = useData();
    const [filter, setFilter] = useState("Semua");
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    const categories: string[] = ["Semua", ...Array.from(new Set(gallery.map(item => item.category).filter((c): c is string => !!c)))];

    const filteredData = filter === "Semua"
        ? gallery
        : gallery.filter(item => item.category === filter);

    if (loading) {
        return (
            <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                    <p className="text-gray-500">Memuat galeri...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <SectionHeading title="Galeri Kegiatan" subtitle="Dokumentasi momen berharga perjalanan IMADIKSI." />

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                ? "bg-primary-600 text-white shadow-md shadow-primary-500/20"
                                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {filteredData.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-lg">Belum ada gambar di galeri</p>
                        <p className="text-sm mt-2">Tambahkan gambar melalui panel admin</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                    >
                        {filteredData.slice(0, 12).map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block bg-gray-100 dark:bg-gray-800"
                                onClick={() => setSelectedImage(item)}
                            >
                                <img
                                    src={item.image_url}
                                    alt={item.title || "Gallery"}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/600x400/1f2937/9ca3af?text=No+Image";
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    {item.category && <Badge variant="secondary" className="self-start mb-2">{item.category}</Badge>}
                                    <h3 className="text-white font-bold text-lg line-clamp-2">{item.title || "Untitled"}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {filteredData.length > 12 && (
                    <div className="text-center mt-12 text-gray-500 text-sm">
                        <p>Menampilkan 12 dari {filteredData.length} gambar.</p>
                        {/* Note: In a full implementation we would add "Load More" logic here, 
                            but for now limiting to 12 significantly improves performance over rendering all at once. */}
                    </div>
                )}

                {/* Lightbox Modal */}
                {selectedImage && (
                    <Modal
                        isOpen={!!selectedImage}
                        onClose={() => setSelectedImage(null)}
                        title={selectedImage.title || "Gallery"}
                        className="max-w-4xl p-0 bg-transparent shadow-none border-none"
                    >
                        <div className="relative rounded-xl overflow-hidden bg-black">
                            <img
                                src={selectedImage.image_url}
                                alt={selectedImage.title || "Gallery"}
                                className="w-full max-h-[80vh] object-contain"
                            />
                            <div className="absolute bottom-0 left-0 w-full p-4 bg-black/60 text-white">
                                <p className="font-medium">{selectedImage.title || "Untitled"}</p>
                                {selectedImage.category && <span className="text-xs opacity-75">{selectedImage.category}</span>}
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
}
