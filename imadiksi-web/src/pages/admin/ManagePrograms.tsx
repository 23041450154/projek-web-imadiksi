import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import type { Program } from "../../contexts/DataContext";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Select } from "../../components/ui/Select";
import { Card } from "../../components/ui/Card";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function ManagePrograms() {
    const { programs, addProgram, updateProgram, deleteProgram, loading } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Program | null>(null);
    const [formData, setFormData] = useState<Partial<Program>>({
        title: "",
        summary: "",
        status: "upcoming",
        date: "",
        tags: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tagsInput, setTagsInput] = useState("");

    const openModal = (item?: Program) => {
        if (item) {
            setEditingItem(item);
            setFormData(item);
            setTagsInput(item.tags?.join(", ") || "");
        } else {
            setEditingItem(null);
            setFormData({ title: "", summary: "", status: "upcoming", date: "", tags: [] });
            setTagsInput("");
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
            const dataToSubmit = {
                ...formData,
                tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
            };
            if (editingItem?.id) {
                await updateProgram(editingItem.id, dataToSubmit);
            } else {
                await addProgram(dataToSubmit as Program);
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
            await deleteProgram(id);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Program Kerja</h1>
                <Button onClick={() => openModal()}>
                    <Plus className="w-4 h-4 mr-2" /> Tambah Program
                </Button>
            </div>

            {/* Data Table */}
            <Card className="overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Judul</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Tanggal</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 dark:text-gray-300">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {programs.length === 0 ? (
                            <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">Belum ada data program</td></tr>
                        ) : (
                            programs.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{item.title}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === "completed" ? "bg-green-100 text-green-700" :
                                            item.status === "ongoing" ? "bg-blue-100 text-blue-700" :
                                                "bg-yellow-100 text-yellow-700"
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg">
                        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {editingItem ? "Edit Program" : "Tambah Program"}
                            </h3>
                            <button onClick={closeModal}><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Judul</label>
                                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                                <Textarea value={formData.summary || ""} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} rows={3} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Status</label>
                                    <Select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as Program["status"] })}>
                                        <option value="upcoming">Upcoming</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tanggal</label>
                                    <Input type="date" value={formData.date || ""} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Tags (pisahkan dengan koma)</label>
                                <Input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="pendidikan, sosial, lingkungan" />
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
