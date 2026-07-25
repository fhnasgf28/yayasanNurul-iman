"use client";

import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  Download,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Printer,
  Users,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  ALUR_PPDB,
  GELOMBANG_LIST,
  SYARAT_PPDB,
  STATS_PPDB,
} from "@/lib/ppdb-data";

export default function PPDBInfographic() {
  return (
    <div className="space-y-12 my-8">
      {/* --- INFOGRAPHIC BANNER CARD --- */}
      <div className="bg-gradient-to-r from-primary via-primary/95 to-emerald-950 rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 text-center md:text-left">
            <span className="bg-secondary text-primary font-bold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow">
              <Sparkles size={14} /> Infografis Alur & Syarat Pendaftaran
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold">
              Informasi Penerimaan Santri Baru TA 2026/2027
            </h2>
            <p className="text-white/80 text-xs md:text-sm max-w-2xl leading-relaxed">
              Panduan lengkap alur pendaftaran, jadwal gelombang, persyaratan berkas, dan info fasilitas Beasiswa Yatim 100%.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/pendaftaran-siswa/brosur?download=true"
              target="_blank"
              className="w-full sm:w-auto bg-secondary text-primary font-bold text-xs px-5 py-3 rounded-2xl hover:bg-secondary/90 transition shadow-lg flex items-center justify-center gap-2"
            >
              <Download size={16} /> Unduh PDF Brosur Infografis
            </Link>
            <Link
              href="/pendaftaran-siswa/brosur"
              className="w-full sm:w-auto bg-white/10 border border-white/20 text-white font-bold text-xs px-5 py-3 rounded-2xl hover:bg-white/20 transition flex items-center justify-center gap-2"
            >
              <FileText size={16} /> Tampilan Brosur A4
            </Link>
          </div>
        </div>
      </div>

      {/* --- STATS COUNTER GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS_PPDB.map((st, i) => (
          <div
            key={i}
            className="bg-white border border-secondary/20 rounded-3xl p-5 text-center shadow-md space-y-1 hover:shadow-lg transition"
          >
            <span className="text-2xl md:text-3xl font-serif font-bold text-primary block">
              {st.angka}
            </span>
            <span className="text-xs font-bold text-secondary block">
              {st.label}
            </span>
            <span className="text-[10px] text-gray-500 block">
              {st.deskripsi}
            </span>
          </div>
        ))}
      </div>

      {/* --- 4 LANGKAH ALUR PENDAFTARAN (VISUAL STEPPER) --- */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/15 px-3 py-1 rounded-full">
            Alur Pendaftaran 4 Langkah
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary">
            Cara Mendaftar Santri DTA Nurul Iman
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ALUR_PPDB.map((step) => (
            <motion.div
              key={step.nomor}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: step.nomor * 0.05 }}
              className="bg-white border border-secondary/20 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all space-y-3 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary text-secondary font-serif font-bold text-xl flex items-center justify-center shadow-md">
                0{step.nomor}
              </div>
              <h4 className="font-serif font-bold text-lg text-primary leading-snug">
                {step.judul}
              </h4>
              <span className="text-xs font-bold text-secondary block">
                {step.subjudul}
              </span>
              <p className="text-xs text-gray-600 leading-relaxed">
                {step.deskripsi}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- GELOMBANG & CHECK-LIST SYARAT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gelombang PPDB Card */}
        <div className="bg-white border border-secondary/20 rounded-3xl p-6 md:p-8 shadow-md space-y-4">
          <h4 className="text-xl font-serif font-bold text-primary flex items-center gap-2 border-b pb-3">
            <Calendar size={20} className="text-secondary" /> Jadwal Gelombang PPDB
          </h4>

          <div className="space-y-3">
            {GELOMBANG_LIST.map((g, idx) => (
              <div
                key={idx}
                className="bg-[#FDFAF4] border border-secondary/20 rounded-2xl p-4 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-primary">{g.gelombang}</span>
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
                <p className="text-xs text-gray-700 font-semibold">
                  Periode: {g.periode} (Kuota: {g.kuota})
                </p>
                <p className="text-xs text-emerald-700 italic">✨ {g.catatan}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Syarat Dokumen Card */}
        <div className="bg-white border border-secondary/20 rounded-3xl p-6 md:p-8 shadow-md space-y-4">
          <h4 className="text-xl font-serif font-bold text-primary flex items-center gap-2 border-b pb-3">
            <ShieldCheck size={20} className="text-secondary" /> Dokumen & Syarat Pendaftaran
          </h4>

          <div className="space-y-3">
            {SYARAT_PPDB.map((s, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-2">
                <span className="text-xs font-bold text-primary block uppercase tracking-wider">
                  {s.kategori}
                </span>
                <ul className="space-y-1 text-xs text-gray-600">
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
    </div>
  );
}
