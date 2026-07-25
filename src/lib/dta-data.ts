export interface MataPelajaran {
  id: string;
  nama: string;
  arab: string;
  alokasiJam: string;
  deskripsi: string;
  pokokBahasan: string[];
}

export interface TargetHafalan {
  kelas: string;
  tingkat: string;
  surahTarget: string[];
  doaTarget: string[];
  haditsTarget: string[];
  catatan: string;
}

export interface AgendaAkademik {
  tanggal: string;
  bulan: string;
  kegiatan: string;
  kategori: "PPDB" | "KBM" | "Ujian" | "Libur" | "Wisuda";
  deskripsi: string;
}

export interface FAQItem {
  pertanyaan: string;
  jawaban: string;
  kategori: "Pendaftaran" | "Biaya" | "KBM" | "Fasilitas";
}

export const MATA_PELAJARAN_LIST: MataPelajaran[] = [
  {
    id: "quran-hadits",
    nama: "Al-Qur'an & Hadits (Iqro & Tahsin)",
    arab: "القرآن والحديث",
    alokasiJam: "4 Jam / Pekan",
    deskripsi: "Pembelajaran makhrajul huruf, tajwid dasar, kelancaran membaca Al-Qur'an, dan penghafalan juz 30 serta hadits-hadits pilihan.",
    pokokBahasan: ["Tajwid Dasar (Nun Mati, Mim Mati, Mad)", "Hafalan Surat Pendek Juz 30", "Hadits Adab & Akhlak Sehari-hari", "Praktek Tilawah / Bimbingan membaca"],
  },
  {
    id: "aqidah-akhlak",
    nama: "Aqidah & Akhlak",
    arab: "العقيدة والأخلاق",
    alokasiJam: "2 Jam / Pekan",
    deskripsi: "Mengenalkan Rukun Iman, sifat-sifat Allah, pembentukan adab sopan santun kepada orang tua, guru, sesama teman, dan lingkungan.",
    pokokBahasan: ["Rukun Iman & Asmaul Husna", "Adab Kepada Orang Tua & Guru", "Sifat Wajib & Mustahil bagi Allah", "Menjauhi Akhlak Mazmumah (Tercela)"],
  },
  {
    id: "fiqih-ibadah",
    nama: "Fiqih Ibadah & Praktik",
    arab: "الفقه والعبادة",
    alokasiJam: "3 Jam / Pekan",
    deskripsi: "Bimbingan ibadah praktis mulai dari bersuci (thaharah), wudhu, gerakan dan bacaan shalat fardhu/sunnah, hingga tata cara puasa.",
    pokokBahasan: ["Thaharah & Praktek Wudhu Sempurna", "Praktek Shalat Fardhu & Dhuha", "Dzikir & Doa Setelah Shalat", "Hukum Puasa & Zakat Fitrah"],
  },
  {
    id: "bahasa-arab",
    nama: "Bahasa Arab Dasar",
    arab: "اللغة العربية",
    alokasiJam: "2 Jam / Pekan",
    deskripsi: "Pengenalan kosa kata (mufrodat) bahasa Arab harian, percakapan sederhana, dan menulis huruf arab (khath).",
    pokokBahasan: ["Mufrodat Anggota Tubuh & Sekolah", "Percakapan Sederhana (Hiwar)", "Pengenalan Angka & Warna Arab", "Seni Menulis Kaligrafi Dasar"],
  },
  {
    id: "ski",
    nama: "Sejarah Kebudayaan Islam (SKI)",
    arab: "التاريخ الإسلامي",
    alokasiJam: "1 Jam / Pekan",
    deskripsi: "Kisah keteladanan Nabi Muhammad SAW, para Nabi dan Rasul, serta Sahabat Khulafaur Rasyidin.",
    pokokBahasan: ["Kisah Kelahiran & Kerasulan Nabi SAW", "Peristiwa Hijrah ke Madinah", "Kisah Keturunan & Sahabat Nabi", "Mukjizat Para Nabi & Rasul"],
  }
];

export const TARGET_HAFALAN_LIST: TargetHafalan[] = [
  {
    kelas: "Kelas 1 DTA",
    tingkat: "Dasar (Pemula)",
    surahTarget: ["An-Naas", "Al-Falaq", "Al-Ikhlas", "Al-Lahab", "An-Nashr", "Al-Kafirun", "Al-Kautsar", "Al-Ma'un", "Quraisy", "Al-Fil"],
    doaTarget: ["Doa Sebelum/Sesudah Makan", "Doa Masuk/Keluar Masjid", "Doa Sebelum/Bangun Tidur", "Doa Untuk Kedua Orang Tua"],
    haditsTarget: ["Hadits Kebersihan Sebagian dari Iman", "Hadits Senyum adalah Sedekah"],
    catatan: "Fokus pada kelancaran Iqro jilid 1-4 dan pembiasaan shalat berjamaah.",
  },
  {
    kelas: "Kelas 2 DTA",
    tingkat: "Menengah Dasar",
    surahTarget: ["Al-Humazah", "Al-'Asr", "At-Takatsur", "Al-Qari'ah", "Al-'Adiyat", "Az-Zalzalah", "Al-Bayyinah", "Al-Qadr"],
    doaTarget: ["Doa Naik Kendaraan", "Doa Sebelum/Sesudah Belajar", "Doa Masuk/Keluar Kamar Mandi", "Doa Sapu Jagad"],
    haditsTarget: ["Hadits Menuntut Ilmu Wajib", "Hadits Larangan Marah"],
    catatan: "Santri mulai membaca Al-Qur'an mushaf dan hafalan juz 30 pertengahan.",
  },
  {
    kelas: "Kelas 3 DTA",
    tingkat: "Menengah Atas",
    surahTarget: ["Al-'Alaq", "At-Tin", "Asy-Syarh", "Adh-Dhuha", "Al-Lail", "Asy-Syams", "Al-Balad", "Al-Fajr"],
    doaTarget: ["Doa Bercermin", "Doa Berpakaian", "Doa Ketika Hujan", "Doa Shalat Dhuha & Tahajud"],
    haditsTarget: ["Hadits Kasih Sayang", "Hadits Menjaga Lisan"],
    catatan: "Pematangan hukum tajwid (Ghunnah, Ikhfa, Idgham, Izhhar) dan hafalan doa ibadah.",
  },
  {
    kelas: "Kelas 4 DTA",
    tingkat: "Lanjutan / Persiapan Munaqosyah",
    surahTarget: ["Al-Ghasyiyah", "Al-A'la", "Ath-Thariq", "Al-Buruj", "Inshiqaq", "Muthaffifin", "Infitar", "Takwir", "Abasa", "An-Nazi'at", "An-Naba'"],
    doaTarget: ["Doa Kesusahan / Istikharah", "Bacaan Lengkap Dzikir Shalat", "Doa Selamat Dunia Akhirat"],
    haditsTarget: ["Hadits Keutamaan Belajar Al-Qur'an", "Hadits Niat dalam Amalan"],
    catatan: "Selesai Hafalan Juz 30 (37 Surah), Lulus Munaqosyah & Siap Diumumkan Wisuda DTA.",
  }
];

export const AGENDA_AKADEMIK_LIST: AgendaAkademik[] = [
  {
    tanggal: "01 - 30",
    bulan: "Mei & Juni 2026",
    kegiatan: "Penerimaan Santri Baru (PPDB DTA)",
    kategori: "PPDB",
    deskripsi: "Pendaftaran santri baru DTA Nurul Iman Tahun Ajaran 2026/2027 secara online & offline.",
  },
  {
    tanggal: "15",
    bulan: "Juli 2026",
    kegiatan: "Awal KBM Semester Ganjil TA 2026/2027",
    kategori: "KBM",
    deskripsi: "Hari pertama masuk kelas DTA, orientasi santri baru, dan pembagian kitab materi.",
  },
  {
    tanggal: "28 - 30",
    bulan: "September 2026",
    kegiatan: "Penilaian Tengah Semester (PTS) Ganjil",
    kategori: "Ujian",
    deskripsi: "Ujian lisan hafalan surah/doa dan ujian tertulis materi aqidah, fiqih, & bahasa Arab.",
  },
  {
    tanggal: "14 - 18",
    bulan: "Desember 2026",
    kegiatan: "Penilaian Akhir Semester (PAS) & Pembagian Raport",
    kategori: "Ujian",
    deskripsi: "Ujian akhir semester ganjil dilanjutkan dengan penerimaan rincian hasil belajar santri.",
  },
  {
    tanggal: "01 - 25",
    bulan: "Ramadhan 1448 H",
    kegiatan: "Pesantren Kilat (Sanlat) & Gema Ramadhan",
    kategori: "KBM",
    deskripsi: "Kegiatan khusus bulan Ramadhan: tadarus bersama, kajian kisah Nabi, buka bersama, & penyaluran zakat.",
  },
  {
    tanggal: "10",
    bulan: "Mei 2027",
    kegiatan: "Ujian Munaqosyah Hafalan Juz 30",
    kategori: "Ujian",
    deskripsi: "Ujian kelulusan akhir bagi santri Kelas 4 DTA di hadapan tim penguji hafalan Al-Qur'an.",
  },
  {
    tanggal: "20",
    bulan: "Juni 2027",
    kegiatan: "Wisuda Santri & Pentas Seni DTA",
    kategori: "Wisuda",
    deskripsi: "Prosesi kelulusan wisudawan/wisudawati DTA Nurul Iman serta penampilan dai cilik & qari.",
  }
];

export const FAQ_DTA_LIST: FAQItem[] = [
  {
    pertanyaan: "Berapa usia minimal anak untuk mendaftar di DTA Nurul Iman?",
    jawaban: "Usia minimal pendaftaran santri baru adalah 6 tahun (minimal kelas 1 SD/MI) hingga usia 12 tahun (kelas 6 SD/MI). Santri akan dikelompokkan sesuai kemampuan membaca Al-Qur'an.",
    kategori: "Pendaftaran",
  },
  {
    pertanyaan: "Kapan jam belajar / KBM DTA dilaksanakan?",
    jawaban: "Kegiatan Belajar Mengajar (KBM) dilaksanakan setiap hari Senin sampai Jumat, pukul 14:30 WIB s.d. 17:00 WIB (setelah jam sekolah formal SD/MI selesai).",
    kategori: "KBM",
  },
  {
    pertanyaan: "Berapa biaya pendaftaran dan SPP bulanan DTA?",
    jawaban: "Biaya pendaftaran dan SPP sangat terjangkau. Bagi santri dari keluarga anak yatim dan dhuafa, Yayasan Nurul Iman menyediakan fasilitas Beasiswa Gratis 100% dari dana infaq/zakat yayasan.",
    kategori: "Biaya",
  },
  {
    pertanyaan: "Apa saja dokumen syarat pendaftaran yang harus disiapkan?",
    jawaban: "Dokumen yang perlu disiapkan: 1) Fotokopi Kartu Keluarga (KK), 2) Fotokopi Akta Kelahiran Anak, 3) Pasfoto ukuran 3x4 (2 lembar), dan 4) Mengisi formulir pendaftaran online atau offline.",
    kategori: "Pendaftaran",
  },
  {
    pertanyaan: "Bagaimana jika anak belum pernah belajar Iqro atau membaca Arab?",
    jawaban: "Tidak masalah! DTA Nurul Iman memiliki bimbingan Iqro dari jilid 1 dari dasar dengan metode privat dan kelompok kecil sehingga anak merasa nyaman dan cepat lancar.",
    kategori: "KBM",
  },
  {
    pertanyaan: "Fasilitas apa saja yang didapatkan oleh santri?",
    jawaban: "Ruang kelas ber-AC/kipas angin yang nyaman, mushalla latihan ibadah, perpustakaan buku islami, perlengkapan drumband/marawis, serta bimbingan tenaga pengajar ustaz/ustazah lulusan pesantren.",
    kategori: "Fasilitas",
  }
];
