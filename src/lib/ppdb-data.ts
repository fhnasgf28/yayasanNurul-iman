export interface LangkahPendaftaran {
  nomor: number;
  judul: string;
  subjudul: string;
  deskripsi: string;
  icon: string;
}

export interface GelombangPPDB {
  gelombang: string;
  periode: string;
  kuota: string;
  status: "Dibuka" | "Akan Datang" | "Ditutup";
  catatan: string;
}

export interface SyaratPPDB {
  kategori: string;
  item: string[];
}

export const ALUR_PPDB: LangkahPendaftaran[] = [
  {
    nomor: 1,
    judul: "Isi Formulir Online",
    subjudul: "Mengisi data santri & orang tua",
    deskripsi: "Buka website yayasannuruliman.clipperyt.online/pendaftaran-siswa atau datang langsung ke sekretariat untuk mengisi data calon santri.",
    icon: "FileText",
  },
  {
    nomor: 2,
    judul: "Verifikasi Berkas",
    subjudul: "Penyerahan KK & Akta",
    deskripsi: "Panitia memverifikasi kelengkapan dokumen KK, Akta Kelahiran, dan pasfoto santri secara online atau di sekretariat.",
    icon: "ShieldCheck",
  },
  {
    nomor: 3,
    judul: "Tes Penempatan / Pemetaan",
    subjudul: "Tes baca Iqro / Al-Qur'an",
    deskripsi: "Santri mengikuti tes pemetaan kemampuan membaca Al-Qur'an (Iqro/Juz Amma) untuk penentuan tingkatan kelas yang tepat.",
    icon: "BookOpen",
  },
  {
    nomor: 4,
    judul: "Pengumuman & Seragam",
    subjudul: "Daftar ulang & siap KBM",
    deskripsi: "Cek status kelulusan di website, konfirmasi daftar ulang, pengambilan seragam DTA, dan siap mengikuti KBM.",
    icon: "GraduationCap",
  },
];

export const GELOMBANG_LIST: GelombangPPDB[] = [
  {
    gelombang: "Gelombang 1 (Early Bird)",
    periode: "01 Mei - 30 Juni 2026",
    kuota: "50 Santri Baru",
    status: "Dibuka",
    catatan: "Bebas Biaya Formulir & Potongan Seragam 20%",
  },
  {
    gelombang: "Gelombang 2 (Reguler)",
    periode: "01 Juli - 15 Juli 2026",
    kuota: "30 Santri Baru",
    status: "Akan Datang",
    catatan: "Sesuai sisa kuota kelas DTA Nurul Iman",
  },
];

export const SYARAT_PPDB: SyaratPPDB[] = [
  {
    kategori: "Usia & Pendidikan",
    item: [
      "Usia minimal 6 tahun (minimal Kelas 1 SD/MI)",
      "Usia maksimal 12 tahun (Kelas 6 SD/MI)",
      "Mempunyai semangat belajar Al-Qur'an & Ibadah",
    ],
  },
  {
    kategori: "Dokumen Administrasi",
    item: [
      "Fotokopi Kartu Keluarga (KK) - 2 Lembar",
      "Fotokopi Akta Kelahiran Anak - 2 Lembar",
      "Pasfoto santri ukuran 3x4 berwarna (2 Lembar)",
      "Formulir Pendaftaran yang telah diisi lengkap",
    ],
  },
  {
    kategori: "Fasilitas & Beasiswa",
    item: [
      "Fasilitas Gratis SPP 100% bagi Anak Yatim & Dhuafa",
      "Mendapat Kitab Pembelajaran DTA & Buku Prestasi",
      "Ruang Kelas Nyaman, Mushalla, & Tenaga Pengajar Sertifikasi",
    ],
  },
];

export const STATS_PPDB = [
  { angka: "100%", label: "Bebas SPP Anak Yatim", deskripsi: "Fasilitas Beasiswa Penuh" },
  { angka: "1 : 15", label: "Rasio Pengajar Santri", deskripsi: "Bimbingan Maksimal & Efektif" },
  { angka: "37", label: "Target Surah Juz 30", deskripsi: "Graduasi Munaqosyah Resmi" },
  { angka: "5", label: "Hari KBM Seminggu", deskripsi: "Senin - Jumat 14.30 - 17.00 WIB" },
];
