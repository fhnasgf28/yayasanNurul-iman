export interface KnowledgeRule {
  keywords: string[];
  response: string;
}

export const KNOWLEDGE_BASE: KnowledgeRule[] = [
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
    keywords: ["quran", "qur'an", "ngaji", "surat", "baca"],
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
1. Menjawab pertanyaan pengunjung seputar Yayasan Nurul Iman, Masjid Nurul Iman, DTA (Diniyah Takmiliyah Awaliyah), Jadwal Sholat, Al-Qur'an Online, Dzikir Pagi-Sore, Doa Harian, Pendaftaran Santri Baru, Donasi/Infaq, dan Kontak.
2. Selalu gunakan tutur kata yang sopan, ramah, bernuansa Islami (menggunakan salam seperti Assalamu'alaikum, Insya Allah, Alhamdulillah).
3. Berikan jawaban yang ringkas, tepat sasaran (maksimal 150-250 kata), dan cantumkan link halaman terkait jika relevan.
4. Jika ditanya hal yang di luar topik keislaman / yayasan, arahkan dengan santun kembali ke layanan Yayasan Nurul Iman.`;
