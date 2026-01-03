import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import type { Post } from "../../contexts/DataContext";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Card } from "../../components/ui/Card";
import { ImageUpload } from "../../components/ui/ImageUpload";
import { FileUpload } from "../../components/ui/FileUpload";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function ManagePosts() {
    const { posts, addPost, updatePost, deletePost, loading } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Post | null>(null);
    const [formData, setFormData] = useState<Partial<Post>>({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "",
        image_url: "",
        file_url: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const openModal = (item?: Post) => {
        if (item) {
            setEditingItem(item);
            setFormData(item);
        } else {
            setEditingItem(null);
            setFormData({ title: "", slug: "", excerpt: "", content: "", category: "", image_url: "", file_url: "" });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const generateSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const dataToSubmit = {
                ...formData,
                slug: formData.slug || generateSlug(formData.title || ""),
            };
            if (editingItem?.id) {
                await updatePost(editingItem.id, dataToSubmit);
            } else {
                await addPost(dataToSubmit as Post);
            }
            closeModal();
        } catch (err) {
            alert("Gagal menyimpan data");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Yakin ingin menghapus item ini?")) {
            await deletePost(id);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Berita & Artikel</h1>
                <Button onClick={() => openModal()}>
                    <Plus className="w-4 h-4 mr-2" /> Tambah Artikel
                </Button>
            </div>

            <Card className="overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Judul</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Kategori</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Tanggal</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 dark:text-gray-300">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {posts.length === 0 ? (
                            <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">Belum ada artikel</td></tr>
                        ) : (
                            posts.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{item.title}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{item.category || "-"}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{item.date || "-"}</td>
                                    <td className="px-4 py-3 text-right">
                                        <Button variant="ghost" size="icon" onClick={() => openModal(item)}><Pencil className="w-4 h-4" /></Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id!)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </Card>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {editingItem ? "Edit Artikel" : "Tambah Artikel"}
                            </h3>
                            <button onClick={closeModal}><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Judul</label>
                                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Slug (URL)</label>
                                <Input value={formData.slug || ""} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="akan-digenerate-otomatis" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Ringkasan</label>
                                <Textarea value={formData.excerpt || ""} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} rows={2} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Konten</label>
                                <Textarea value={formData.content || ""} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={6} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Kategori</label>
                                <Input value={formData.category || ""} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Berita, Liputan, dll" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Gambar Cover</label>
                                <ImageUpload
                                    value={formData.image_url}
                                    onChange={(url) => setFormData({ ...formData, image_url: url })}
                                    folder="posts"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Lampiran File (PDF/Dokumen)</label>
                                <FileUpload
                                    value={formData.file_url}
                                    onChange={(url) => setFormData({ ...formData, file_url: url })}
                                    folder="attachments"
                                    label="Upload file lampiran (PDF, DOC, dll)"
                                />
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
