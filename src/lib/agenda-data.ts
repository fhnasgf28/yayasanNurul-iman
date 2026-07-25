export interface AgendaItem {
  id: string;
  judul: string;
  kategori: "kajian" | "dta" | "sosial" | "phbi";
  kategoriLabel: string;
  waktu: string;
  hari: string;
  jam: string;
  lokasi: string;
  penceramah?: string;
  deskripsi: string;
  peserta: string; // e.g. "Umum", "Bapak-Bapak", "Ibu-Ibu", "Santri DTA"
  isRutin: boolean;
  status: "akan_datang" | "berlangsung" | "rutin";
}

export interface IslamicEvent {
  title: string;
  hijriDate: string;
  gregorianEstimate: string;
  description: string;
  isSunnahFasting?: boolean;
}

export const AGENDA_LIST: AgendaItem[] = [
  {
    id: "kajian-subuh",
    judul: "Kajian Subuh Pekanan & Sarapan Bersama",
    kategori: "kajian",
    kategoriLabel: "Kajian & Majlis",
    waktu: "Setiap Hari Ahad / Minggu",
    hari: "Ahad Subuh",
    jam: "04:30 - 06:00 WIB",
    lokasi: "Masjid Nurul Iman (Ruang Utama)",
    penceramah: "Ustadz H. Ahmad Dahlan, M.Ag",
    deskripsi: "Pembahasan kitab Riyadhus Shalihin & Tazkiyatun Nufus dilanjutkan dengan tanya jawab serta sarapan bersama jamaah.",
    peserta: "Umum (Bapak, Ibu & Remaja)",
    isRutin: true,
    status: "rutin"
  },
  {
    id: "pengajian-ibu",
    judul: "Majlis Ta'lim Ibu-Ibu Yayasan Nurul Iman",
    kategori: "kajian",
    kategoriLabel: "Kajian & Majlis",
    waktu: "Setiap Hari Selasa",
    hari: "Selasa Siang",
    jam: "13:30 - 15:00 WIB",
    lokasi: "Aula Utama DTA Nurul Iman",
    penceramah: "Ustadzah Hj. Fatimah Az-Zahra",
    deskripsi: "Kajian Fiqih Wanita, Tajwid Al-Qur'an, serta pembacaan Ratib & Sholawat.",
    peserta: "Khusus Ibu-Ibu & Muslimah",
    isRutin: true,
    status: "rutin"
  },
  {
    id: "santunan-yatim",
    judul: "Santunan Pekanan & Doa Bersama Anak Yatim",
    kategori: "sosial",
    kategoriLabel: "Sosial & Yatim",
    waktu: "Setiap Hari Jumat",
    hari: "Jumat Sore",
    jam: "16:00 - 17:30 WIB",
    lokasi: "Masjid Nurul Iman",
    penceramah: "Pengurus Bidang Sosial Yayasan",
    deskripsi: "Penyaluran infaq & santunan berupa uang saku serta bingkisan makanan untuk 50 anak yatim binaan Yayasan Nurul Iman.",
    peserta: "Anak Yatim & Donatur",
    isRutin: true,
    status: "rutin"
  },
  {
    id: "kbm-dta",
    judul: "Kegiatan Belajar Mengajar (KBM) DTA Nurul Iman",
    kategori: "dta",
    kategoriLabel: "Pendidikan DTA",
    waktu: "Senin s/d Jumat",
    hari: "Senin - Jumat",
    jam: "14:30 - 17:00 WIB",
    lokasi: "Gedung DTA Nurul Iman",
    penceramah: "Dewan Guru DTA Nurul Iman",
    deskripsi: "Pembelajaran Al-Qur'an (Iqro/Tahsin), Aqidah Akhlak, Fiqih Ibadah, Bahasa Arab, dan Sejarah Islam untuk anak usia SD/MI.",
    peserta: "Santri DTA Nurul Iman",
    isRutin: true,
    status: "rutin"
  },
  {
    id: "tabligh-akbar-isra",
    judul: "Tabligh Akbar & Peringatan Isra Mi'raj",
    kategori: "phbi",
    kategoriLabel: "Hari Besar Islam (PHBI)",
    waktu: "27 Rajab / Bulan Depan",
    hari: "Sabtu Malam",
    jam: "19:30 WIB - Selesai",
    lokasi: "Halaman Utama Masjid Nurul Iman",
    penceramah: "Habib & Dai Nasional (Bintang Tamu)",
    deskripsi: "Peringatan Isra Mi'raj Nabi Muhammad SAW, penampilan santri DTA, peresmian fasilitas baru masjid, dan doa keselamatan bangsa.",
    peserta: "Umum Masyarakatan Wide",
    isRutin: false,
    status: "akan_datang"
  },
  {
    id: "donor-darah",
    judul: "Bakti Sosial: Donor Darah & Pemeriksaan Kesehatan Gratis",
    kategori: "sosial",
    kategoriLabel: "Sosial & Kesehatan",
    waktu: "Ahad Pertama Setiap Bulan",
    hari: "Ahad Pagi",
    jam: "08:00 - 12:00 WIB",
    lokasi: "Halaman & Klinik Yayasan",
    penceramah: "Tim Medis PMI & Dokter Relawan",
    deskripsi: "Kerja sama dengan PMI Kota untuk donor darah rutin serta cek gula darah, asam urat, dan tensi gratis bagi warga sekitar.",
    peserta: "Umum Warga & Jamaah",
    isRutin: true,
    status: "rutin"
  }
];

export const ISLAMIC_EVENTS: IslamicEvent[] = [
  {
    title: "Tahun Baru Hijriah (1 Muharram)",
    hijriDate: "1 Muharram 1448 H",
    gregorianEstimate: "Pertengahan Juni 2026",
    description: "Pergantian tahun baru Islam. Momen terbaik introspeksi diri (muhasabah) dan menyusun azam kebaikan.",
  },
  {
    title: "Puasa Tasu'a & Asyura (9 - 10 Muharram)",
    hijriDate: "9 & 10 Muharram 1448 H",
    gregorianEstimate: "Akhir Juni 2026",
    description: "Puasa sunnah Asyura menghapuskan dosa setahun yang lalu.",
    isSunnahFasting: true,
  },
  {
    title: "Maulid Nabi Muhammad SAW",
    hijriDate: "12 Rabiul Awal 1448 H",
    gregorianEstimate: "September 2026",
    description: "Peringatan kelahiran Rasulullah SAW dengan memperbanyak sholawat dan meneladani akhlak karimah beliau.",
  },
  {
    title: "Isra Mi'raj Nabi Muhammad SAW",
    hijriDate: "27 Rajab 1447 H / 1448 H",
    gregorianEstimate: "Januari / Februari",
    description: "Mengingat peristiwa diperjalankannya Nabi SAW dan diperintahkannya shalat lima waktu.",
  },
  {
    title: "Malam Nisfu Sya'ban & Puasa Nisfu",
    hijriDate: "15 Sya'ban 1447 H / 1448 H",
    gregorianEstimate: "Februari / Maret",
    description: "Malam keampunan di pertengahan bulan Sya'ban, diajarkan memperbanyak doa dan ibadah.",
    isSunnahFasting: true,
  },
  {
    title: "Awal Ramadhan & Puasa Wajib",
    hijriDate: "1 Ramadhan 1447 H / 1448 H",
    gregorianEstimate: "Maret / April",
    description: "Bulan suci penuh ampunan dan keberkahan, diturunkannya Al-Qur'an dan malam Lailatul Qadr.",
    isSunnahFasting: true,
  },
  {
    title: "Hari Raya Idul Fitri (1 Syawal)",
    hijriDate: "1 Syawal 1447 H / 1448 H",
    gregorianEstimate: "April",
    description: "Hari kemenangan umat Islam setelah menunaikan ibadah puasa sebulan penuh.",
  },
  {
    title: "Hari Arafah & Idul Adha (9 - 10 Dzulhijjah)",
    hijriDate: "9 & 10 Dzulhijjah",
    gregorianEstimate: "Mei / Juni",
    description: "Puasa sunnah Arafah (9 Dzulhijjah) menghapus dosa 2 tahun. Idul Adha dan penyembelihan hewan kurban.",
    isSunnahFasting: true,
  },
  {
    title: "Puasa Sunnah Ayyamul Bidh (Rutin Setiap Bulan)",
    hijriDate: "13, 14, 15 Setiap Bulan Hijriah",
    gregorianEstimate: "Bulanan",
    description: "Puasa sunnah 3 hari di tengah bulan hijriah saat bulan purnama. Pahalanya seperti puasa sepanjang tahun.",
    isSunnahFasting: true,
  },
  {
    title: "Puasa Sunnah Senin & Kamis",
    hijriDate: "Setiap Pekan",
    gregorianEstimate: "Mingguan",
    description: "Puasa sunnah mingguan di mana amalan manusia diperiksakan di hadapan Allah SWT.",
    isSunnahFasting: true,
  }
];
