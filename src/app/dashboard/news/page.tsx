"use client";

import { useState, useEffect } from "react";
import DataTable from "@/components/admin/DataTable";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Trash2, X, AlertTriangle } from "lucide-react";

const columns = [
  {
    header: "Thumbnail",
    accessor: "thumbnail",
    render: (value: string) => (
      <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
        {value ? (
          <img src={value} alt="Thumb" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="bg-gray-100 w-full h-full" />
        )}
      </div>
    ),
  },
  { header: "Judul Berita", accessor: "title" },
  { header: "Kategori", accessor: "category" },
  {
    header: "Status",
    accessor: "published",
    render: (value: boolean) => (
      <span
        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          value ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
        }`}
      >
        {value ? "PUBLISHED" : "DRAFT"}
      </span>
    ),
  },
  {
    header: "Tanggal",
    accessor: "createdAt",
    render: (value: string) => formatDate(value),
  },
];

const DAY_OPTIONS = [
  { label: "7 hari terakhir", value: 7 },
  { label: "14 hari terakhir", value: 14 },
  { label: "30 hari terakhir", value: 30 },
  { label: "60 hari terakhir", value: 60 },
  { label: "90 hari terakhir", value: 90 },
];

export default function AdminNewsPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScraping, setIsScraping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCleanModal, setShowCleanModal] = useState(false);
  const [selectedDays, setSelectedDays] = useState(30);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const router = useRouter();

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/news");
      if (response.ok) {
        const json = await response.json();
        setData(json);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrape = async () => {
    setIsScraping(true);
    try {
      const response = await fetch("/api/news/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: "nasional", limit: 5 }),
      });

      if (response.ok) {
        showToast("success", "Berita berhasil diambil dari NU Online.");
        fetchNews();
      } else {
        showToast("error", "Gagal mengambil berita.");
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Terjadi kesalahan saat mengambil berita.");
    } finally {
      setIsScraping(false);
    }
  };

  const handleBulkDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/news?olderThanDays=${selectedDays}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const result = await res.json();
        showToast("success", result.message);
        fetchNews();
        router.refresh();
      } else {
        showToast("error", "Gagal menghapus berita lama.");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Terjadi kesalahan saat menghapus berita.");
    } finally {
      setIsDeleting(false);
      setShowCleanModal(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      try {
        const response = await fetch(`/api/news/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          showToast("success", "Berita berhasil dihapus.");
          fetchNews();
          router.refresh();
        } else {
          showToast("error", "Gagal menghapus berita.");
        }
      } catch (error) {
        showToast("error", "Terjadi kesalahan saat menghapus berita.");
      }
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Memuat data berita...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl text-sm font-medium transition-all animate-fade-in ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          ) : (
            <X size={16} className="shrink-0" />
          )}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary sm:text-3xl">Kelola Berita</h1>
          <p className="mt-1 text-sm leading-6 text-gray-500 sm:text-base">
            Tulis dan kelola artikel atau update kegiatan yayasan.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 sm:flex-nowrap">
          {/* Hapus Berita Lama */}
          <button
            id="btn-hapus-berita-lama"
            onClick={() => setShowCleanModal(true)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition-all sm:w-auto bg-red-50 text-red-600 hover:bg-red-100 border border-red-100"
          >
            <Trash2 size={16} />
            Hapus Berita Lama
          </button>

          {/* Ambil Berita */}
          <button
            id="btn-ambil-berita"
            onClick={handleScrape}
            disabled={isScraping}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition-all sm:w-auto ${
              isScraping
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-secondary/10 text-secondary hover:bg-secondary/20"
            }`}
          >
            {isScraping ? (
              <>
                <div className="w-4 h-4 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                Mengambil Berita...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Ambil Berita (NU Online)
              </>
            )}
          </button>
        </div>
      </div>

      <DataTable
        title="Daftar Berita"
        columns={columns}
        data={data}
        createHref="/dashboard/news/new"
        onDelete={handleDelete}
      />

      {/* Modal Konfirmasi Hapus Berita Lama */}
      {showCleanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 space-y-6 animate-fade-in">
            {/* Icon */}
            <div className="flex items-center justify-center w-14 h-14 bg-red-50 rounded-2xl mx-auto">
              <AlertTriangle size={28} className="text-red-500" />
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-xl font-serif font-bold text-primary">Hapus Berita Lama</h2>
              <p className="text-sm text-gray-500">
                Pilih rentang waktu. Semua berita yang lebih lama dari batas tersebut akan dihapus permanen.
              </p>
            </div>

            {/* Pilih Hari */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Hapus berita lebih lama dari:
              </label>
              <div className="grid grid-cols-1 gap-2">
                {DAY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    id={`day-option-${opt.value}`}
                    onClick={() => setSelectedDays(opt.value)}
                    className={`flex items-center justify-between px-5 py-3 rounded-xl text-sm font-semibold border transition-all ${
                      selectedDays === opt.value
                        ? "bg-red-600 text-white border-red-600 shadow-md"
                        : "bg-gray-50 text-gray-700 border-gray-100 hover:border-red-200 hover:bg-red-50"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {selectedDays === opt.value && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 text-xs text-amber-700 flex gap-2 items-start">
              <AlertTriangle size={14} className="shrink-0 mt-0.5" />
              <span>
                Berita yang dihapus <strong>tidak dapat dikembalikan</strong>. Pastikan Anda memilih rentang yang benar.
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                id="btn-batal-hapus"
                onClick={() => setShowCleanModal(false)}
                className="flex-1 px-4 py-3 rounded-2xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
              >
                Batal
              </button>
              <button
                id="btn-konfirmasi-hapus"
                onClick={handleBulkDelete}
                disabled={isDeleting}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold text-white transition-all ${
                  isDeleting
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200"
                }`}
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Menghapus...
                  </>
                ) : (
                  <>
                    <Trash2 size={14} />
                    Ya, Hapus Sekarang
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
