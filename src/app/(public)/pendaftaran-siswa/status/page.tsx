import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, GraduationCap } from "lucide-react";
import StatusChecker from "@/features/student-registration/StatusChecker";

export const metadata: Metadata = {
  title: "Cek Status Pendaftaran | Yayasan Nurul Iman",
  description: "Pantau status verifikasi dan penerimaan santri baru DTA Nurul Iman secara online dan real-time.",
};

export default function RegistrationStatusPage() {
  return (
    <main className="pt-20 bg-light/30">
      {/* Hero Section */}
      <section className="bg-primary py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-islamic" />
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <Link 
            href="/pendaftaran-siswa" 
            className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary hover:underline mb-4"
          >
            <ArrowLeft size={16} />
            Kembali ke Pendaftaran
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            <BadgeCheck size={16} />
            PPDB Online Status Checker
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Cek Status Pendaftaran</h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
            Gunakan portal ini untuk mengetahui perkembangan status pengajuan pendaftaran putra-putri Anda di Yayasan Nurul Iman.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 bg-islamic pb-28">
        <div className="max-w-3xl mx-auto">
          <StatusChecker />
          
          {/* Re-registration guides */}
          <div className="mt-16 bg-white p-6 md:p-8 rounded-[2.5rem] border border-secondary/10 shadow-sm space-y-6">
            <div className="flex items-center space-x-3 text-primary">
              <GraduationCap size={24} className="text-secondary" />
              <h4 className="font-serif font-bold text-xl">Panduan & Syarat Daftar Ulang</h4>
            </div>
            
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-sans">
              <p>
                Jika status pendaftaran putra-putri Anda dinyatakan <strong>&quot;DITERIMA&quot;</strong>, mohon persiapkan dokumen-dokumen fisik berikut untuk dibawa ke sekretariat yayasan:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Fotokopi Kartu Keluarga (KK) - 1 lembar</li>
                <li>Fotokopi Akta Kelahiran Anak - 1 lembar</li>
                <li>Pas Foto ukuran 3x4 (latar belakang merah/biru) - 2 lembar</li>
                <li>Map kertas hijau (untuk DTA) atau kuning (untuk Tahfidz)</li>
              </ul>
              <p className="text-xs text-gray-400 italic pt-2">
                * Jam pelayanan sekretariat pendaftaran ulang dibuka setiap hari setelah ibadah sholat Maghrib s/d Isya di ruang administrasi Masjid Nurul Iman Karawang.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
