require("dotenv/config");

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@nuruliman.or.id" },
    update: {},
    create: {
      email: "admin@nuruliman.or.id",
      name: "Super Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const programs = [
    {
      slug: "pengelolaan-masjid-nurul-iman",
      title: "Pengelolaan & Kemakmuran Masjid Nurul Iman",
      description: "Program utama yayasan dalam mengelola operasional Masjid Nurul Iman agar senantiasa menjadi tempat ibadah yang nyaman, bersih, dan memakmurkan umat.",
      content: `
        Program utama yayasan dalam mengelola operasional Masjid Nurul Iman agar senantiasa menjadi tempat ibadah yang nyaman, bersih, dan memakmurkan umat.
        
        Kegiatan meliputi:
        - Pemeliharaan kebersihan dan kenyamanan masjid
        - Penyelenggaraan shalat berjamaah 5 waktu
        - Program kajian Islam rutin (ba'da Subuh, ba'da Maghrib)
        - Kegiatan Jumat: khutbah & shalat Jumat
        - Peringatan Hari Besar Islam (PHBI): Maulid, Isra Mi'raj, dll
        - Pengelolaan kas masjid secara transparan
        - Pembangunan & renovasi fasilitas masjid
      `,
      category: "Masjid",
      status: "ACTIVE",
      thumbnail: "https://images.unsplash.com/photo-1542714599-423730594498?q=80&w=1200&auto=format&fit=crop",
      beneficiary: 1000,
    },
    {
      slug: "kajian-islam-rutin",
      title: "Kajian Islam & Pengajian Rutin",
      description: "Kegiatan kajian Islam dan pengajian rutin yang terbuka untuk seluruh jamaah dan masyarakat umum.",
      content: `
        Kegiatan kajian Islam dan pengajian rutin yang terbuka untuk seluruh jamaah dan masyarakat umum.
        
        Jadwal:
        - Kajian ba'da Subuh: Setiap hari, kitab pilihan
        - Pengajian Ibu-Ibu: Setiap minggu
        - Kajian Umum: Setiap malam Jumat
        - Tabligh Akbar: Sesuai jadwal
      `,
      category: "Masjid",
      status: "ACTIVE",
      thumbnail: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200&auto=format&fit=crop",
      beneficiary: 200,
    },
    {
      slug: "dta-nurul-iman",
      title: "DTA Nurul Iman — Pendidikan Agama Islam untuk Anak",
      description: "DTA Nurul Iman adalah program pendidikan agama Islam nonformal yang membina anak-anak agar mengenal Islam sejak dini.",
      content: `
        DTA Nurul Iman adalah program pendidikan agama Islam nonformal yang membina anak-anak agar mengenal Islam sejak dini, lancar membaca Al-Qur'an, dan berakhlak mulia.
        
        Kurikulum:
        - Baca Tulis Al-Qur'an (BTQ) — Iqra hingga Al-Qur'an
        - Tajwid & Tahsin
        - Hafalan Juz 'Amma (Juz 30)
        - Fikih Ibadah (thaharah, shalat, puasa)
        - Akidah Akhlak
        - Do'a-do'a Harian
        - Sejarah Islam (Sirah Nabawiyah)
        
        Jadwal: Sore hari ba'da Ashar, Senin – Sabtu
        Pengajar: Ustadz/Ustadzah berpengalaman dan bersertifikat
      `,
      category: "Pendidikan",
      status: "ACTIVE",
      thumbnail: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?q=80&w=1200&auto=format&fit=crop",
      beneficiary: 500,
    },
    {
      slug: "tahfidz-quran",
      title: "Program Tahfidz Al-Qur'an",
      description: "Program menghafal Al-Qur'an yang ditujukan bagi santri yang ingin menjadi hafidz/hafidzah.",
      content: "Program menghafal Al-Qur'an yang ditujukan bagi santri yang ingin menjadi hafidz/hafidzah, dimulai dari Juz 30 hingga target hafalan yang lebih tinggi.",
      category: "Pendidikan",
      status: "ACTIVE",
      thumbnail: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1200&auto=format&fit=crop",
      beneficiary: 50,
    },
    {
      slug: "beasiswa-santri",
      title: "Beasiswa Santri Tidak Mampu",
      description: "Program beasiswa bagi santri DTA yang berasal dari keluarga kurang mampu.",
      content: "Program beasiswa bagi santri DTA yang berasal dari keluarga kurang mampu agar tetap dapat mengikuti pendidikan agama tanpa hambatan biaya.",
      category: "Sosial",
      status: "ACTIVE",
      thumbnail: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
      beneficiary: 100,
    },
  ];

  for (const program of programs) {
    await prisma.program.upsert({
      where: { slug: program.slug },
      update: program,
      create: program,
    });
  }

  const newsEntries = [
    {
      slug: "maulid-nabi-1446h",
      title: "Peringatan Maulid Nabi Muhammad SAW 1446 H di Masjid Nurul Iman",
      excerpt: "Ratusan jamaah memadati Masjid Nurul Iman dalam rangka memperingati Maulid Nabi Muhammad SAW 1446 H dengan penuh khidmat.",
      content: "Alhamdulillah, Masjid Nurul Iman kembali menyelenggarakan peringatan Maulid Nabi Muhammad SAW 1446 H. Acara berlangsung meriah dihadiri oleh ratusan jamaah dari berbagai kalangan. Kegiatan diisi dengan pembacaan shalawat, tausiyah, dan santunan anak yatim.",
      category: "Kegiatan Masjid",
      tags: ["maulid", "masjid", "nurul iman"],
      published: true,
      authorId: admin.id,
      thumbnail: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200&auto=format&fit=crop",
    },
    {
      slug: "wisuda-santri-dta-angkatan-10",
      title: "Wisuda Santri DTA Nurul Iman Angkatan ke-10",
      excerpt: "Sebanyak 50 santri DTA Nurul Iman resmi diwisuda setelah berhasil menyelesaikan program belajar.",
      content: "Yayasan Nurul Iman dengan bangga menyelenggarakan Wisuda Santri DTA Nurul Iman Angkatan ke-10. Para wisudawan telah berhasil menyelesaikan hafalan Juz 30 dan lulus ujian praktik ibadah.",
      category: "DTA",
      tags: ["wisuda", "dta", "santri"],
      published: true,
      authorId: admin.id,
      thumbnail: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?q=80&w=1200&auto=format&fit=crop",
    },
    {
      slug: "penerimaan-santri-baru-dta",
      title: "Penerimaan Santri Baru DTA Nurul Iman Tahun Ajaran Baru",
      excerpt: "DTA Nurul Iman kini membuka pendaftaran santri baru untuk tahun ajaran baru. Segera daftarkan putra-putri Anda!",
      content: "Yayasan Nurul Iman membuka pendaftaran santri baru DTA Nurul Iman. Pendaftaran terbuka untuk anak-anak usia 6–12 tahun. Hubungi pengurus masjid atau datang langsung ke sekretariat yayasan.",
      category: "DTA",
      tags: ["pendaftaran", "dta", "santri baru"],
      published: true,
      authorId: admin.id,
      thumbnail: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  for (const news of newsEntries) {
    await prisma.news.upsert({
      where: { slug: news.slug },
      update: news,
      create: news,
    });
  }

  await prisma.gallery.deleteMany({});
  await prisma.gallery.createMany({
    data: [
      {
        imageUrl: "https://images.unsplash.com/photo-1542714599-423730594498?q=80&w=1200&auto=format&fit=crop",
        caption: "Suasana Masjid Nurul Iman",
        category: "Masjid",
        order: 1,
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?q=80&w=1200&auto=format&fit=crop",
        caption: "Santri DTA Nurul Iman sedang belajar",
        category: "Kegiatan DTA",
        order: 2,
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1200&auto=format&fit=crop",
        caption: "Program Tahfidz Al-Qur'an",
        category: "Tahfidz",
        order: 3,
      },
    ],
  });

  console.log("Database has been seeded with Islamic content.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
