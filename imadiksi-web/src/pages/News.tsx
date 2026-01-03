import { Link } from "react-router-dom";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Badge } from "../components/ui/Badge";
import { useData } from "../contexts/DataContext";
import { Calendar, User, Loader2 } from "lucide-react";
import { useState } from "react";
import { Input } from "../components/ui/Input";

export default function News() {
    const { posts, loading } = useData();
    const [search, setSearch] = useState("");

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        (post.category?.toLowerCase() || "").includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
                    <p className="text-gray-500">Memuat berita...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 max-w-5xl">
                <SectionHeading title="Berita & Pengumuman" subtitle="Informasi terbaru dan tulisan inspiratif." />

                <div className="mb-10 max-w-md mx-auto">
                    <Input
                        placeholder="Cari berita..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-white dark:bg-gray-800"
                    />
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-lg">Belum ada berita</p>
                        <p className="text-sm mt-2">Tambahkan berita melalui panel admin</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {filteredPosts.map((post) => (
                            <article key={post.id} className="flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-950 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-900 transition-colors overflow-hidden">
                                <div className="md:w-1/3 h-48 bg-gray-200 dark:bg-gray-800 rounded-xl shrink-0 overflow-hidden">
                                    <img
                                        src={post.image_url || `https://placehold.co/600x400/1a1a1a/ffffff?text=${encodeURIComponent(post.title)}`}
                                        alt={post.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://placehold.co/600x400/1a1a1a/ffffff?text=${encodeURIComponent(post.title)}`;
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                        {post.category && <Badge variant="outline">{post.category}</Badge>}
                                        {post.date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>}
                                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> Admin</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-primary-600 transition-colors">
                                        <Link to={`/publikasi/${post.slug}`}>{post.title}</Link>
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 break-words" style={{ wordBreak: 'break-word' }}>
                                        {post.excerpt}
                                    </p>
                                    <Link to={`/publikasi/${post.slug}`} className="text-primary-600 dark:text-primary-400 font-medium hover:underline mt-auto inline-block">
                                        Baca Selengkapnya
                                    </Link>
                                </div>
                            </article>
                        ))}
                        {filteredPosts.length === 0 && posts.length > 0 && (
                            <div className="text-center text-gray-500 py-20">Tidak ada berita ditemukan.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
