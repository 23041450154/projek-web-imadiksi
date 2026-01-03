import { useState } from "react";
import { useData } from "../../contexts/DataContext";
import type { Event } from "../../contexts/DataContext";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function ManageEvents() {
    const { events, addEvent, updateEvent, deleteEvent, loading } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Event | null>(null);
    const [formData, setFormData] = useState<Partial<Event>>({
        title: "",
        date: "",
        location: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const openModal = (item?: Event) => {
        if (item) {
            setEditingItem(item);
            setFormData(item);
        } else {
            setEditingItem(null);
            setFormData({ title: "", date: "", location: "" });
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
                await updateEvent(editingItem.id, formData);
            } else {
                await addEvent(formData as Event);
            }
            closeModal();
        } catch (err) {
            alert("Gagal menyimpan data");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Yakin ingin menghapus event ini?")) {
            await deleteEvent(id);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Event & Agenda</h1>
                <Button onClick={() => openModal()}>
                    <Plus className="w-4 h-4 mr-2" /> Tambah Event
                </Button>
            </div>

            <Card className="overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Nama Event</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Tanggal</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Lokasi</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 dark:text-gray-300">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {events.length === 0 ? (
                            <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">Belum ada event</td></tr>
                        ) : (
                            events.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">{item.title}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{item.date}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{item.location || "-"}</td>
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
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md">
                        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {editingItem ? "Edit Event" : "Tambah Event"}
                            </h3>
                            <button onClick={closeModal}><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nama Event</label>
                                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Tanggal</label>
                                <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Lokasi</label>
                                <Input value={formData.location || ""} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Kampus, Aula, dll" />
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
