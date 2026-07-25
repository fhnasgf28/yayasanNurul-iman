import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, GraduationCap, ShieldCheck, Download, FileText } from "lucide-react";
import StudentRegistrationForm from "@/features/student-registration/StudentRegistrationForm";
import PPDBInfographic from "@/components/public/PPDBInfographic";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Pendaftaran Siswa Baru (PPDB)",
  description:
    "Penerimaan Santri Baru DTA Nurul Iman. Form pendaftaran online, infografis alur 4 langkah pendaftaran, syarat berkas, beasiswa yatim 100%, dan jadwal gelombang.",
  path: "/pendaftaran-siswa",
});

export default function StudentRegistrationPage() {
  return (
    <main className="pt-20 bg-[#FDFAF4] min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-primary px-6 py-20 text-white sm:py-24">
        <Image
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop"
          alt="Anak-anak belajar di kelas"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-emerald-950" />
        <div className="absolute inset-0 bg-islamic opacity-20" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary backdrop-blur">
              <GraduationCap size={16} />
              Penerimaan Santri Baru (PPDB) TA 2026/2027
            </div>
            <h1 className="text-4xl font-serif font-bold leading-tight sm:text-5xl lg:text-6xl">
              Pendaftaran Siswa Baru DTA Nurul Iman
            </h1>
            <p className="max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Daftarkan putra-putri Anda untuk mengikuti pembinaan Al-Qur&apos;an, tahfidz Juz 30, dan pembentukan karakter islami bersama Yayasan Nurul Iman.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/pendaftaran-siswa/brosur?download=true"
                target="_blank"
                className="bg-secondary text-primary px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 hover:bg-secondary/90 transition shadow-lg"
              >
                <Download size={16} /> Unduh Brosur Infografis PDF
              </Link>
              <Link
                href="/pendaftaran-siswa/brosur"
                className="bg-white/10 border border-white/20 text-white px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 hover:bg-white/20 transition"
              >
                <FileText size={16} /> Tampilan Infografis A4
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INFOGRAPHIC SECTION */}
      <section className="max-w-7xl mx-auto px-4 pt-6">
        <PPDBInfographic />
      </section>

      {/* FORM & SIDEBAR SECTION */}
      <section className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="bg-gradient-to-br from-primary to-primary/95 p-6 rounded-[2rem] text-white shadow-[0_15px_35px_rgba(26,77,46,0.18)] border border-secondary/20 space-y-4">
              <h3 className="font-serif font-bold text-lg text-secondary">
                Sudah Melakukan Pendaftaran?
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-sans">
                Pantau proses verifikasi berkas dan status penerimaan santri baru secara online.
              </p>
              <Link
                href="/pendaftaran-siswa/status"
                className="inline-flex w-full items-center justify-center bg-secondary text-primary py-3 px-4 rounded-xl text-xs font-bold hover:bg-opacity-95 transition-all shadow"
              >
                Cek Status Pendaftaran Anda →
              </Link>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-primary">Informasi Penting Wali Santri</h2>
              <p className="mt-2 text-xs leading-relaxed text-gray-500">
                Panitia akan memeriksa data pendaftaran dan menghubungi nomor WhatsApp orang tua untuk jadwal tes pemetaan / verifikasi.
              </p>
            </div>

            <div className="grid gap-3">
              {[
                "Isi data calon siswa dan wali dengan lengkap.",
                "Pastikan nomor WhatsApp orang tua/wali aktif.",
                "Simpan Kode Pendaftaran yang didapatkan setelah submit.",
              ].map((item, index) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-secondary/10 bg-white p-4 shadow-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-xs font-bold text-secondary">
                    {index + 1}
                  </span>
                  <p className="text-xs font-medium text-gray-600 self-center">{item}</p>
                </div>
              ))}
            </div>
          </aside>

          {/* Form */}
          <div className="rounded-[2.5rem] border border-secondary/10 bg-white p-6 shadow-xl sm:p-10">
            <div className="mb-8 border-b border-gray-100 pb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                Formulir Pendaftaran Online
              </span>
              <h2 className="mt-1 text-2xl font-serif font-bold text-primary sm:text-3xl">
                Isi Data Calon Santri Baru
              </h2>
              <p className="mt-2 text-xs text-gray-500">
                Lengkapi formulir di bawah ini dengan cermat. Tanda (*) wajib diisi.
              </p>
            </div>

            <StudentRegistrationForm />
          </div>
        </div>
      </section>
    </main>
  );
}
