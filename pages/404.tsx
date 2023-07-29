import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';

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
        <Link href="/">
                <a className="inline-block py-3 px-6 bg-gradient-to-r from-blue-600 to-teal-400 rounded-md shadow-lg text-white font-semibold text-lg hover:from-blue-800 hover:to-teal-600 hover:text-opacity-100 hover:text-shadow-md transition duration-300">
                  Kembali Ke Beranda
                </a>
        </Link>
      </div>
    );
  };