export interface KnowledgeRule {
  keywords: string[];
  response: string;
}

export const KNOWLEDGE_BASE: KnowledgeRule[] = [
  // --- INFORMASI YAYASAN & DTA ---
  {
    keywords: ["dta", "pendaftaran", "daftar", "ppdb", "masuk", "syarat"],
    response: `📖 *Informasi Pendaftaran Santri DTA Nurul Iman (TA 2026/2027):*

• *Usia:* 6 - 12 Tahun (SD/MI).
• *Gelombang 1:* 01 Mei - 30 Juni 2026 (Bebas Biaya Form).
• *Syarat Berkas:* Fotokopi KK (2 lembar), Fotokopi Akta (2 lembar), Pasfoto 3x4 (2 lembar).
• *Jam KBM:* Senin s/d Jumat, Pukul 14.30 - 17.00 WIB.
• *Beasiswa Yatim/Dhuafa:* GRATIS SPP 100%.

Anda dapat mendaftar online langsung di:
https://yayasannuruliman.clipperyt.online/pendaftaran-siswa`,
  },
  {
    keywords: ["kurikulum", "pelajaran", "hafalan", "juz 30", "mata pelajaran", "mapel"],
    response: `📚 *Kurikulum & Target Hafalan DTA Nurul Iman:*

1. *5 Mata Pelajaran Utama:* Al-Qur'an & Hadits, Aqidah Akhlak, Fiqih Ibadah, Bahasa Arab, Sejarah Islam.
2. *Target Hafalan:* 
   - Kelas 1: Surah An-Naas s.d Al-Fil
   - Kelas 2: Surah Al-Humazah s.d Al-Qadr
   - Kelas 3: Surah Al-'Alaq s.d Al-Fajr
   - Kelas 4: Surah Al-Ghasyiyah s.d An-Naba' (Lulus Munaqosyah Juz 30).

Detail lengkap kurikulum dapat dilihat di:
https://yayasannuruliman.clipperyt.online/dta`,
  },

  // --- IBADAH GENERAL & FIQIH ---
  {
    keywords: ["puasa", "ayyamul bidh", "senin kamis", "asyura", "nisfu"],
    response: `🌙 *Informasi & Keutamaan Puasa Sunnah:*

• *Puasa Ayyamul Bidh:* Dilaksanakan setiap tanggal 13, 14, 15 bulan Hijriah saat bulan purnama. Pahalanya seperti puasa sepanjang tahun.
• *Puasa Senin & Kamis:* Hari di mana amalan manusia diperiksakan di hadapan Allah SWT.
• *Puasa Asyura (10 Muharram):* Menghapuskan dosa setahun yang lalu.

Lihat kalender puasa sunnah selengkapnya di:
https://yayasannuruliman.clipperyt.online/masjid/agenda`,
  },
  {
    keywords: ["dhuha", "tahajud", "witir", "shalat sunnah", "sholat sunnah"],
    response: `🕌 *Keutamaan Shalat Sunnah:*

• *Shalat Dhuha:* Dikerjakan 2 s.d 8 rakaat di pagi hari (setelah terbit matahari hingga menjelang Dzuhur). Keutamaannya melapangkan rezeki & pembuka pintu surga.
• *Shalat Tahajud:* Dikerjakan di sepertiga malam terakhir setelah bangun tidur. Shalat sunnah paling utama setelah shalat fardhu.
• *Shalat Witir:* Shalat penutup malam (1, 3, atau 5 rakaat).`,
  },
  {
    keywords: ["surah", "surat", "al-kahfi", "yasin", "al-mulk", "ayat kursi"],
    response: `📖 *Keutamaan Surah-Surah Pilihan:*

• *Surah Al-Kahfi:* Dibaca pada hari/malam Jumat untuk mendapat cahaya petunjuk di antara dua Jumat & perlindungan dari fitnah Dajjal.
• *Surah Al-Mulk:* Dibaca sebelum tidur sebagai pelindung dari azab kubur.
• *Ayat Kursi:* Dibaca setiap selesai shalat fardhu dan sebelum tidur.

Baca Al-Qur'an lengkap di:
https://yayasannuruliman.clipperyt.online/masjid/quran`,
  },
  {
    keywords: ["wudhu", "wudlu", "bersuci", "thaharah", "batal"],
    response: `💧 *Rukun Wudhu & Bersuci:*

1. Niat dalam hati.
2. Membasuh muka secara merata.
3. Membasuh kedua tangan hingga siku.
4. Mengusap sebagian kepala/rambut.
5. Membasuh kedua kaki hingga mata kaki.
6. Tertib (berurutan).`,
  },

  // --- MASJID & KEGIATAN ---
  {
    keywords: ["sholat", "jadwal", "waktu", "subuh", "dzuhur", "ashar", "maghrib", "isya"],
    response: `🕌 *Jadwal Sholat & Kegiatan Ibadah Masjid Nurul Iman:*

• Anda dapat mengecek Jadwal Sholat real-time lokasi Bandung & sekitarnya di:
https://yayasannuruliman.clipperyt.online/jadwal-sholat

• *Kegiatan Rutin Masjid:*
  - Kajian Subuh Pekanan: Setiap Ahad Subuh (04.30 - 06.00 WIB).
  - Majlis Ta'lim Ibu-Ibu: Setiap Selasa Siang (13.30 - 15.00 WIB).
  - Santunan Yatim Pekanan: Setiap Jumat Sore (16.00 WIB).`,
  },
  {
    keywords: ["quran", "qur'an", "ngaji", "baca"],
    response: `📖 *Al-Qur'an Online Yayasan Nurul Iman:*

Tersedia fitur Al-Qur'an Online lengkap 114 Surah dengan teks Arab, latin, terjemahan, audio, salin ayat, dan buat gambar ayat:
https://yayasannuruliman.clipperyt.online/masjid/quran`,
  },
  {
    keywords: ["dzikir", "matsurat", "pagi", "sore", "petang"],
    response: `🤲 *Dzikir Pagi & Sore (Al-Matsurat):*

Fitur panduan Dzikir Pagi & Sore sesuai sunnah dengan counter hitungan, teks Arab, latin, dan mode malam:
https://yayasannuruliman.clipperyt.online/masjid/dzikir`,
  },
  {
    keywords: ["doa", "do'a", "selamat", "orang tua", "harian"],
    response: `🤲 *Kumpulan Doa Harian & Setelah Shalat:*

Kumpulan Doa Selamat, Doa Orang Tua, Doa Setelah Shalat Fardhu, dan Doa Bepergian lengkap dengan audio:
https://yayasannuruliman.clipperyt.online/masjid/doa`,
  },
  {
    keywords: ["donasi", "infaq", "sedekah", "zakat", "rekening", "bantu"],
    response: `💚 *Donasi & Infaq Yayasan Nurul Iman:*

Salurkan donasi terbaik Anda untuk kemakmuran masjid, beasiswa santri yatim 100%, dan santunan dhuafa:
https://yayasannuruliman.clipperyt.online/donate

Laporan Keuangan Transparan dapat dilihat di:
https://yayasannuruliman.clipperyt.online/donate/laporan-keuangan`,
  },
  {
    keywords: ["kontak", "alamat", "lokasi", "telepon", "email", "wa", "whatsapp"],
    response: `📍 *Kontak & Lokasi Yayasan Nurul Iman:*

• *Alamat:* Jl. Masjid Nurul Iman, Bandung, Jawa Barat.
• *Email:* assegaffarhab5@gmail.com
• *Website:* https://yayasannuruliman.clipperyt.online/contact`,
  },
];

export function findKnowledgeResponse(userMessage: string): string | null {
  const q = userMessage.toLowerCase();
  for (const rule of KNOWLEDGE_BASE) {
    if (rule.keywords.some((kw) => q.includes(kw))) {
      return rule.response;
    }
  }
  return null;
}

export const SYSTEM_PROMPT = `Kamu adalah "Asisten Nurul Iman", AI pintar dan ramah yang mewakili Yayasan & Masjid Nurul Iman Bandung.

Tugas utama kamu:
1. Menjawab pertanyaan seputar Yayasan & Masjid Nurul Iman (DTA, Jadwal Sholat, Al-Qur'an, Dzikir, Doa, Pendaftaran, Donasi).
2. Menjawab pertanyaan keagamaan Islam umum (Fiqih, Shalat Sunnah, Puasa, Al-Qur'an, Adab, Akhlak) secara bijak sesuai pemahaman Ahlus Sunnah wal Jama'ah.
3. Gunakan tutur kata yang ramah, sopan, bernuansa Islami (Assalamu'alaikum, Insya Allah, Alhamdulillah).
4. Berikan jawaban yang jelas, bermanfaat, dan tidak terlalu panjang (maksimal 200-300 kata).`;
