import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, GraduationCap, ShieldCheck } from "lucide-react";
import StudentRegistrationForm from "@/components/public/StudentRegistrationForm";

export const metadata: Metadata = {
  title: "Pendaftaran Siswa Baru",
  description: "Form pendaftaran siswa baru DTA, Tahfidz, dan kelas baca tulis Al-Qur'an Yayasan Nurul Iman.",
};

export default function StudentRegistrationPage() {
  return (
    <main className="pt-20">
      <section className="relative overflow-hidden bg-primary px-6 py-20 text-white sm:py-24">
        <Image
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop"
          alt="Anak-anak belajar di kelas"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/82 to-primary/72" />
        <div className="absolute inset-0 bg-islamic opacity-20" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary backdrop-blur">
              <GraduationCap size={16} />
              Penerimaan Siswa Baru
            </div>
            <h1 className="text-4xl font-serif font-bold leading-tight sm:text-5xl lg:text-6xl">
              Pendaftaran Siswa Baru Nurul Iman
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
              Daftarkan putra-putri untuk mengikuti pembelajaran agama, tahfidz, dan baca tulis Al-Qur&apos;an bersama Yayasan Nurul Iman.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur">
                <CalendarDays size={20} className="text-secondary" />
                <span className="text-sm font-semibold text-white/90">Pendaftaran online tersedia setiap hari</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur">
                <ShieldCheck size={20} className="text-secondary" />
                <span className="text-sm font-semibold text-white/90">Data hanya dapat dibuka admin yayasan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-islamic px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <aside className="space-y-6 lg:sticky lg:top-28">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary">Informasi Pendaftaran</h2>
              <p className="mt-3 text-sm leading-7 text-gray-500">
                Panitia akan memeriksa data yang masuk dan menghubungi wali untuk jadwal verifikasi atau wawancara ringan.
              </p>
            </div>

            <div className="grid gap-3">
              {[
                "Isi data calon siswa dan wali dengan lengkap.",
                "Pastikan nomor WhatsApp wali aktif.",
                "Admin akan menindaklanjuti melalui dashboard pendaftaran.",
              ].map((item, index) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-secondary/10 bg-white p-4 shadow-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-sm font-bold text-secondary">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </aside>

          <StudentRegistrationForm />
        </div>
      </section>
    </main>
  );
}
