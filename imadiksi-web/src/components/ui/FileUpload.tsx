import { useState, useRef } from "react";
import { supabase } from "../../lib/supabase";
import { Upload, X, Loader2, FileText, Download } from "lucide-react";
import { Button } from "./Button";

interface FileUploadProps {
    value?: string;
    onChange: (url: string) => void;
    bucket?: string;
    folder?: string;
    accept?: string;
    maxSizeMB?: number;
    label?: string;
}

export function FileUpload({
    value,
    onChange,
    bucket = "images",
    folder = "files",
    accept = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar",
    maxSizeMB = 10,
    label = "Klik atau drag file ke sini"
}: FileUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const getFileName = (url: string) => {
        try {
            const parts = url.split("/");
            const fileName = parts[parts.length - 1];
            // Remove timestamp prefix if present
            const cleanName = fileName.replace(/^\d+-[a-z0-9]+\./, "");
            return cleanName || fileName;
        } catch {
            return "file";
        }
    };

    const uploadFile = async (file: File) => {
        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`Ukuran file maksimal ${maxSizeMB}MB`);
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
            setError(err.message || "Gagal mengupload file");
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

    const removeFile = () => {
        onChange("");
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="space-y-2">
            {value ? (
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <FileText className="w-8 h-8 text-primary-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {getFileName(value)}
                        </p>
                        <a
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary-600 hover:underline flex items-center gap-1"
                        >
                            <Download className="w-3 h-3" /> Download
                        </a>
                    </div>
                    <Button
                        type="button"
                        variant="danger"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={removeFile}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            ) : (
                <div
                    className={`
                        border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                        transition-colors
                        ${dragOver
                            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
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
                            <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
                            <span className="text-sm text-gray-500">Mengupload...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                <Upload className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {label}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    PDF, DOC, XLS, PPT, ZIP maksimal {maxSizeMB}MB
                                </p>
                            </div>
                        </div>
                    )}
                    <input
                        ref={inputRef}
                        type="file"
                        accept={accept}
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
