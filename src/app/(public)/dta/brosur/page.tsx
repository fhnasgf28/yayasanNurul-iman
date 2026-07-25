"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  MapPin,
  Globe,
  Printer,
  Download,
  ArrowLeft,
  Sparkles,
  Award,
  Loader2,
  FileCheck,
} from "lucide-react";
import {
  MATA_PELAJARAN_LIST,
  TARGET_HAFALAN_LIST,
} from "@/lib/dta-data";
import { generateBrochurePDF } from "@/lib/pdf-generator";

export default function BrosurDTA() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const searchParams = useSearchParams();

  // Auto trigger download if URL has ?download=true
  useEffect(() => {
    if (searchParams.get("download") === "true") {
      const timer = setTimeout(() => {
        handleDownloadPDF();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);

    const success = await generateBrochurePDF(
      "brosur-container",
      "Brosur-DTA-Nurul-Iman-2026.pdf"
    );

    setIsDownloading(false);
    if (success) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 pt-28 md:pt-36 pb-12 px-4 print:bg-white print:p-0 print:m-0">
      {/* Top Action Bar (Hidden when Printing) */}
      <div className="max-w-4xl mx-auto mb-8 bg-white border border-secondary/20 rounded-2xl p-4 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 relative z-30 print:hidden">
        <Link
          href="/dta"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition"
        >
          <ArrowLeft size={18} /> Kembali ke Portal DTA
        </Link>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex-1 sm:flex-initial bg-secondary text-primary px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-secondary/90 transition shadow-md disabled:opacity-50"
          >
            {isDownloading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Menyiapkan PDF...
              </>
            ) : downloadSuccess ? (
              <>
                <FileCheck size={16} className="text-emerald-700" /> PDF Tersimpan!
              </>
            ) : (
              <>
                <Download size={16} /> Unduh PDF Ke Perangkat
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="bg-primary text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/90 transition shadow-md"
            title="Cetak Brosur"
          >
            <Printer size={16} /> Cetak
          </button>
        </div>
      </div>

      {/* --- A4 PROSURE CONTAINER --- */}
      <div
        id="brosur-container"
        className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-2xl rounded-3xl overflow-hidden print:shadow-none print:border-none print:rounded-none print:w-full"
      >
        {/* BROCHURE HEADER */}
        <header className="bg-gradient-to-r from-[#1A4D2E] via-[#163e25] to-[#0f2c1a] text-white p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C8963E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            {/* Yayasan Brand & Identity */}
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-[#C8963E]">
                <GraduationCap size={16} /> BROSUR RESMI PENDAFTARAN SANTRI BARU
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-wide">
                DTA NURUL IMAN
              </h1>
              <p className="text-xs md:text-sm text-emerald-100 font-medium">
                Diniyah Takmiliyah Awaliyah • Yayasan Pembangunan Nurul Iman
              </p>
              <p className="font-arabic text-xl text-[#C8963E] pt-1">
                مَن سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ
              </p>
            </div>

            {/* Badge Highlight */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center space-y-1 shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8963E] block">
                Tahun Ajaran
              </span>
              <span className="text-2xl font-bold text-white block">2026 / 2027</span>
              <span className="text-[10px] text-emerald-200 block">Akreditasi & Standar Kemenag</span>
            </div>
          </div>
        </header>

        {/* BROCHURE CONTENT BODY */}
        <div className="p-8 md:p-10 space-y-8 bg-white">
          {/* Section 1: Profil & Keunggulan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <h2 className="text-xl font-serif font-bold text-[#1A4D2E] flex items-center gap-2 border-b border-gray-200 pb-2">
                <Sparkles size={18} className="text-[#C8963E]" /> Profil & Visi Pembinaan
              </h2>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                DTA Nurul Iman adalah lembaga pendidikan keagamaan Islam sore hari untuk anak usia SD/MI (6-12 Tahun). Berfokus pada kelancaran membaca Al-Qur&apos;an (Iqro/Tahsin), pembentukan adab islami, hafalan Juz 30, serta bimbingan praktik shalat dan wudhu harian.
              </p>
            </div>

            <div className="bg-[#FDFAF4] border border-[#C8963E]/30 rounded-2xl p-4 space-y-2">
              <h3 className="text-xs font-bold text-[#1A4D2E] uppercase tracking-wider flex items-center gap-1.5">
                ⏰ Jam Operasional KBM:
              </h3>
              <p className="text-xs text-gray-800 font-bold">
                Senin s/d Jumat
              </p>
              <p className="text-xs text-[#1A4D2E] font-medium">
                Pukul 14.30 - 17.00 WIB
              </p>
              <span className="text-[10px] text-gray-500 block pt-1">
                *Sepulang sekolah formal SD/MI
              </span>
            </div>
          </div>

          {/* Section 2: Kurikulum & Mata Pelajaran */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-[#1A4D2E] flex items-center gap-2 border-b border-gray-200 pb-2">
              <BookOpen size={18} className="text-[#C8963E]" /> 5 Mata Pelajaran Utama
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {MATA_PELAJARAN_LIST.map((mp) => (
                <div key={mp.id} className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#1A4D2E] bg-emerald-100 px-2 py-0.5 rounded">
                      {mp.alokasiJam}
                    </span>
                    <span className="font-arabic text-sm text-[#1A4D2E] font-bold">{mp.arab}</span>
                  </div>
                  <h4 className="font-bold text-xs text-gray-900">{mp.nama}</h4>
                  <p className="text-[11px] text-gray-600 leading-snug">{mp.deskripsi}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Target Hafalan Juz 30 Per Kelas */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-[#1A4D2E] flex items-center gap-2 border-b border-gray-200 pb-2">
              <Award size={18} className="text-[#C8963E]" /> Target Hafalan Per Kelas (Juz 30)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TARGET_HAFALAN_LIST.map((th) => (
                <div key={th.kelas} className="bg-[#FDFAF4] border border-[#C8963E]/20 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-1.5">
                    <span className="font-bold text-xs text-[#1A4D2E]">{th.kelas} ({th.tingkat})</span>
                    <span className="text-[10px] font-bold text-[#C8963E] bg-[#C8963E]/10 px-2 py-0.5 rounded">
                      Target Graduasi
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-800 font-semibold">
                    <span className="text-gray-500 font-normal">Surah:</span> {th.surahTarget.join(", ")}
                  </div>
                  <div className="text-[10px] text-emerald-800">
                    • Doa: {th.doaTarget.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Syarat Pendaftaran & Beasiswa */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-emerald-50/60 border border-emerald-200/60 rounded-3xl p-6">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#1A4D2E] flex items-center gap-2 uppercase tracking-wider">
                <CheckCircle2 size={16} className="text-emerald-600" /> Dokumen Syarat Pendaftaran:
              </h3>
              <ul className="text-xs text-gray-700 space-y-1.5 pl-2">
                <li className="flex items-center gap-1.5">• 1. Fotokopi Kartu Keluarga (KK) - 2 lembar</li>
                <li className="flex items-center gap-1.5">• 2. Fotokopi Akta Kelahiran Anak - 2 lembar</li>
                <li className="flex items-center gap-1.5">• 3. Pasfoto Santri 3x4 berwarna (2 lembar)</li>
                <li className="flex items-center gap-1.5">• 4. Mengisi Formulir Pendaftaran Online / Offline</li>
              </ul>
            </div>

            <div className="space-y-3 bg-white p-4 rounded-2xl border border-emerald-200">
              <h3 className="text-sm font-bold text-[#1A4D2E] uppercase tracking-wider">
                🎁 Program Beasiswa Yatim & Dhuafa:
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed">
                Yayasan Nurul Iman menyediakan fasilitas <strong>BEBAS SPP 100%</strong> bagi anak yatim piatu dan santri dari keluarga dhuafa yang didanai penuh dari amanah zakat & infaq jamaah.
              </p>
            </div>
          </div>

          {/* Section 5: Footer & Kontak Resmi */}
          <div className="pt-4 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <div className="space-y-1 text-center md:text-left">
              <p className="font-bold text-[#1A4D2E] flex items-center gap-1.5 justify-center md:justify-start">
                <MapPin size={14} /> Sekretariat DTA Nurul Iman:
              </p>
              <p>Jl. Masjid Nurul Iman, Bandung, Jawa Barat</p>
            </div>

            <div className="space-y-1 text-center md:text-right">
              <p className="font-bold text-[#1A4D2E] flex items-center gap-1.5 justify-center md:justify-end">
                <Globe size={14} /> Pendaftaran Online Website:
              </p>
              <p className="text-[#1A4D2E] font-semibold">
                https://yayasannuruliman.clipperyt.online/pendaftaran-siswa
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
