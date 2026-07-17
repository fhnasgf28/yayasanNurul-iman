"use client";

import { useState } from "react";
import { Search, Loader2, Calendar, BookOpen, GraduationCap, AlertCircle, CheckCircle, Clock, XCircle, ShieldAlert } from "lucide-react";

type RegistrationResult = {
  id: string;
  studentName: string;
  program: string;
  status: "NEW" | "CONTACTED" | "ACCEPTED" | "REJECTED";
  submittedAt: string;
};

export default function StatusChecker() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<RegistrationResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`/api/student-registrations/check?q=${encodeURIComponent(trimmed)}`);
      
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message || "Gagal melakukan pencarian.");
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusDetails = (status: RegistrationResult["status"]) => {
    switch (status) {
      case "NEW":
        return {
          label: "Belum Ditinjau",
          color: "bg-blue-50 text-blue-700 border-blue-200",
          icon: Clock,
          info: "Berkas Anda telah diterima sistem dan sedang mengantre untuk ditinjau oleh panitia penerimaan santri baru.",
        };
      case "CONTACTED":
        return {
          label: "Sedang Dihubungi",
          color: "bg-amber-50 text-amber-700 border-amber-200",
          icon: AlertCircle,
          info: "Panitia sedang memproses berkas Anda. Mohon aktifkan nomor telepon/WhatsApp Anda untuk proses konfirmasi lanjutan.",
        };
      case "ACCEPTED":
        return {
          label: "DITERIMA",
          color: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: CheckCircle,
          info: "Selamat! Santri dinyatakan DITERIMA. Silakan datang ke sekretariat yayasan pada jam operasional (ba'da Maghrib) untuk proses daftar ulang.",
        };
      case "REJECTED":
        return {
          label: "Belum Diterima / Berkas Kurang",
          color: "bg-rose-50 text-rose-700 border-rose-200",
          icon: XCircle,
          info: "Mohon maaf, pendaftaran belum dapat diterima karena berkas tidak memenuhi syarat atau kuota kelas sudah penuh.",
        };
    }
  };

  return (
    <div className="space-y-10">
      {/* Search Box Card */}
      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-secondary/15 shadow-sm">
        <form onSubmit={handleSearch} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="identifier" className="block text-sm font-bold text-primary">
              Masukkan Nomor HP atau Email Orang Tua
            </label>
            <p className="text-xs text-gray-500 font-sans">
              Gunakan nomor HP (WhatsApp) atau alamat email yang Anda isi pada formulir saat mendaftar.
            </p>
            <div className="relative mt-2 rounded-2xl shadow-sm">
              <input
                id="identifier"
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Contoh: 081234567890 atau email@anda.com"
                className="w-full bg-light border border-secondary/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-secondary transition-colors font-sans text-base"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Search size={18} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-primary/95 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Search size={18} />
            )}
            <span>{loading ? "Mencari data..." : "Cek Status Sekarang"}</span>
          </button>
        </form>
      </div>

      {/* Results Display */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 size={36} className="text-secondary animate-spin" />
          <p className="text-sm text-gray-500 font-sans">Menghubungkan ke database yayasan...</p>
        </div>
      )}

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-6 rounded-3xl flex items-start space-x-4">
          <ShieldAlert size={24} className="text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold font-serif text-lg">Pencarian Gagal</h4>
            <p className="text-sm mt-1 leading-relaxed font-sans">{error}</p>
          </div>
        </div>
      )}

      {results !== null && !loading && (
        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-bold text-primary px-2">
            Hasil Pencarian ({results.length} Pendaftaran)
          </h3>

          {results.length === 0 ? (
            <div className="bg-amber-50 border border-amber-200 text-amber-900 p-6 rounded-3xl flex items-start space-x-4">
              <AlertCircle size={24} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold font-serif text-lg">Data Tidak Ditemukan</h4>
                <p className="text-sm mt-1 leading-relaxed font-sans">
                  Tidak ditemukan data pendaftaran santri baru dengan kata kunci <strong>&quot;{query}&quot;</strong>. 
                  Pastikan ejaan email atau nomor HP sama persis seperti yang Anda masukkan pada saat pendaftaran online.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {results.map((reg) => {
                const details = getStatusDetails(reg.status);
                const StatusIcon = details.icon;
                const submittedDate = new Date(reg.submittedAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });

                return (
                  <article
                    key={reg.id}
                    className="bg-white rounded-[2.5rem] border border-secondary/10 p-6 md:p-8 shadow-sm space-y-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-5">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                          <GraduationCap size={24} />
                        </div>
                        <div>
                          <h4 className="text-xl font-serif font-bold text-primary">{reg.studentName}</h4>
                          <p className="text-xs text-gray-500 flex items-center gap-1 font-sans mt-1">
                            <BookOpen size={12} />
                            <span>Program: {reg.program}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${details.color}`}>
                          <StatusIcon size={14} />
                          {details.label}
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-[1.5fr_0.5fr] items-end">
                      <div className="space-y-2 text-sm text-gray-600 leading-relaxed font-sans">
                        <p className="font-semibold text-gray-800">Catatan Status Pendaftaran:</p>
                        <p>{details.info}</p>
                      </div>

                      <div className="text-right text-xs text-gray-400 font-sans flex items-center justify-end gap-1.5 md:block">
                        <span className="block md:inline">Terdaftar:</span>
                        <span className="inline-flex items-center gap-1 font-medium text-gray-600 md:mt-1">
                          <Calendar size={12} />
                          {submittedDate}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
