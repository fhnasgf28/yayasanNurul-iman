import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Custom404() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
        router.push('/');
    },4000);
},[]);

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-400 to-teal-500">
        <h1 className="text-4xl font-bold text-white mb-4">404 - Halaman Tidak Ditemukan</h1>
        <img src="/images/warning.png" alt="404 Illustration" className="w-20 h-auto mb-8" />
        <p className="text-lg text-white">Maaf, halaman yang Anda cari tidak ditemukan.</p>
        <a href="/" className="mt-4 py-3 px-8 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out">
          Kembali ke Beranda
        </a>
      </div>
    );
  };