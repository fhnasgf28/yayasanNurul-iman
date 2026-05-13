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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary">Kelola Galeri</h1>
          <p className="text-gray-500">Upload dan atur dokumentasi kegiatan yayasan.</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center space-x-2 hover:bg-opacity-90 transition-all shadow-md"
        >
          <Plus size={18} />
          <span>Upload Foto</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div key={img.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm group">
            <div className="relative aspect-square">
              <Image src={img.imageUrl} alt={img.caption || ""} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                 <button 
                   onClick={() => handleDelete(img.id)}
                   className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                 >
                   <Trash2 size={20} />
                 </button>
              </div>
            </div>
            <div className="p-4 space-y-2">
               <input 
                 defaultValue={img.caption}
                 className="w-full text-sm font-bold text-primary bg-transparent border-none focus:ring-0 p-0"
               />
               <span className="text-[10px] text-gray-400 uppercase tracking-widest">{img.category || "Umum"}</span>
            </div>
          </div>
        ))}
        
        <button
          onClick={handleAdd}
          className="aspect-square rounded-2xl border-2 border-dashed border-gray-100 hover:border-accent hover:bg-accent/5 transition-all flex flex-col items-center justify-center space-y-4 text-gray-400 hover:text-accent"
        >
          <Upload size={32} />
          <span className="text-sm font-bold">Tambah Foto</span>
        </button>
      </div>
    </div>
  );
}
