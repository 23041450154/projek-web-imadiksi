import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-9xl font-bold text-primary-200 dark:text-gray-800">404</h1>
            <h2 className="text-3xl font-bold -mt-10 mb-4 text-gray-900 dark:text-white">Halaman Tidak Ditemukan</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                Maaf, halaman yang Anda cari mungkin telah dipindahkan atau tidak tersedia.
            </p>
            <Link to="/">
                <Button size="lg">Kembali ke Beranda</Button>
            </Link>
        </div>
    );
}
