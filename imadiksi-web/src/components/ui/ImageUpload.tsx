import { useState, useRef } from "react";
import { supabase } from "../../lib/supabase";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "./Button";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    bucket?: string;
    folder?: string;
}

export function ImageUpload({
    value,
    onChange,
    bucket = "images",
    folder = "uploads"
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const uploadFile = async (file: File) => {
        if (!file.type.startsWith("image/")) {
            setError("File harus berupa gambar");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Ukuran file maksimal 5MB");
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const fileExt = file.name.split(".").pop();
            const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(fileName, file, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from(bucket)
                .getPublicUrl(fileName);

            onChange(data.publicUrl);
        } catch (err: any) {
            console.error("Upload error:", err);
            setError(err.message || "Gagal mengupload gambar");
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) uploadFile(file);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) uploadFile(file);
    };

    const removeImage = () => {
        onChange("");
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="space-y-2">
            {value ? (
                <div className="relative inline-block">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full max-w-xs h-40 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x200?text=Error";
                        }}
                    />
                    <Button
                        type="button"
                        variant="danger"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={removeImage}
                    >
                        <X className="w-3 h-3" />
                    </Button>
                </div>
            ) : (
                <div
                    className={`
                        border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                        transition-colors
                        ${dragOver
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                        }
                        ${uploading ? "pointer-events-none opacity-50" : ""}
                    `}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                            <span className="text-sm text-gray-500">Mengupload...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <Upload className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Klik atau drag gambar ke sini
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    PNG, JPG, GIF maksimal 5MB
                                </p>
                            </div>
                        </div>
                    )}
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleChange}
                        disabled={uploading}
                    />
                </div>
            )}

            {error && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                    <X className="w-4 h-4" />
                    {error}
                </p>
            )}
        </div>
    );
}
