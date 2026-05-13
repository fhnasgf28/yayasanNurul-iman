"use client";

import { Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageUploaderProps {
  value: string | null;
  onChange: (url: string | null) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = "Thumbnail" }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(value);

  const handleUpload = () => {
    // In a real app, this would trigger UploadThing or similar
    const url = window.prompt("URL Gambar (Simulasi Upload):");
    if (url) {
      setPreview(url);
      onChange(url);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-bold text-primary">{label}</label>
      
      {preview ? (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            onClick={removeImage}
            className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleUpload}
          className="w-full aspect-video rounded-2xl border-2 border-dashed border-gray-100 hover:border-accent hover:bg-accent/5 transition-all flex flex-col items-center justify-center space-y-4 group"
        >
          <div className="p-4 bg-base rounded-full text-gray-400 group-hover:text-accent transition-colors">
            <Upload size={32} />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-primary">Klik untuk upload gambar</p>
            <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
          </div>
        </button>
      )}
    </div>
  );
}
