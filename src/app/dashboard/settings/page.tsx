"use client";

import { Save, Globe, Mail, Phone, MapPin, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({
    site_name: "Yayasan Nurul Iman",
    site_tagline: "Membangun Ummat, Menebar Manfaat",
    site_description: "Membangun masa depan yang lebih baik melalui pendidikan, pemberdayaan ekonomi, dan bantuan kemanusiaan.",
    contact_address: "Jl. Raya Nurul Iman No. 123, Jakarta",
    contact_phone: "+62 21 1234 5678",
    contact_email: "info@nuruliman.or.id",
    prayer_location_label: "Jakarta, Indonesia",
    prayer_city: "Jakarta",
    prayer_country: "Indonesia",
    prayer_method: "20",
  });
  const router = useRouter();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { settings?: Record<string, string> };
        if (data.settings) {
          setSettings((prev) => ({ ...prev, ...data.settings }));
        }
      } catch {
        console.error("loadSettings failed");
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      if (response.ok) {
        alert("Pengaturan berhasil disimpan!");
        router.refresh();
      } else {
        alert("Gagal menyimpan pengaturan");
      }
    } catch {
      alert("Terjadi kesalahan sistem");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary">Pengaturan Situs</h1>
          <p className="text-gray-500">Kelola informasi umum dan kontak yayasan.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-primary text-white px-8 py-2.5 rounded-xl font-bold text-sm flex items-center space-x-2 hover:bg-opacity-90 transition-all shadow-md"
        >
          <Save size={18} />
          <span>{isLoading ? "Menyimpan..." : "Simpan Perubahan"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 text-primary mb-2">
            <Globe size={20} className="text-accent" />
            <h3 className="text-lg font-serif font-bold">Informasi Yayasan</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Nama Yayasan</label>
              <input 
                value={settings.site_name} 
                onChange={(e) => handleChange("site_name", e.target.value)}
                className="w-full bg-base border border-gray-100 rounded-xl py-3 px-4 outline-none focus:border-accent" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Tagline</label>
              <input 
                value={settings.site_tagline} 
                onChange={(e) => handleChange("site_tagline", e.target.value)}
                className="w-full bg-base border border-gray-100 rounded-xl py-3 px-4 outline-none focus:border-accent" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Deskripsi Singkat (Footer)</label>
              <textarea 
                rows={3} 
                value={settings.site_description} 
                onChange={(e) => handleChange("site_description", e.target.value)}
                className="w-full bg-base border border-gray-100 rounded-xl py-3 px-4 outline-none focus:border-accent resize-none" 
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 text-primary mb-2">
            <Mail size={20} className="text-accent" />
            <h3 className="text-lg font-serif font-bold">Kontak & Alamat</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary flex items-center"><MapPin size={14} className="mr-2" /> Alamat</label>
              <input 
                value={settings.contact_address} 
                onChange={(e) => handleChange("contact_address", e.target.value)}
                className="w-full bg-base border border-gray-100 rounded-xl py-3 px-4 outline-none focus:border-accent" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary flex items-center"><Phone size={14} className="mr-2" /> Telepon</label>
                <input 
                  value={settings.contact_phone} 
                  onChange={(e) => handleChange("contact_phone", e.target.value)}
                  className="w-full bg-base border border-gray-100 rounded-xl py-3 px-4 outline-none focus:border-accent" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary flex items-center"><Mail size={14} className="mr-2" /> Email</label>
                <input 
                  value={settings.contact_email} 
                  onChange={(e) => handleChange("contact_email", e.target.value)}
                  className="w-full bg-base border border-gray-100 rounded-xl py-3 px-4 outline-none focus:border-accent" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 lg:col-span-2">
          <div className="flex items-center space-x-3 text-primary mb-2">
            <Share2 size={20} className="text-accent" />
            <h3 className="text-lg font-serif font-bold">Jadwal Sholat</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Label Lokasi</label>
              <input
                value={settings.prayer_location_label}
                onChange={(e) => handleChange("prayer_location_label", e.target.value)}
                className="w-full bg-base border border-gray-100 rounded-xl py-3 px-4 outline-none focus:border-accent"
                placeholder="Contoh: Jakarta, Indonesia"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Kota</label>
              <input
                value={settings.prayer_city}
                onChange={(e) => handleChange("prayer_city", e.target.value)}
                className="w-full bg-base border border-gray-100 rounded-xl py-3 px-4 outline-none focus:border-accent"
                placeholder="Contoh: Jakarta"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Negara</label>
              <input
                value={settings.prayer_country}
                onChange={(e) => handleChange("prayer_country", e.target.value)}
                className="w-full bg-base border border-gray-100 rounded-xl py-3 px-4 outline-none focus:border-accent"
                placeholder="Contoh: Indonesia"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Metode Perhitungan</label>
              <input
                value={settings.prayer_method}
                onChange={(e) => handleChange("prayer_method", e.target.value)}
                className="w-full bg-base border border-gray-100 rounded-xl py-3 px-4 outline-none focus:border-accent"
                placeholder="20"
              />
            </div>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">
            Default yang dipakai adalah metode <strong>Kementerian Agama Republik Indonesia</strong> dengan kode <strong>20</strong>.
            Ubah kota, negara, atau label lokasi jika jadwal sholat website harus mengikuti wilayah masjid yang berbeda.
          </p>
        </div>
      </div>
    </div>
  );
}
