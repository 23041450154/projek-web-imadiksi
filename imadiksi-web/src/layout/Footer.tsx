import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Twitter, MapPin, Phone } from "lucide-react";
import logoImadiksi from "../assets/logo-imadiksi.jpg";

export function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-primary-700 dark:text-primary-400">
                            <img src={logoImadiksi} alt="IMADIKSI Logo" className="w-10 h-10 object-contain rounded-full" />
                            <span>IMADIKSI</span>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            Organisasi Mahasiswa yang Berfokus pada Pengembangan Kompetensi dan Kolaborasi. Wadah aspirasi dan kreasi mahasiswa Bidikmisi/KIP-K.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Navigasi</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li><Link to="/tentang" className="hover:text-primary-600 dark:hover:text-primary-400">Tentang Kami</Link></li>
                            <li><Link to="/divisi" className="hover:text-primary-600 dark:hover:text-primary-400">Divisi</Link></li>
                            <li><Link to="/program" className="hover:text-primary-600 dark:hover:text-primary-400">Program Kerja</Link></li>
                            <li><Link to="/publikasi" className="hover:text-primary-600 dark:hover:text-primary-400">Berita & Artikel</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Kontak</h3>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary-600 shrink-0" />
                                <span>Gedung Student Center Lt. 2, Kampus Pusat</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary-600 shrink-0" />
                                <span>info@imadiksi.org</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary-600 shrink-0" />
                                <span>+62 812-3456-7890</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Ikuti Kami</h3>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-gray-100 dark:bg-gray-900 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 dark:bg-gray-900 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-gray-100 dark:bg-gray-900 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-500">
                    <p>&copy; {new Date().getFullYear()} IMADIKSI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
