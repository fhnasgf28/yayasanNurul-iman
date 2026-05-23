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

const programSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  slug: z.string().min(5, "Slug minimal 5 karakter"),
  description: z.string().min(20, "Deskripsi singkat minimal 20 karakter"),
  content: z.string().min(50, "Konten lengkap minimal 50 karakter"),
  category: z.string().min(1, "Pilih kategori"),
  status: z.enum(["ACTIVE", "COMPLETED", "DRAFT"]),
  beneficiary: z.number().optional().nullable(),
  thumbnail: z.string().nullable(),
});

type ProgramFormValues = z.infer<typeof programSchema>;

export default function CreateProgramPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProgramFormValues>({
    resolver: zodResolver(programSchema),
    defaultValues: { status: "DRAFT", thumbnail: null },
  });

  const onSubmit = async (data: ProgramFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Gagal menyimpan program");

      router.push("/dashboard/programs");
      router.refresh();
    } catch {
      alert("Terjadi kesalahan saat menyimpan program");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue("title", val);
    setValue("slug", slugify(val));
  };

  const currentStatus = watch("status");

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard/programs"
            className="p-2 bg-white rounded-xl border border-gray-100 text-gray-400 hover:text-primary transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-bold text-primary">Tambah Program</h1>
            <p className="text-gray-500 text-sm">Buat program yayasan baru.</p>
          </div>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-md disabled:opacity-60"
        >
          <Save size={16} />
          <span>{isLoading ? "Menyimpan..." : "Simpan Program"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Judul Program</label>
              <input
                {...register("title")}
                onChange={handleTitleChange}
                placeholder="Nama program yayasan..."
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
              <label className="text-sm font-bold text-primary">Deskripsi Singkat</label>
              <textarea
                {...register("description")}
                rows={3}
                placeholder="Penjelasan singkat tentang program ini..."
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-5 outline-none focus:border-primary/40 transition-colors resize-none text-sm"
              />
              {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Konten Lengkap</label>
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
              label="Thumbnail Program"
            />

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Kategori</label>
              <select
                {...register("category")}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-4 outline-none focus:border-primary/40 transition-colors text-sm appearance-none"
              >
                <option value="">Pilih kategori...</option>
                <option value="Masjid">Masjid</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Sosial">Sosial Kemanusiaan</option>
                <option value="Dakwah">Dakwah</option>
              </select>
              {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Status Program</label>
              <div className="grid grid-cols-3 gap-2">
                {(["DRAFT", "ACTIVE", "COMPLETED"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setValue("status", s)}
                    className={`py-2.5 text-[11px] font-bold rounded-xl border transition-all ${
                      currentStatus === s
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-400 border-gray-100 hover:border-primary/30"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Jumlah Penerima Manfaat</label>
              <input
                {...register("beneficiary", { valueAsNumber: true })}
                type="number"
                placeholder="Contoh: 500"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 px-5 outline-none focus:border-primary/40 transition-colors text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
