"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

export default function CreatePrestasiPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    caption: "",
    imageUrl: "",
    badge: "Prestasi",
    order: 0,
    active: true,
  });

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) { setError("Judul wajib diisi"); return; }
    if (!form.caption) { setError("Keterangan wajib diisi"); return; }
    if (!form.imageUrl) { setError("URL foto wajib diisi"); return; }
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/prestasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Gagal menyimpan");
      router.push("/dashboard/prestasi");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard/prestasi"
            className="p-2 bg-white rounded-xl border border-gray-100 text-gray-400 hover:text-primary transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-bold text-primary">Tambah Prestasi</h1>
            <p className="text-gray-500 text-sm">Tambahkan foto dan keterangan prestasi santri.</p>
          </div>
        </div>
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-md disabled:opacity-60"
        >
          <Save size={16} />
          <span>{isLoading ? "Menyimpan..." : "Simpan"}</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm">{error}</div>
      )}

      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-primary">Judul Prestasi</label>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Contoh: Juara 1 Lomba Tahfidz Tingkat Kecamatan"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-5 outline-none focus:border-primary/40 transition-colors text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-primary">Keterangan</label>
            <textarea
              value={form.caption}
              onChange={(e) => set("caption", e.target.value)}
              rows={4}
              placeholder="Deskripsi singkat prestasi ini..."
              className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-5 outline-none focus:border-primary/40 transition-colors resize-none text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Badge / Label</label>
              <input
                value={form.badge}
                onChange={(e) => set("badge", e.target.value)}
                placeholder="Prestasi"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-5 outline-none focus:border-primary/40 transition-colors text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Urutan Tampil</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => set("order", Number(e.target.value))}
                min={0}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-5 outline-none focus:border-primary/40 transition-colors text-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <ImageUploader
              value={form.imageUrl || null}
              onChange={(url) => set("imageUrl", url ?? "")}
              label="Foto Prestasi"
            />

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <span className="text-sm font-bold text-primary">Tampilkan di Slider</span>
                <p className="text-xs text-gray-400 mt-0.5">Foto langsung tampil di halaman depan</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => set("active", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
