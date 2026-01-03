import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import type { GalleryItem } from "../../contexts/DataContext";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { ImageUpload } from "../../components/ui/ImageUpload";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function ManageGallery() {
    const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem, loading } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
    const [formData, setFormData] = useState<Partial<GalleryItem>>({
        title: "",
        category: "",
        image_url: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const openModal = (item?: GalleryItem) => {
        if (item) {
            setEditingItem(item);
            setFormData(item);
        } else {
            setEditingItem(null);
            setFormData({ title: "", category: "", image_url: "" });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingItem?.id) {
                await updateGalleryItem(editingItem.id, formData);
            } else {
                await addGalleryItem(formData as GalleryItem);
            }
            closeModal();
        } catch (err) {
            alert("Gagal menyimpan data");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Yakin ingin menghapus gambar ini?")) {
            await deleteGalleryItem(id);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Galeri</h1>
                <Button onClick={() => openModal()}>
                    <Plus className="w-4 h-4 mr-2" /> Tambah Gambar
                </Button>
            </div>

            {gallery.length === 0 ? (
                <Card className="p-8 text-center text-gray-500">Belum ada gambar di galeri</Card>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {gallery.map((item) => (
                        <Card key={item.id} className="overflow-hidden group relative">
                            <img
                                src={item.image_url}
                                alt={item.title || "Gallery"}
                                className="w-full h-40 object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x200?text=No+Image"; }}
                            />
                            <div className="p-3">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.title || "Untitled"}</p>
                                <p className="text-xs text-gray-500">{item.category || "-"}</p>
                            </div>
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <Button variant="secondary" size="icon" onClick={() => openModal(item)}><Pencil className="w-3 h-3" /></Button>
                                <Button variant="danger" size="icon" onClick={() => handleDelete(item.id!)}><Trash2 className="w-3 h-3" /></Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md">
                        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {editingItem ? "Edit Gambar" : "Tambah Gambar"}
                            </h3>
                            <button onClick={closeModal}><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Upload Gambar</label>
                                <ImageUpload
                                    value={formData.image_url}
                                    onChange={(url) => setFormData({ ...formData, image_url: url })}
                                    folder="gallery"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Judul (Opsional)</label>
                                <Input value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Kategori</label>
                                <Input value={formData.category || ""} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Kegiatan, Dokumentasi, dll" />
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={closeModal}>Batal</Button>
                                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Menyimpan..." : "Simpan"}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
