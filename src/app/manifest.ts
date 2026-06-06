import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yayasan Nurul Iman",
    short_name: "Nurul Iman",
    description: "Menerangi Umat, Membentuk Generasi Qur'ani. Layanan Masjid, DTA, dan Berita Islami.",
    start_url: "/",
    scope: "/",
    id: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui", "browser"],
    background_color: "#FDFAF4",
    theme_color: "#1A4D2E",
    orientation: "portrait",
    lang: "id-ID",
    dir: "ltr",
    categories: ["education", "social", "religious"],
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/pwa-icon/192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-icon/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-icon/512",
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
        icons: [{ src: "/pwa-icon/192", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Donasi / Infaq",
        short_name: "Infaq",
        description: "Salurkan sedekah jariyah Anda",
        url: "/donate",
        icons: [{ src: "/pwa-icon/192", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Hubungi Kami",
        short_name: "Kontak",
        description: "Layanan informasi yayasan",
        url: "/contact",
        icons: [{ src: "/pwa-icon/192", sizes: "192x192", type: "image/png" }],
      },
    ],
  };
}
