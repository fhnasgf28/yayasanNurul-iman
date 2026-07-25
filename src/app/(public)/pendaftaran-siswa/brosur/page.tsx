"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  GraduationCap,
  FileText,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Globe,
  Printer,
  Download,
  ArrowLeft,
  Sparkles,
  Award,
  Users,
  Heart,
  Loader2,
  FileCheck,
  ChevronRight,
} from "lucide-react";
import {
  ALUR_PPDB,
  GELOMBANG_LIST,
  SYARAT_PPDB,
  STATS_PPDB,
} from "@/lib/ppdb-data";
import { generateBrochurePDF } from "@/lib/pdf-generator";

export default function BrosurPPDBPage() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const searchParams = useSearchParams();

  // Auto download if ?download=true
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
      "infografis-ppdb-container",
      "Brosur-PPDB-Nurul-Iman-2026.pdf"
    );

    setIsDownloading(false);
    if (success) {
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 py-8 px-4 print:bg-white print:p-0 print:m-0">
      {/* Top Action Bar (Hidden when printing) */}
      <div className="max-w-5xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <Link
          href="/pendaftaran-siswa"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition"
        >
          <ArrowLeft size={18} /> Kembali ke Form Pendaftaran
        </Link>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex-1 sm:flex-initial bg-secondary text-primary px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-secondary/90 transition shadow-md disabled:opacity-50"
          >
            {isDownloading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Menyiapkan Infografis PDF...
              </>
            ) : downloadSuccess ? (
              <>
                <FileCheck size={16} className="text-emerald-700" /> PDF Infografis Tersimpan!
              </>
            ) : (
              <>
                <Download size={16} /> Unduh Brosur Infografis PDF
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="bg-primary text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/90 transition shadow-md"
            title="Cetak Infografis"
          >
            <Printer size={16} /> Cetak
          </button>
        </div>
      </div>

      {/* --- A4 INFOGRAPHIC BROCHURE CONTAINER --- */}
      <div
        id="infografis-ppdb-container"
        className="max-w-5xl mx-auto bg-white border border-gray-200 shadow-2xl rounded-3xl overflow-hidden print:shadow-none print:border-none print:rounded-none print:w-full"
      >
        {/* INFOGRAPHIC HEADER */}
        <header className="bg-gradient-to-r from-[#1A4D2E] via-[#163e25] to-[#0b2415] text-white p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8963E]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-[#C8963E]">
                <Sparkles size={14} /> INFOGRAFIS RESMI PPDB TA 2026/2027
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-wide">
                DTA NURUL IMAN
              </h1>
              <p className="text-xs md:text-sm text-emerald-100 font-medium">
                Pendidikan Al-Qur&apos;an, Karakter Islami, & Bimbingan Ibadah Anak (Usia 6 - 12 Tahun)
              </p>
              <p className="font-arabic text-xl text-[#C8963E] pt-1">
                وَقُل رَّبِّ زِدْنِي عِلْمًا
              </p>
            </div>

            {/* Quick Registration Badge */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl text-center space-y-2 shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8963E] block">
                Pendaftaran Online
              </span>
              <div className="bg-[#C8963E] text-[#1A4D2E] font-bold text-sm px-4 py-2 rounded-xl shadow">
                GELOMBANG 1 DIBUKA
              </div>
              <span className="text-[10px] text-emerald-200 block font-medium">
                01 Mei - 30 Juni 2026
              </span>
            </div>
          </div>
        </header>

        {/* INFOGRAPHIC BODY */}
        <div className="p-8 md:p-10 space-y-10 bg-white">
          {/* INFOGRAPHIC STATS HIGHLIGHTS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS_PPDB.map((st, i) => (
              <div
                key={i}
                className="bg-[#FDFAF4] border border-[#C8963E]/30 rounded-2xl p-4 text-center space-y-1"
              >
                <span className="text-2xl md:text-3xl font-serif font-bold text-[#1A4D2E] block">
                  {st.angka}
                </span>
                <span className="text-xs font-bold text-[#C8963E] block">
                  {st.label}
                </span>
                <span className="text-[10px] text-gray-500 block">
                  {st.deskripsi}
                </span>
              </div>
            ))}
          </div>

          {/* INFOGRAPHIC SECTION 1: 4-STEP ALUR PENDAFTARAN (STEPPER DIAGRAM) */}
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8963E] bg-[#C8963E]/10 px-3 py-1 rounded-full">
                Panduan Pendaftaran
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#1A4D2E]">
                4 Langkah Mudah Pendaftaran Santri
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ALUR_PPDB.map((step) => (
                <div
                  key={step.nomor}
                  className="bg-gray-50 border border-gray-200 rounded-3xl p-5 space-y-3 relative overflow-hidden"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#1A4D2E] text-[#C8963E] font-serif font-bold text-lg flex items-center justify-center shadow-md">
                    0{step.nomor}
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#1A4D2E] leading-snug">
                    {step.judul}
                  </h3>
                  <span className="text-[10px] font-bold text-[#C8963E] block">
                    {step.subjudul}
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.deskripsi}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* INFOGRAPHIC SECTION 2: GELOMBANG & SYARAT DOKUMEN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gelombang Table */}
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-bold text-[#1A4D2E] flex items-center gap-2 border-b pb-2">
                <Calendar size={18} className="text-[#C8963E]" /> Jadwal Gelombang Pendaftaran
              </h3>

              <div className="space-y-3">
                {GELOMBANG_LIST.map((g, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FDFAF4] border border-[#C8963E]/20 rounded-2xl p-4 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#1A4D2E]">
                        {g.gelombang}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded ${
                          g.status === "Dibuka"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {g.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-700">
                      Periode: {g.periode} (Kuota: {g.kuota})
                    </p>
                    <p className="text-[11px] text-emerald-700 italic">
                      ✨ {g.catatan}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Syarat Dokumen */}
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-bold text-[#1A4D2E] flex items-center gap-2 border-b pb-2">
                <FileText size={18} className="text-[#C8963E]" /> Check-List Persyaratan
              </h3>

              <div className="space-y-3">
                {SYARAT_PPDB.map((s, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2">
                    <span className="text-xs font-bold text-[#1A4D2E] block uppercase tracking-wider">
                      {s.kategori}
                    </span>
                    <ul className="space-y-1 text-xs text-gray-700">
                      {s.item.map((it, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* INFOGRAPHIC SECTION 3: KBM & BEASISWA YATIM */}
          <div className="bg-gradient-to-r from-emerald-900 to-[#1A4D2E] rounded-3xl p-6 text-white space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="bg-[#C8963E] text-[#1A4D2E] font-bold text-[10px] uppercase px-3 py-1 rounded-full">
                  Fasilitas Khusus Yatim & Dhuafa
                </span>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                  Program Beasiswa Santri 100% Bebas SPP
                </h3>
                <p className="text-xs text-white/80 max-w-2xl leading-relaxed">
                  Yayasan Nurul Iman memastikan setiap anak berhak mendapatkan pendidikan agama Al-Qur&apos;an. Seluruh biaya santri yatim dan dhuafa ditanggung penuh oleh dana zakat/infaq yayasan.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0 space-y-1">
                <span className="text-xs font-bold text-[#C8963E] block">Jam Belajar DTA:</span>
                <span className="text-sm font-bold text-white block">Senin - Jumat</span>
                <span className="text-xs text-emerald-200 block">14.30 - 17.00 WIB</span>
              </div>
            </div>
          </div>

          {/* INFOGRAPHIC FOOTER & CTA */}
          <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left text-xs text-gray-600">
              <p className="font-bold text-[#1A4D2E] flex items-center gap-1.5 justify-center md:justify-start">
                <MapPin size={14} /> Sekretariat Pendaftaran DTA Nurul Iman:
              </p>
              <p>Jl. Masjid Nurul Iman, Bandung, Jawa Barat</p>
              <p className="text-[#1A4D2E] font-semibold">
                🌐 https://yayasannuruliman.clipperyt.online/pendaftaran-siswa
              </p>
            </div>

            <div className="flex items-center gap-3 print:hidden">
              <Link
                href="/pendaftaran-siswa"
                className="bg-[#1A4D2E] text-white px-6 py-3 rounded-2xl font-bold text-xs hover:bg-[#153e25] transition shadow-lg flex items-center gap-2"
              >
                Daftar Online Sekarang <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
