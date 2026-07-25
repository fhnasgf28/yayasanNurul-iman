"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Calendar,
  Download,
  HelpCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  UserPlus,
  FileText,
  Share2,
  ChevronDown,
  ChevronUp,
  Award,
  BookMarked,
  Printer,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MATA_PELAJARAN_LIST,
  TARGET_HAFALAN_LIST,
  AGENDA_AKADEMIK_LIST,
  FAQ_DTA_LIST,
} from "@/lib/dta-data";

export default function DTAPortal() {
  const [activeTab, setActiveTab] = useState<"kurikulum" | "kalender" | "download" | "faq">("kurikulum");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [faqSearch, setFaqSearch] = useState("");
  const [selectedKelas, setSelectedKelas] = useState<string>("all");

  // Print Brochure Handler
  const handlePrintBrochure = () => {
    window.print();
  };

  // Share Brochure Link
  const handleShareBrochure = async () => {
    const shareData = {
      title: "Pendaftaran DTA Nurul Iman",
      text: "Informasi Kurikulum & Pendaftaran Santri Baru DTA Nurul Iman. Pendidikan Al-Qur'an & Karakter Islami Anak.",
      url: "https://yayasannuruliman.clipperyt.online/dta",
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("Tautan informasi DTA telah disalin!");
    }
  };

  // Filtered FAQ
  const filteredFaq = FAQ_DTA_LIST.filter(
    (item) =>
      !faqSearch ||
      item.pertanyaan.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.jawaban.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-28 space-y-10">
      {/* --- Main Navigation Tabs --- */}
      <div className="flex items-center justify-center">
        <div className="bg-white border border-secondary/20 p-1.5 rounded-2xl shadow-md flex items-center gap-1.5 overflow-x-auto max-w-full scrollbar-none text-xs md:text-sm font-bold">
          <button
            onClick={() => setActiveTab("kurikulum")}
            className={`px-4 py-3 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === "kurikulum"
                ? "bg-primary text-white shadow"
                : "text-gray-600 hover:text-primary hover:bg-secondary/10"
            }`}
          >
            <BookOpen size={16} /> Kurikulum & Target Hafalan
          </button>
          <button
            onClick={() => setActiveTab("kalender")}
            className={`px-4 py-3 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === "kalender"
                ? "bg-primary text-white shadow"
                : "text-gray-600 hover:text-primary hover:bg-secondary/10"
            }`}
          >
            <Calendar size={16} /> Kalender Akademik
          </button>
          <button
            onClick={() => setActiveTab("download")}
            className={`px-4 py-3 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === "download"
                ? "bg-primary text-white shadow"
                : "text-gray-600 hover:text-primary hover:bg-secondary/10"
            }`}
          >
            <Download size={16} /> Download Brosur PDF
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`px-4 py-3 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === "faq"
                ? "bg-primary text-white shadow"
                : "text-gray-600 hover:text-primary hover:bg-secondary/10"
            }`}
          >
            <HelpCircle size={16} /> FAQ Orang Tua
          </button>
        </div>
      </div>

      {/* --- TAB 1: KURIKULUM & TARGET HAFALAN --- */}
      {activeTab === "kurikulum" && (
        <div className="space-y-12">
          {/* Header Info */}
          <div className="bg-gradient-to-r from-primary via-primary/95 to-emerald-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-secondary text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                <Sparkles size={14} /> Standar Kurikulum Kemenag & Metode Iqro/Tahsin
              </span>
              <h2 className="text-2xl md:text-4xl font-serif font-bold">
                Mata Pelajaran & Target Hafalan Santri
              </h2>
              <p className="text-white/80 text-sm md:text-base max-w-3xl leading-relaxed">
                DTA Nurul Iman memadukan pendidikan Al-Qur'an (Iqro, Tahsin, Munaqosyah Juz 30) dengan pembentukan karakter akhlakul karimah dan ibadah harian santri.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-secondary">
                <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                  <Clock size={14} /> KBM: Senin - Jumat (14.30 - 17.00 WIB)
                </span>
                <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                  <GraduationCap size={14} /> Usia Santri: 6 - 12 Tahun (SD/MI)
                </span>
              </div>
            </div>
          </div>

          {/* Section A: Mata Pelajaran */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-2xl font-serif font-bold text-primary flex items-center gap-2">
                <BookMarked size={22} className="text-secondary" />
                Mata Pelajaran Utama DTA
              </h3>
              <span className="text-xs text-gray-500 font-semibold">5 Bidang Studi</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MATA_PELAJARAN_LIST.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className="bg-white border border-secondary/20 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-xl">
                        {item.alokasiJam}
                      </span>
                      <span className="font-arabic text-xl text-primary/70 font-bold">
                        {item.arab}
                      </span>
                    </div>

                    <h4 className="text-lg font-serif font-bold text-primary">
                      {item.nama}
                    </h4>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.deskripsi}
                    </p>

                    {/* Pokok Bahasan */}
                    <div className="pt-3 border-t border-gray-100 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                        Fokus Pembahasan:
                      </span>
                      {item.pokokBahasan.map((sub, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-gray-700 font-medium">
                          <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                          <span>{sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section B: Target Hafalan Santri Per Kelas */}
          <div className="space-y-6 pt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-3">
              <div>
                <h3 className="text-2xl font-serif font-bold text-primary flex items-center gap-2">
                  <Award size={22} className="text-secondary" />
                  Target Hafalan Per Jenjang Kelas
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Kurikulum hafalan bertahap dari Surah Pendek hingga Lulus Munaqosyah Juz 30.
                </p>
              </div>

              {/* Kelas Filter Buttons */}
              <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setSelectedKelas("all")}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    selectedKelas === "all" ? "bg-primary text-white shadow" : "text-gray-600"
                  }`}
                >
                  Semua Kelas
                </button>
                {TARGET_HAFALAN_LIST.map((th) => (
                  <button
                    key={th.kelas}
                    onClick={() => setSelectedKelas(th.kelas)}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      selectedKelas === th.kelas ? "bg-primary text-white shadow" : "text-gray-600"
                    }`}
                  >
                    {th.kelas}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TARGET_HAFALAN_LIST.filter(
                (th) => selectedKelas === "all" || selectedKelas === th.kelas
              ).map((th, idx) => (
                <motion.div
                  key={th.kelas}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className="bg-white border border-secondary/20 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all space-y-4"
                >
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-primary">
                        {th.kelas}
                      </h4>
                      <span className="text-xs font-semibold text-secondary">
                        Tingkat: {th.tingkat}
                      </span>
                    </div>
                    <span className="w-10 h-10 rounded-2xl bg-secondary/15 text-primary font-bold text-sm flex items-center justify-center">
                      K{idx + 1}
                    </span>
                  </div>

                  {/* Target Surah */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                      <BookOpen size={14} className="text-secondary" />
                      Target Hafalan Surah:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {th.surahTarget.map((s, i) => (
                        <span
                          key={i}
                          className="bg-primary/5 border border-primary/15 text-primary text-xs font-semibold px-2.5 py-1 rounded-lg"
                        >
                          QS. {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Target Doa & Hadits */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-3 space-y-1">
                      <span className="text-[11px] font-bold text-amber-900 block">
                        🤲 Target Doa Harian:
                      </span>
                      <ul className="text-xs text-amber-800 space-y-1">
                        {th.doaTarget.map((d, i) => (
                          <li key={i}>• {d}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-3 space-y-1">
                      <span className="text-[11px] font-bold text-emerald-900 block">
                        📖 Target Hadits Pilihan:
                      </span>
                      <ul className="text-xs text-emerald-800 space-y-1">
                        {th.haditsTarget.map((h, i) => (
                          <li key={i}>• {h}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Catatan Bimbingan */}
                  <div className="bg-gray-50 rounded-2xl p-3 text-xs text-gray-600 font-medium">
                    📌 <strong>Catatan Pengajar:</strong> {th.catatan}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: KALENDER AKADEMIK --- */}
      {activeTab === "kalender" && (
        <div className="space-y-8">
          <div className="bg-white border border-secondary/20 rounded-3xl p-6 md:p-8 shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary text-secondary flex items-center justify-center shrink-0">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-primary">
                  Kalender Akademik DTA TA 2026/2027
                </h3>
                <p className="text-xs text-gray-500">
                  Agenda penting pendaftaran, pembelajaran, ujian munaqosyah, dan wisuda santri DTA Nurul Iman.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative border-l-2 border-primary/20 ml-4 md:ml-6 space-y-6 pt-4">
              {AGENDA_AKADEMIK_LIST.map((ag, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className="relative pl-6 md:pl-8"
                >
                  {/* Timeline Dot */}
                  <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-secondary border-4 border-white shadow-sm" />

                  <div className="bg-white border border-secondary/20 rounded-2xl p-5 shadow-sm space-y-2 hover:shadow-md transition">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-xl">
                        🗓️ {ag.tanggal} {ag.bulan}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                          ag.kategori === "PPDB"
                            ? "bg-amber-100 text-amber-800"
                            : ag.kategori === "Wisuda"
                            ? "bg-emerald-100 text-emerald-800"
                            : ag.kategori === "Ujian"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {ag.kategori}
                      </span>
                    </div>

                    <h4 className="text-lg font-serif font-bold text-primary">
                      {ag.kegiatan}
                    </h4>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {ag.deskripsi}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: DOWNLOAD CENTER & BROSUR PDF --- */}
      {activeTab === "download" && (
        <div className="space-y-8">
          <div className="bg-white border border-secondary/20 rounded-3xl p-6 md:p-8 shadow-lg space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b pb-6">
              <div className="space-y-2">
                <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1 rounded-full inline-flex items-center gap-1">
                  <FileText size={14} /> Dokumen Resmi DTA
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary">
                  Brosur Digital & Panduan Pendaftaran DTA
                </h3>
                <p className="text-xs md:text-sm text-gray-600 max-w-2xl">
                  Unduh brosur resmi, formulir fisik offline, dan panduan akademik DTA Nurul Iman untuk dibagikan kepada keluarga atau calon wali santri.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <Link
                  href="/dta/brosur"
                  target="_blank"
                  className="flex-1 md:flex-initial bg-primary text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/90 transition shadow-md"
                >
                  <Download size={16} /> Unduh Brosur A4 PDF
                </Link>
                <button
                  onClick={handleShareBrochure}
                  className="bg-secondary text-primary px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-secondary/80 transition shadow-md"
                >
                  <Share2 size={16} /> Bagikan Brosur
                </button>
              </div>
            </div>

            {/* Printable Digital Brochure Preview Card */}
            <div className="bg-[#FDFAF4] border-2 border-dashed border-secondary/40 rounded-3xl p-6 md:p-8 space-y-6 print:border-none print:shadow-none">
              <div className="text-center space-y-2 border-b border-secondary/20 pb-4">
                <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                  <GraduationCap size={18} className="text-secondary" />
                  Diniyah Takmiliyah Awaliyah (DTA) Nurul Iman
                </div>
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary">
                  Penerimaan Santri Baru TA 2026/2027
                </h2>
                <p className="text-xs text-gray-600">
                  Jl. Masjid Nurul Iman, Bandung, Jawa Barat | Email: assegaffarhab5@gmail.com
                </p>
              </div>

              {/* Brochure Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-secondary/20 space-y-1">
                  <h5 className="font-bold text-xs text-primary">🌟 Keunggulan Program:</h5>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Pengajar berkualitas, fasilitas nyaman, bimbingan hafalan Juz 30 berijazah munaqosyah.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-secondary/20 space-y-1">
                  <h5 className="font-bold text-xs text-primary">⏰ Waktu Belajar:</h5>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Senin s/d Jumat, Pukul 14.30 - 17.00 WIB (Sepulang sekolah SD/MI).
                  </p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-secondary/20 space-y-1">
                  <h5 className="font-bold text-xs text-primary">🎁 Beasiswa Yatim/Dhuafa:</h5>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Fasilitas Bebas SPP 100% dari dana infaq/zakat Yayasan Nurul Iman.
                  </p>
                </div>
              </div>

              {/* Direct Registration Call */}
              <div className="bg-primary text-white rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h5 className="font-serif font-bold text-lg text-secondary">
                    Daftar Santri Baru Sekarang Secara Online
                  </h5>
                  <p className="text-xs text-white/80">
                    Proses cepat tanpa antre lewat portal resmi yayasan.
                  </p>
                </div>
                <Link
                  href="/pendaftaran-siswa"
                  className="bg-secondary text-primary font-bold text-xs px-6 py-3 rounded-xl hover:bg-secondary/90 transition shrink-0 shadow"
                >
                  Buka Form Pendaftaran Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 4: FAQ ORANG TUA --- */}
      {activeTab === "faq" && (
        <div className="space-y-6">
          {/* FAQ Search Bar */}
          <div className="bg-white border border-secondary/20 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-serif font-bold text-primary flex items-center gap-2">
                  <HelpCircle size={22} className="text-secondary" />
                  Pertanyaan Sering Diajukan (FAQ)
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Jawaban lengkap seputar pendaftaran, biaya, kurikulum, dan fasilitas DTA Nurul Iman.
                </p>
              </div>

              <div className="relative w-full md:w-72">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  placeholder="Cari pertanyaan..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border border-gray-200 outline-none focus:border-primary transition"
                />
              </div>
            </div>
          </div>

          {/* Accordion FAQ List */}
          <div className="space-y-4">
            {filteredFaq.map((faq, idx) => {
              const isOpen = expandedFaq === idx;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  className="bg-white border border-secondary/20 rounded-3xl p-5 md:p-6 shadow-md transition-all overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                        Q{idx + 1}
                      </span>
                      <span className="font-serif font-bold text-base md:text-lg text-primary">
                        {faq.pertanyaan}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-primary shrink-0">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-4 mt-4 border-t border-gray-100 text-xs md:text-sm text-gray-600 leading-relaxed"
                      >
                        <span className="bg-secondary/15 text-primary font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-md inline-block mb-2">
                          Kategori: {faq.kategori}
                        </span>
                        <p>{faq.jawaban}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- Bottom CTA Registration Banner --- */}
      <div className="bg-gradient-to-r from-primary via-primary/95 to-emerald-950 rounded-3xl p-6 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="bg-secondary text-primary font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            Pendaftaran Santri Baru (PPDB)
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-bold">
            Siapkan Generasi Qur'ani Bersama DTA Nurul Iman
          </h3>
          <p className="text-white/80 text-xs md:text-sm max-w-xl">
            Daftarkan putra-putri Anda sekarang. Kuota santri terbatas untuk menjaga kualitas bimbingan tajwid & hafalan.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/pendaftaran-siswa"
            className="bg-secondary text-primary font-bold text-xs md:text-sm px-6 py-3.5 rounded-2xl hover:bg-secondary/90 transition shadow-lg flex items-center gap-2"
          >
            <UserPlus size={18} /> Daftar Online Sekarang
          </Link>
          <Link
            href="/pendaftaran-siswa/status"
            className="bg-white/10 border border-white/20 text-white font-bold text-xs md:text-sm px-5 py-3.5 rounded-2xl hover:bg-white/20 transition"
          >
            Cek Status Pendaftaran
          </Link>
        </div>
      </div>
    </div>
  );
}
