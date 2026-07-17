"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { studentGenderLabels } from "@/lib/student-registration";

const programOptions = [
  "DTA Nurul Iman",
  "Tahfidz Al-Qur'an",
  "Baca Tulis Al-Qur'an",
  "Kelas Persiapan Iqra",
];

function getFormValue(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

export default function StudentRegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const maxBirthDate = new Date().toISOString().split("T")[0];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      studentName: getFormValue(formData, "studentName"),
      nickname: getFormValue(formData, "nickname"),
      gender: getFormValue(formData, "gender"),
      birthPlace: getFormValue(formData, "birthPlace"),
      birthDate: getFormValue(formData, "birthDate"),
      schoolOrigin: getFormValue(formData, "schoolOrigin"),
      currentGrade: getFormValue(formData, "currentGrade"),
      program: getFormValue(formData, "program"),
      parentName: getFormValue(formData, "parentName"),
      parentPhone: getFormValue(formData, "parentPhone"),
      parentEmail: getFormValue(formData, "parentEmail"),
      address: getFormValue(formData, "address"),
      notes: getFormValue(formData, "notes"),
      consent: formData.get("consent") === "on",
      website: getFormValue(formData, "website"),
    };

    try {
      const response = await fetch("/api/student-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengirim pendaftaran");
      }

      setSuccess(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-3xl border border-secondary/10 bg-white p-8 text-center shadow-xl shadow-primary/5 sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 size={46} />
        </div>
        <h2 className="mt-6 text-3xl font-serif font-bold text-primary">Pendaftaran Terkirim</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
          Data calon siswa sudah masuk ke sistem. Panitia penerimaan siswa baru akan menghubungi wali melalui nomor WhatsApp yang didaftarkan.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-8 rounded-2xl bg-secondary px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-secondary/90"
        >
          Daftarkan siswa lain
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-secondary/10 bg-white p-6 shadow-xl shadow-primary/5 sm:p-8 lg:p-10">
      <input
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-8">
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
              <UserRound size={22} />
            </span>
            <div>
              <h2 className="text-xl font-serif font-bold text-primary">Data Calon Siswa</h2>
              <p className="text-sm text-gray-500">Isi sesuai data anak yang akan mengikuti pembelajaran.</p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-bold text-primary">Nama Lengkap</span>
              <input
                name="studentName"
                type="text"
                required
                maxLength={120}
                autoComplete="name"
                className="w-full rounded-2xl border border-secondary/10 bg-light px-5 py-4 outline-none transition-colors focus:border-secondary"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-bold text-primary">Nama Panggilan</span>
              <input
                name="nickname"
                type="text"
                maxLength={60}
                className="w-full rounded-2xl border border-secondary/10 bg-light px-5 py-4 outline-none transition-colors focus:border-secondary"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-bold text-primary">Jenis Kelamin</span>
              <select
                name="gender"
                required
                defaultValue=""
                className="w-full rounded-2xl border border-secondary/10 bg-light px-5 py-4 outline-none transition-colors focus:border-secondary"
              >
                <option value="" disabled>
                  Pilih jenis kelamin
                </option>
                <option value="MALE">{studentGenderLabels.MALE}</option>
                <option value="FEMALE">{studentGenderLabels.FEMALE}</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-bold text-primary">Tanggal Lahir</span>
              <input
                name="birthDate"
                type="date"
                required
                min="1990-01-01"
                max={maxBirthDate}
                className="w-full rounded-2xl border border-secondary/10 bg-light px-5 py-4 outline-none transition-colors focus:border-secondary"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-bold text-primary">Tempat Lahir</span>
              <input
                name="birthPlace"
                type="text"
                required
                maxLength={80}
                className="w-full rounded-2xl border border-secondary/10 bg-light px-5 py-4 outline-none transition-colors focus:border-secondary"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-bold text-primary">Program Pilihan</span>
              <select
                name="program"
                required
                defaultValue="DTA Nurul Iman"
                className="w-full rounded-2xl border border-secondary/10 bg-light px-5 py-4 outline-none transition-colors focus:border-secondary"
              >
                {programOptions.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-bold text-primary">Asal Sekolah</span>
              <input
                name="schoolOrigin"
                type="text"
                maxLength={120}
                className="w-full rounded-2xl border border-secondary/10 bg-light px-5 py-4 outline-none transition-colors focus:border-secondary"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-bold text-primary">Kelas Saat Ini</span>
              <input
                name="currentGrade"
                type="text"
                maxLength={40}
                placeholder="Contoh: 2 SD"
                className="w-full rounded-2xl border border-secondary/10 bg-light px-5 py-4 outline-none transition-colors focus:border-secondary"
              />
            </label>
          </div>
        </section>

        <section className="space-y-5 border-t border-secondary/10 pt-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <UsersRound size={22} />
            </span>
            <div>
              <h2 className="text-xl font-serif font-bold text-primary">Data Orang Tua/Wali</h2>
              <p className="text-sm text-gray-500">Kontak ini digunakan panitia untuk verifikasi lanjutan.</p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-bold text-primary">Nama Orang Tua/Wali</span>
              <input
                name="parentName"
                type="text"
                required
                maxLength={120}
                autoComplete="name"
                className="w-full rounded-2xl border border-secondary/10 bg-light px-5 py-4 outline-none transition-colors focus:border-secondary"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-bold text-primary">Nomor WhatsApp</span>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="parentPhone"
                  type="tel"
                  required
                  maxLength={20}
                  autoComplete="tel"
                  className="w-full rounded-2xl border border-secondary/10 bg-light py-4 pl-12 pr-5 outline-none transition-colors focus:border-secondary"
                />
              </div>
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-bold text-primary">Email Orang Tua/Wali</span>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="parentEmail"
                  type="email"
                  maxLength={120}
                  autoComplete="email"
                  className="w-full rounded-2xl border border-secondary/10 bg-light py-4 pl-12 pr-5 outline-none transition-colors focus:border-secondary"
                />
              </div>
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-bold text-primary">Alamat Domisili</span>
              <div className="relative">
                <MapPin className="absolute left-4 top-5 text-gray-400" size={18} />
                <textarea
                  name="address"
                  rows={4}
                  required
                  maxLength={500}
                  className="w-full resize-none rounded-2xl border border-secondary/10 bg-light py-4 pl-12 pr-5 outline-none transition-colors focus:border-secondary"
                />
              </div>
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-bold text-primary">Catatan Tambahan</span>
              <textarea
                name="notes"
                rows={4}
                maxLength={700}
                placeholder="Contoh: jadwal yang diharapkan, kemampuan mengaji saat ini, atau kebutuhan khusus anak."
                className="w-full resize-none rounded-2xl border border-secondary/10 bg-light px-5 py-4 outline-none transition-colors focus:border-secondary"
              />
            </label>
          </div>
        </section>

        <div className="rounded-2xl border border-primary/10 bg-primary/[0.03] p-4">
          <label className="flex items-start gap-3">
            <input
              name="consent"
              type="checkbox"
              required
              className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-secondary"
            />
            <span className="text-sm leading-6 text-gray-600">
              Saya menyetujui data ini digunakan oleh Yayasan Nurul Iman untuk proses pendaftaran, verifikasi, dan komunikasi penerimaan siswa baru.
            </span>
          </label>
        </div>

        {error && (
          <p className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
            <ShieldCheck size={16} className="text-primary" />
            <span>Data tersimpan di area admin dan tidak dipublikasikan.</span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-secondary px-7 py-4 text-sm font-bold text-primary shadow-lg shadow-secondary/20 transition-all hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? <Loader2 size={19} className="animate-spin" /> : <Send size={19} />}
            <span>{loading ? "Mengirim..." : "Kirim Pendaftaran"}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
