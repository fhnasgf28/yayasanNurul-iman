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
  { header: "Judul Program", accessor: "title" },
  { header: "Kategori", accessor: "category" },
  {
    header: "Status",
    accessor: "status",
    render: (value: string) => (
      <span
        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          value === "ACTIVE"
            ? "bg-green-100 text-green-600"
            : value === "DRAFT"
            ? "bg-gray-100 text-gray-500"
            : "bg-blue-100 text-blue-600"
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    header: "Dibuat",
    accessor: "createdAt",
    render: (value: string) => formatDate(value),
  },
];

export default function AdminProgramsPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchPrograms = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/programs");
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
    fetchPrograms();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus program ini?")) {
      try {
        const response = await fetch(`/api/programs/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Program berhasil dihapus");
          fetchPrograms();
          router.refresh();
        } else {
          alert("Gagal menghapus program");
        }
      } catch (error) {
        alert("Terjadi kesalahan saat menghapus program");
      }
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Memuat data program...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-primary">Kelola Program</h1>
        <p className="text-gray-500">Daftar semua program yayasan yang ditampilkan di website.</p>
      </div>

      <DataTable
        title="Daftar Program"
        columns={columns}
        data={data}
        createHref="/dashboard/programs"
        onDelete={handleDelete}
      />
    </div>
  );
}
