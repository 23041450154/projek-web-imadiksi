import { useState } from "react";
import { useData, type Division } from "../../contexts/DataContext";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Card } from "../../components/ui/Card";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function ManageDivisions() {
    const { divisions, addDivision, updateDivision, deleteDivision, loading } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Division | null>(null);
    const [formData, setFormData] = useState<Partial<Division>>({
        name: "",
        description: "",
        work_programs: [],
    });
    const [workProgramsInput, setWorkProgramsInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const openModal = (item?: Division) => {
        if (item) {
            setEditingItem(item);
            setFormData(item);
            setWorkProgramsInput(item.work_programs?.join("\n") || "");
        } else {
            setEditingItem(null);
            setFormData({ name: "", description: "", work_programs: [] });
            setWorkProgramsInput("");
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
                slug: formData.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                work_programs: workProgramsInput.split("\n").map((t) => t.trim()).filter(Boolean),
            };
            if (editingItem?.id) {
                await updateDivision(editingItem.id, dataToSubmit);
            } else {
                await addDivision(dataToSubmit as Division);
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
            await deleteDivision(id);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Divisi</h1>
                <Button onClick={() => openModal()}>
                    <Plus className="w-4 h-4 mr-2" /> Tambah Divisi
                </Button>
            </div>

            <Card className="overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Nama Divisi</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Program Kerja</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 dark:text-gray-300">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {divisions.length === 0 ? (
                            <tr><td colSpan={3} className="px-4 py-8 text-center text-gray-500">Belum ada divisi</td></tr>
                        ) : (
                            divisions.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">{item.name}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{item.work_programs?.length || 0} program</td>
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
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg">
                        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {editingItem ? "Edit Divisi" : "Tambah Divisi"}
                            </h3>
                            <button onClick={closeModal}><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nama Divisi</label>
                                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                                <Textarea value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Program Kerja (satu per baris)</label>
                                <Textarea value={workProgramsInput} onChange={(e) => setWorkProgramsInput(e.target.value)} rows={4} placeholder="Program 1&#10;Program 2&#10;Program 3" />
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
