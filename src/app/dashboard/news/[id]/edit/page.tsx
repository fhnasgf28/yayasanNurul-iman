"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { use, useState, useEffect } from "react";
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

export default function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
  });

  useEffect(() => {
    if (!id) return;

    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news`);
        if (response.ok) {
          const newsList = await response.json();
          const news = newsList.find((n: any) => n.id === id);
          if (news) {
            reset({
              ...news,
              tags: Array.isArray(news.tags) ? news.tags.join(", ") : news.tags
            });
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchNews();
  }, [id, reset]);

  const onSubmit = async (data: NewsFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan berita");
      }

      alert("Berita berhasil diperbarui!");
      router.push("/dashboard/news");
      router.refresh();
    } catch (err) {
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

  if (isFetching) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

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
            <h1 className="text-2xl font-serif font-bold text-primary">Edit Berita</h1>
            <p className="text-gray-500 text-sm">Perbarui konten artikel Anda.</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
           <button
             onClick={handleSubmit(onSubmit)}
             disabled={isLoading}
             className="flex items-center space-x-2 px-8 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-md disabled:opacity-70"
           >
             <Save size={18} />
             <span>{isLoading ? "Menyimpan..." : "Simpan Perubahan"}</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Judul Berita</label>
              <input
                {...register("title")}
                onChange={handleTitleChange}
                className="w-full bg-base border border-gray-100 rounded-xl py-4 px-6 outline-none focus:border-accent transition-colors"
              />
              {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Slug (URL)</label>
              <input
                {...register("slug")}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 text-gray-400 outline-none"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Ringkasan (Excerpt)</label>
              <textarea
                {...register("excerpt")}
                rows={3}
                className="w-full bg-base border border-gray-100 rounded-xl py-4 px-6 outline-none focus:border-accent transition-colors resize-none"
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

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <ImageUploader
              value={watch("thumbnail")}
              onChange={(url) => setValue("thumbnail", url)}
              label="Featured Image"
            />

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Kategori</label>
              <select
                {...register("category")}
                className="w-full bg-base border border-gray-100 rounded-xl py-4 px-4 outline-none focus:border-accent transition-colors appearance-none"
              >
                <option value="Kegiatan Masjid">Kegiatan Masjid</option>
                <option value="DTA">DTA</option>
                <option value="Sosial">Sosial</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Tag (Pisahkan dengan koma)</label>
              <input
                {...register("tags")}
                className="w-full bg-base border border-gray-100 rounded-xl py-4 px-6 outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-base rounded-2xl">
               <span className="text-sm font-bold text-primary">Diterbitkan?</span>
               <input
                 type="checkbox"
                 {...register("published")}
                 className="w-5 h-5 accent-accent"
               />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
