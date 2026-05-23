"use client";

import { useState, useEffect } from "react";
import DataTable from "@/components/admin/DataTable";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";

const columns = [
  {
    header: "Thumbnail",
    accessor: "thumbnail",
    render: (value: string) => (
      <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
        {value ? (
          <Image src={value} alt="Thumb" fill className="object-cover" />
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

export default function AdminNewsPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScraping, setIsScraping] = useState(false);
  const router = useRouter();

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
        const result = await response.json();
        alert(`Selesai! Berita berhasil ditambahkan.`);
        fetchNews();
      } else {
        alert("Gagal mengambil berita.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengambil berita.");
    } finally {
      setIsScraping(false);
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
          alert("Berita berhasil dihapus");
          fetchNews();
          router.refresh();
        } else {
          alert("Gagal menghapus berita");
        }
      } catch (error) {
        alert("Terjadi kesalahan saat menghapus berita");
      }
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Memuat data berita...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary">Kelola Berita</h1>
          <p className="text-gray-500">Tulis dan kelola artikel atau update kegiatan yayasan.</p>
        </div>
        <button
          onClick={handleScrape}
          disabled={isScraping}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
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

      <DataTable
        title="Daftar Berita"
        columns={columns}
        data={data}
        createHref="/dashboard/news/new"
        onDelete={handleDelete}
      />
    </div>
  );
}
