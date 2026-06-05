import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yayasan Nurul Iman",
    short_name: "Nurul Iman",
    description: "Menerangi Umat, Membentuk Generasi Qur'ani. Layanan Masjid, DTA, dan Berita Islami.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDFAF4",
    theme_color: "#1A4D2E",
    orientation: "portrait",
    categories: ["education", "social", "religious"],
    icons: [
      {
        src: "/icon",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon?size=192",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon?size=512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Jadwal Sholat",
        short_name: "Jadwal",
        description: "Lihat jadwal sholat harian",
        url: "/jadwal-sholat",
        icons: [{ src: "/icon?size=192", sizes: "192x192" }],
      },
      {
        name: "Donasi / Infaq",
        short_name: "Infaq",
        description: "Salurkan sedekah jariyah Anda",
        url: "/donate",
        icons: [{ src: "/icon?size=192", sizes: "192x192" }],
      },
      {
        name: "Hubungi Kami",
        short_name: "Kontak",
        description: "Layanan informasi yayasan",
        url: "/contact",
        icons: [{ src: "/icon?size=192", sizes: "192x192" }],
      },
    ],
  };
}
