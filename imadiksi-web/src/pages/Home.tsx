import { ArrowRight, GraduationCap, Users, Calendar, Newspaper } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { HeroCarousel } from "../components/ui/HeroCarousel";
import { Link } from "react-router-dom";
import { useData } from "../contexts/DataContext";

export default function Home() {
    const { posts, heroSlides } = useData();

    // Get latest 3 posts
    const latestPosts = posts.slice(0, 3);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section with Background Carousel */}
            <section className="relative h-[480px] md:h-[580px] flex items-center justify-center overflow-hidden mt-20 rounded-3xl mx-4">
                {/* Background Carousel */}
                {heroSlides.length > 0 ? (
                    <div className="absolute inset-0 z-0">
                        <HeroCarousel slides={heroSlides} autoPlayInterval={5000} />
                    </div>
                ) : (
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-950">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-100/50 dark:bg-primary-900/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-accent-100/50 dark:bg-accent-900/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />
                    </div>
                )}

                {/* Dark Overlay for text readability */}
                {heroSlides.length > 0 && (
                    <div className="absolute inset-0 z-[1] bg-black/50" />
                )}

                {/* Hero Content */}
                <div className="container mx-auto px-4 relative z-10 pb-16">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <ScrollReveal direction="up" duration={0.8} width="100%">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border shadow-lg mb-4 ${heroSlides.length > 0 ? "bg-white/10 border-white/20" : "bg-white/80 border-primary-100 dark:bg-gray-800/80 dark:border-primary-900"}`}>
                                <span className={`flex h-2 w-2 rounded-full animate-pulse ${heroSlides.length > 0 ? "bg-primary-300" : "bg-primary-500"}`} />
                                <span className={`text-sm font-medium ${heroSlides.length > 0 ? "text-white" : "text-primary-800 dark:text-primary-300"}`}>Selamat Datang di Website Resmi</span>
                            </div>
                            <h1 className={`text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight font-heading ${heroSlides.length > 0 ? "text-white drop-shadow-lg" : "text-gray-900 dark:text-white"}`}>
                                IMADIKSI <br />
                                <span className={`${heroSlides.length > 0 ? "text-primary-300" : "text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400"}`}>
                                    UIN Raden Fatah
                                </span>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={0.2} duration={0.8} width="100%">
                            <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${heroSlides.length > 0 ? "text-gray-100" : "text-gray-600 dark:text-gray-300"}`}>
                                Ikatan Mahasiswa Bidikmisi KIP-Kuliah UIN Raden Fatah Palembang yang mewadahi mahasiswa penerima beasiswa KIP Kuliah.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={0.4} duration={0.8} width="100%">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                                <Link to="/tentang">
                                    <Button size="lg" className="rounded-full px-8 h-12 text-base font-medium shadow-lg">
                                        Tentang Kami <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                                <Link to="/program">
                                    <Button variant="outline" size="lg" className={`rounded-full px-8 h-12 text-base font-medium backdrop-blur-sm ${heroSlides.length > 0 ? "bg-white/10 border-white/30 text-white hover:bg-white/20" : "bg-white/50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800"}`}>
                                        Program Kerja
                                    </Button>
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Stats/Features Section */}
            <section className="py-20 bg-white dark:bg-gray-950">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <ScrollReveal delay={0.1} direction="up" width="100%" className="h-full">
                            <Card className="h-full p-8 hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary-500 group">
                                <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mb-6 text-primary-600 group-hover:scale-110 transition-transform duration-300">
                                    <GraduationCap className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white font-heading">Akademik</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Mendukung peningkatan prestasi akademik mahasiswa penerima beasiswa melalui mentoring dan pelatihan study skill.
                                </p>
                            </Card>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2} direction="up" width="100%" className="h-full">
                            <Card className="h-full p-8 hover:shadow-lg transition-all duration-300 border-t-4 border-t-accent-500 group">
                                <div className="w-14 h-14 bg-accent-50 dark:bg-accent-900/20 rounded-2xl flex items-center justify-center mb-6 text-accent-600 group-hover:scale-110 transition-transform duration-300">
                                    <Users className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white font-heading">Organisasi</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Mengembangkan jiwa kepemimpinan dan manajerial melalui berbagai kegiatan keorganisasian yang aktif dan progresif.
                                </p>
                            </Card>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3} direction="up" width="100%" className="h-full">
                            <Card className="h-full p-8 hover:shadow-lg transition-all duration-300 border-t-4 border-t-green-500 group">
                                <div className="w-14 h-14 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mb-6 text-green-600 group-hover:scale-110 transition-transform duration-300">
                                    <Calendar className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white font-heading">Pengabdian</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Berkontribusi nyata kepada masyarakat melalui program pengabdian dan bakti sosial yang berkelanjutan.
                                </p>
                            </Card>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Latest News */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <ScrollReveal width="100%">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-heading">Berita Terbaru</h2>
                                <p className="text-gray-600 dark:text-gray-400">Informasi terkini seputar kegiatan IMADIKSI</p>
                            </div>
                            <Link to="/publikasi">
                                <Button variant="outline" className="hidden sm:flex">Lihat Semua</Button>
                            </Link>
                        </div>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8">
                        {latestPosts.map((post, index) => (
                            <ScrollReveal key={post.id} delay={index * 0.1} width="100%" className="h-full">
                                <Link to={`/publikasi/${post.slug}`} className="group h-full block">
                                    <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 flex flex-col">
                                        <div className="aspect-video bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                                            {post.image_url ? (
                                                <img
                                                    src={post.image_url}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <Newspaper className="w-12 h-12" />
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-primary-700 shadow-sm">
                                                {post.category || "Berita"}
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {post.date}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors font-heading">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center text-primary-600 font-medium text-sm mt-auto group-hover:translate-x-1 transition-transform">
                                                Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-1" />
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>

                    <div className="mt-8 text-center sm:hidden">
                        <Link to="/publikasi">
                            <Button variant="outline" className="w-full">Lihat Semua Berita</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-primary-600 dark:bg-primary-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <ScrollReveal direction="up" width="100%">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">Siap Menjadi Bagian dari Kami?</h2>
                        <p className="text-primary-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                            Bergabunglah bersama keluarga besar IMADIKSI UIN Raden Fatah Palembang dan kembangkan potensimu.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/kontak">
                                <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-50 border-0 text-base px-8 h-12 shadow-lg hover:shadow-xl transition-all font-semibold">
                                    Hubungi Kami
                                </Button>
                            </Link>
                            <a href="https://instagram.com/imadiksi_uinrf" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="lg" className="border-2 border-primary-200 text-primary-50 hover:bg-primary-700 hover:border-primary-300 hover:text-white px-8 h-12 text-base font-semibold backdrop-blur-sm">
                                    Kunjungi Instagram
                                </Button>
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div >
    );
}
