import { useState } from "react";
import { useData, type OrganizationMember } from "../../contexts/DataContext";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { ImageUpload } from "../../components/ui/ImageUpload";
import { Plus, Pencil, Trash2, X, Users, Crown } from "lucide-react";

export default function ManageOrganization() {
    const { organizationMembers, divisions, addOrganizationMember, updateOrganizationMember, deleteOrganizationMember, loading } = useData();
    const [activeTab, setActiveTab] = useState<"core" | "division">("core");
    const [selectedDivision, setSelectedDivision] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<OrganizationMember | null>(null);
    const [formData, setFormData] = useState<Partial<OrganizationMember>>({
        name: "",
        position: "",
        division_id: null,
        photo_url: "",
        order_index: 0,
        is_active: true,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Filter members based on tab
    const coreMembers = organizationMembers.filter(m => !m.division_id && m.is_active);
    const divisionMembers = selectedDivision
        ? organizationMembers.filter(m => m.division_id === selectedDivision)
        : [];

    const openModal = (item?: OrganizationMember) => {
        if (item) {
            setEditingItem(item);
            setFormData(item);
        } else {
            setEditingItem(null);
            setFormData({
                name: "",
                position: "",
                division_id: activeTab === "division" ? selectedDivision : null,
                photo_url: "",
                order_index: activeTab === "core" ? coreMembers.length : divisionMembers.length,
                is_active: true,
            });
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
                division_id: activeTab === "core" ? null : (formData.division_id || selectedDivision),
            };
            if (editingItem?.id) {
                await updateOrganizationMember(editingItem.id, dataToSubmit);
            } else {
                await addOrganizationMember(dataToSubmit as OrganizationMember);
            }
            closeModal();
        } catch (err) {
            alert("Gagal menyimpan data");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Yakin ingin menghapus anggota ini?")) {
            await deleteOrganizationMember(id);
        }
    };

    const getDivisionName = (divisionId: string | null | undefined) => {
        if (!divisionId) return "Pengurus Inti";
        const div = divisions.find(d => d.id === divisionId);
        return div?.name || "Unknown";
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Struktur Organisasi</h1>
                <Button onClick={() => openModal()}>
                    <Plus className="w-4 h-4 mr-2" /> Tambah Anggota
                </Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
                <Button
                    variant={activeTab === "core" ? "primary" : "outline"}
                    onClick={() => setActiveTab("core")}
                    className="flex items-center gap-2"
                >
                    <Crown className="w-4 h-4" /> Pengurus Inti
                </Button>
                <Button
                    variant={activeTab === "division" ? "primary" : "outline"}
                    onClick={() => setActiveTab("division")}
                    className="flex items-center gap-2"
                >
                    <Users className="w-4 h-4" /> Anggota Divisi
                </Button>
            </div>

            {/* Division Selector (only for division tab) */}
            {activeTab === "division" && (
                <div className="flex gap-2 flex-wrap">
                    {divisions.map(div => (
                        <Button
                            key={div.id}
                            variant={selectedDivision === div.id ? "primary" : "outline"}
                            size="sm"
                            onClick={() => setSelectedDivision(div.id!)}
                        >
                            {div.name}
                        </Button>
                    ))}
                </div>
            )}

            {/* Members Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {(activeTab === "core" ? coreMembers : divisionMembers).map((member) => (
                    <Card key={member.id} className="p-4 text-center group relative">
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => openModal(member)}>
                                <Pencil className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(member.id!)}>
                                <Trash2 className="w-3 h-3 text-red-500" />
                            </Button>
                        </div>
                        <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                            {member.photo_url ? (
                                <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <Users className="w-8 h-8" />
                                </div>
                            )}
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{member.name}</h3>
                        <p className="text-xs text-primary-600 dark:text-primary-400">{member.position}</p>
                        {activeTab === "core" && member.division_id && (
                            <p className="text-xs text-gray-500 mt-1">{getDivisionName(member.division_id)}</p>
                        )}
                    </Card>
                ))}

                {(activeTab === "core" ? coreMembers : divisionMembers).length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        {activeTab === "division" && !selectedDivision
                            ? "Pilih divisi terlebih dahulu"
                            : "Belum ada anggota"}
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md">
                        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {editingItem ? "Edit Anggota" : "Tambah Anggota"}
                            </h3>
                            <button onClick={closeModal}><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Foto</label>
                                <ImageUpload
                                    value={formData.photo_url || ""}
                                    onChange={(url) => setFormData({ ...formData, photo_url: url })}
                                    bucket="members"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Jabatan</label>
                                <Input
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    placeholder="Contoh: Ketua Umum, Koordinator, dll"
                                    required
                                />
                            </div>
                            {activeTab === "division" && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">Divisi</label>
                                    <select
                                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                        value={formData.division_id || ""}
                                        onChange={(e) => setFormData({ ...formData, division_id: e.target.value || null })}
                                    >
                                        <option value="">Pilih Divisi</option>
                                        {divisions.map(div => (
                                            <option key={div.id} value={div.id}>{div.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium mb-1">Urutan Tampil</label>
                                <Input
                                    type="number"
                                    value={formData.order_index || 0}
                                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
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
