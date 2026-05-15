"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import { slugify } from "@/lib/utils";
import { useRouter } from "next/navigation";

const newsSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  slug: z.string().min(5, "Slug minimal 5 karakter"),
  excerpt: z.string().min(20, "Ringkasan minimal 20 karakter"),
  content: z.string().min(50, "Konten berita minimal 50 karakter"),
  category: z.string().min(1, "Pilih kategori"),
  tags: z.any().optional(),
  published: z.boolean().default(false),
  thumbnail: z.string().nullable(),
});

type NewsFormValues = z.infer<typeof newsSchema>;

export default function CreateNewsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: { published: false, thumbnail: null },
  });

  const onSubmit = async (data: NewsFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Gagal menyimpan berita");

      router.push("/dashboard/news");
      router.refresh();
    } catch {
      alert("Terjadi kesalahan saat menyimpan berita");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue("title", val);
    setValue("slug", slugify(val));
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard/news"
            className="p-2 bg-white rounded-xl border border-gray-100 text-gray-400 hover:text-primary transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-bold text-primary">Tambah Berita</h1>
            <p className="text-gray-500 text-sm">Buat artikel atau update kegiatan baru.</p>
          </div>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-md disabled:opacity-60"
        >
          <Save size={16} />
          <span>{isLoading ? "Menyimpan..." : "Simpan Berita"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Judul Berita</label>
              <input
                {...register("title")}
                onChange={handleTitleChange}
                placeholder="Masukkan judul berita..."
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-5 outline-none focus:border-primary/40 transition-colors text-sm"
              />
              {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Slug (URL)</label>
              <input
                {...register("slug")}
                className="w-full bg-gray-100 border border-gray-100 rounded-xl py-3.5 px-5 text-gray-400 text-sm outline-none"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Ringkasan</label>
              <textarea
                {...register("excerpt")}
                rows={3}
                placeholder="Ringkasan singkat berita..."
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-5 outline-none focus:border-primary/40 transition-colors resize-none text-sm"
              />
              {errors.excerpt && <p className="text-xs text-red-500">{errors.excerpt.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Isi Berita</label>
              <RichTextEditor
                content={watch("content") || ""}
                onChange={(html) => setValue("content", html)}
              />
              {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <ImageUploader
              value={watch("thumbnail")}
              onChange={(url) => setValue("thumbnail", url)}
              label="Featured Image"
            />

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Kategori</label>
              <select
                {...register("category")}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-4 outline-none focus:border-primary/40 transition-colors text-sm appearance-none"
              >
                <option value="">Pilih kategori...</option>
                <option value="Kegiatan Masjid">Kegiatan Masjid</option>
                <option value="DTA">DTA</option>
                <option value="Sosial">Sosial</option>
              </select>
              {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Tag (pisah dengan koma)</label>
              <input
                {...register("tags")}
                placeholder="masjid, kegiatan, ramadhan"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-5 outline-none focus:border-primary/40 transition-colors text-sm"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <span className="text-sm font-bold text-primary">Terbitkan Sekarang</span>
                <p className="text-xs text-gray-400 mt-0.5">Berita langsung tampil di website</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" {...register("published")} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
