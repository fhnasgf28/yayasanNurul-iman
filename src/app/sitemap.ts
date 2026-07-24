import { MetadataRoute } from "next";

const BASE_URL = "https://yayasannuruliman.clipperyt.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Halaman statis utama
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/donate`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/donate/laporan-keuangan`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // Programs
    {
      url: `${BASE_URL}/programs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/programs?category=Masjid`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/programs?category=Pendidikan`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // Masjid features
    {
      url: `${BASE_URL}/jadwal-sholat`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/masjid/quran`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/masjid/dzikir`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    // Pendaftaran
    {
      url: `${BASE_URL}/pendaftaran-siswa`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  return staticPages;
}
