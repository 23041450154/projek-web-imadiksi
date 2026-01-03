import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag, Download, Loader2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useData } from "../contexts/DataContext";

export default function NewsDetail() {
    const { slug } = useParams();
    const { posts, loading } = useData();

    const post = posts.find(p => p.slug === slug);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-gray-600 dark:text-gray-400">Artikel tidak ditemukan.</p>
                <Link to="/publikasi">
                    <Button variant="outline">Kembali ke Berita</Button>
                </Link>
            </div>
        );
    }

    const getFileName = (url: string) => {
        try {
            const parts = url.split("/");
            return parts[parts.length - 1] || "file";
        } catch {
            return "file";
        }
    };

    return (
        <div className="min-h-screen py-20 bg-white dark:bg-gray-900">
            <article className="container mx-auto px-4 max-w-3xl">
                <Link to="/publikasi">
                    <Button variant="ghost" size="sm" className="mb-8 gap-2 pl-0 hover:bg-transparent">
                        <ArrowLeft className="w-4 h-4" /> Kembali ke Berita
                    </Button>
                </Link>

                <header className="mb-10">
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">
                        {post.category && (
                            <span className="bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full flex items-center gap-1">
                                <Tag className="w-3 h-3" /> {post.category}
                            </span>
                        )}
                        {post.date && (
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
                        )}
                        <span className="flex items-center gap-2"><User className="w-4 h-4" /> Admin</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-8">
                        {post.title}
                    </h1>
                    {post.image_url && (
                        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <img
                                src={post.image_url}
                                alt={post.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </div>
                    )}
                </header>

                {/* Article Content */}
                <div className="prose dark:prose-invert prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed mb-10 break-words overflow-hidden" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    {post.content?.split('\n').map((paragraph: string, i: number) => (
                        paragraph.trim() && <p key={i}>{paragraph}</p>
                    ))}
                </div>

                {/* File Attachment Download - After Content */}
                {post.file_url && (
                    <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-800 mb-10">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Lampiran File</p>
                                <p className="text-sm text-gray-500">{getFileName(post.file_url)}</p>
                            </div>
                            <a href={post.file_url} target="_blank" rel="noopener noreferrer" download>
                                <Button className="gap-2">
                                    <Download className="w-4 h-4" /> Download
                                </Button>
                            </a>
                        </div>
                    </div>
                )}

                {/* Related Posts */}
                <div className="mt-20 pt-10 border-t border-gray-200 dark:border-gray-800">
                    <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Baca Juga</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {posts.filter(p => p.id !== post.id).slice(0, 2).map((p) => (
                            <Link key={p.id} to={`/publikasi/${p.slug}`} className="group block">
                                {p.image_url && (
                                    <div className="bg-gray-100 dark:bg-gray-800 h-40 rounded-xl mb-3 overflow-hidden">
                                        <img
                                            src={p.image_url}
                                            alt={p.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}
                                <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">{p.title}</h4>
                            </Link>
                        ))}
                    </div>
                </div>
            </article>
        </div>
    );
}
