import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yayasan Nurul Iman",
    short_name: "Nurul Iman",
    description: "Menerangi Umat, Membentuk Generasi Qur'ani",
    start_url: "/",
    display: "standalone",
    background_color: "#FDFAF4",
    theme_color: "#1A4D2E",
    icons: [
      {
        src: "/icon?size=192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon?size=512",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
