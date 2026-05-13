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

export default function EditProgramPage({
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
  } = useForm<ProgramFormValues>({
    resolver: zodResolver(programSchema),
  });

  useEffect(() => {
    if (!id) return;

    const fetchProgram = async () => {
      try {
        const response = await fetch(`/api/programs`);
        if (response.ok) {
          const programs = await response.json();
          const program = programs.find((p: any) => p.id === id);
          if (program) {
            reset(program);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProgram();
  }, [id, reset]);

  const onSubmit = async (data: ProgramFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/programs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan program");
      }

      alert("Program berhasil diperbarui!");
      router.push("/dashboard/programs");
      router.refresh();
    } catch (err) {
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

  if (isFetching) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

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
            <h1 className="text-2xl font-serif font-bold text-primary">Edit Program</h1>
            <p className="text-gray-500 text-sm">Perbarui informasi program Anda.</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
           <button
             onClick={handleSubmit(onSubmit)}
             disabled={isLoading}
             className="flex items-center space-x-2 px-8 py-2.5 bg-accent text-white rounded-xl font-bold text-sm hover:bg-opacity-90 transition-all shadow-md disabled:opacity-70"
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
              <label className="text-sm font-bold text-primary">Judul Program</label>
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
              <label className="text-sm font-bold text-primary">Deskripsi Singkat</label>
              <textarea
                {...register("description")}
                rows={3}
                className="w-full bg-base border border-gray-100 rounded-xl py-4 px-6 outline-none focus:border-accent transition-colors resize-none"
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

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <ImageUploader
              value={watch("thumbnail")}
              onChange={(url) => setValue("thumbnail", url)}
            />

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Kategori</label>
              <select
                {...register("category")}
                className="w-full bg-base border border-gray-100 rounded-xl py-4 px-4 outline-none focus:border-accent transition-colors appearance-none"
              >
                <option value="Masjid">Masjid</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Sosial">Sosial Kemanusiaan</option>
                <option value="Dakwah">Dakwah</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Status</label>
              <div className="grid grid-cols-3 gap-2">
                {["DRAFT", "ACTIVE", "COMPLETED"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setValue("status", s as any)}
                    className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${
                      watch("status") === s
                        ? "bg-accent text-white border-accent"
                        : "bg-base text-gray-400 border-gray-100 hover:border-accent"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
