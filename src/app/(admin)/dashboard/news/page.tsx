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
      <div>
        <h1 className="text-2xl font-serif font-bold text-primary">Kelola Berita</h1>
        <p className="text-gray-500">Tulis dan kelola artikel atau update kegiatan yayasan.</p>
      </div>

      <DataTable
        title="Daftar Berita"
        columns={columns}
        data={data}
        createHref="/dashboard/news"
        onDelete={handleDelete}
      />
    </div>
  );
}
