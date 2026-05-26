"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Trash2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchGallery = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/gallery");
      if (response.ok) {
        const json = await response.json();
        setImages(json);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAdd = async () => {
    const url = window.prompt("URL Gambar:");
    if (url) {
      try {
        const response = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageUrl: url,
            caption: "Foto Baru",
            category: "Umum",
          }),
        });

        if (response.ok) {
          fetchGallery();
          router.refresh();
        }
      } catch (error) {
        alert("Gagal mengupload foto");
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Hapus foto ini?")) {
      // Implement delete API if needed, for now just UI simulation or use POST to remove
      setImages(images.filter(img => img.id !== id));
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Memuat galeri...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary sm:text-3xl">Kelola Galeri</h1>
          <p className="mt-1 text-sm leading-6 text-gray-500 sm:text-base">Upload dan atur dokumentasi kegiatan yayasan.</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex w-full items-center justify-center space-x-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-opacity-90 sm:w-auto"
        >
          <Plus size={18} />
          <span>Upload Foto</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {images.map((img) => (
          <div key={img.id} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="relative aspect-square">
              <Image src={img.imageUrl} alt={img.caption || ""} fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center space-x-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                 <button 
                   onClick={() => handleDelete(img.id)}
                   className="rounded-full bg-red-500 p-3 text-white transition-transform hover:scale-110"
                 >
                   <Trash2 size={20} />
                 </button>
              </div>
            </div>
            <div className="space-y-2 p-3 sm:p-4">
               <input 
                 defaultValue={img.caption}
                 className="w-full border-none bg-transparent p-0 text-sm font-bold text-primary focus:ring-0"
               />
               <span className="text-[10px] text-gray-400 uppercase tracking-widest">{img.category || "Umum"}</span>
            </div>
          </div>
        ))}
        
        <button
          onClick={handleAdd}
          className="flex aspect-square flex-col items-center justify-center space-y-3 rounded-2xl border-2 border-dashed border-gray-100 text-gray-400 transition-all hover:border-accent hover:bg-accent/5 hover:text-accent"
        >
          <Upload size={32} />
          <span className="text-sm font-bold">Tambah Foto</span>
        </button>
      </div>
    </div>
  );
}
