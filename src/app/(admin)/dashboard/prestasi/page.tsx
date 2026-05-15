"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/DataTable";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

const columns = [
  {
    header: "Foto",
    accessor: "imageUrl",
    render: (v: string) => (
      <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-gray-100">
        {v ? <Image src={v} alt="" fill className="object-cover" /> : <div className="bg-gray-100 w-full h-full" />}
      </div>
    ),
  },
  { header: "Judul", accessor: "title" },
  { header: "Badge", accessor: "badge" },
  { header: "Urutan", accessor: "order" },
  {
    header: "Status",
    accessor: "active",
    render: (v: boolean) => (
      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${v ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
        {v ? "Aktif" : "Nonaktif"}
      </span>
    ),
  },
  { header: "Dibuat", accessor: "createdAt", render: (v: string) => formatDate(v) },
];

export default function AdminPrestasiPage() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetch_ = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/prestasi");
      if (res.ok) setData(await res.json());
    } finally { setIsLoading(false); }
  };

  useEffect(() => { fetch_(); }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/prestasi/${id}`, { method: "DELETE" });
    if (res.ok) { fetch_(); router.refresh(); }
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-primary">Kelola Prestasi</h1>
        <p className="text-gray-500">Foto dan keterangan yang tampil di slider halaman depan.</p>
      </div>
      <DataTable title="Daftar Prestasi" columns={columns} data={data} onDelete={handleDelete} createHref="/dashboard/prestasi" />
    </div>
  );
}
