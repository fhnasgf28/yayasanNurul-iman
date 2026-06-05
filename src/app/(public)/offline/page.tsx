import { WifiOff, Home } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Offline",
};

export default function OfflinePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-8 mx-auto">
        <WifiOff size={48} />
      </div>
      <h1 className="text-4xl font-serif font-bold text-primary mb-4">Anda Sedang Offline</h1>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        Koneksi internet Anda tampaknya terputus. Silakan periksa jaringan Anda dan coba lagi untuk mengakses semua fitur Yayasan Nurul Iman.
      </p>
      
      <Link 
        href="/"
        className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg"
      >
        <Home size={20} />
        <span>Kembali ke Beranda</span>
      </Link>
    </main>
  );
}
