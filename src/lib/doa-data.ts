export interface DoaItem {
  id: number;
  judul: string;
  kategori: "sholat" | "selamat" | "keluarga" | "harian" | "khusus";
  kategoriLabel: string;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  sumber: string;
  keutamaan?: string;
}

export const DATA_DOA: DoaItem[] = [
  // --- SHOLAT ---
  {
    id: 1,
    judul: "Dzikir & Istighfar Setelah Shalat",
    kategori: "sholat",
    kategoriLabel: "Setelah Shalat",
    teksArab: "أَسْتَغْفِرُ اللهَ (٣x) اَللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ تَبَارَكْتَ يَا ذَا الْجَلاَلِ وَالإِكْرَامِ",
    teksLatin: "Astaghfirullah (3x). Allahumma antas-salam wa minkas-salam tabarakta ya dzal-jalali wal-ikram.",
    teksIndonesia: "Aku memohon ampun kepada Allah (3x). Ya Allah, Engkau adalah Maha Sejahtera, dan dari-Mu kesejahteraan. Maha Suci Engkau, wahai Tuhan Pemilik Keagungan dan Kemuliaan.",
    sumber: "HR. Muslim No. 591",
    keutamaan: "Dibaca 3x setiap selesai shalat fardhu."
  },
  {
    id: 2,
    judul: "Doa Pengukuh Tauhid Setelah Shalat",
    kategori: "sholat",
    kategoriLabel: "Setelah Shalat",
    teksArab: "لَا إِلهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيْكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ، اَللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ وَلَا مُعْطِيَ لِمَا مَنَعْتَ وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ",
    teksLatin: "Laa ilaha illallahu wahdahu laa syarika lah, lahul mulku wa lahul hamdu wa huwa 'ala kulli syai-in qadir. Allahumma laa mani'a lima a'thaita wa laa mu'thiya lima mana'ta wa laa yanfa'u dzal-jaddi minkal-jaddu.",
    teksIndonesia: "Tidak ada tuhan selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya kerajaan dan milik-Nya segala pujian, dan Dia Maha Kuasa atas segala sesuatu. Ya Allah, tidak ada yang dapat menghalangi apa yang Engkau berikan, dan tidak ada yang dapat memberi apa yang Engkau halangi, serta tidak berguna kekayaan bagi orang yang memilikinya dari azab-Mu.",
    sumber: "HR. Bukhari No. 844 & Muslim No. 593",
    keutamaan: "Dibaca rutin setelah shalat fardhu untuk menguatkan tauhid dan kepasrahan."
  },
  {
    id: 3,
    judul: "Doa Memohon Kemudahan Beribadah",
    kategori: "sholat",
    kategoriLabel: "Setelah Shalat",
    teksArab: "اَللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    teksLatin: "Allahumma a'innii 'ala dzikrika wa syukrika wa husni 'ibadatika.",
    teksIndonesia: "Ya Allah, bantulah aku untuk selalu mengingat-Mu, bersyukur kepada-Mu, dan beribadah kepada-Mu dengan baik.",
    sumber: "HR. Abu Daud No. 1522",
    keutamaan: "Wasiat Nabi SAW kepada Mu'adz bin Jabal untuk dibaca setiap di akhir shalat."
  },
  {
    id: 4,
    judul: "Membaca Ayat Kursi Setelah Shalat",
    kategori: "sholat",
    kategoriLabel: "Setelah Shalat",
    teksArab: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    teksLatin: "Allahu laa ilaha illa huwal-hayyul-qayyum, laa ta'khudzuhu sinatuw-wa laa naum, lahu maa fis-samawati wa maa fil-ardh, man dzal-ladzi yasyfa'u 'indahu illa bi-idznih, ya'lamu maa baina aidihim wa maa khalfahum, wa laa yuhithuna bi syai-im min 'ilmihi illa bima syaa-a, wasi'a kursiyyuhus-samawati wal-ardh, wa laa ya-uduhu hifzhuhumaa wa huwal-'aliyyul-'azhim.",
    teksIndonesia: "Allah, tidak ada tuhan selain Dia Yang Maha Hidup, yang terus-menerus mengurus (makhluk-Nya). Tidak mengantuk dan tidak tidur. Kepunyaan-Nya apa yang di langit dan di bumi. Tiada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa yang di hadapan mereka dan di belakang mereka. Dan mereka tidak mengetahui sesuatu pun dari ilmu-Nya melainkan apa yang dikehendaki-Nya. Kursi Allah meliputi langit dan bumi. Dan Dia tidak merasa berat memelihara keduanya, dan Dia Maha Tinggi lagi Maha Besar.",
    sumber: "QS. Al-Baqarah: 255 & HR. An-Nasa'i",
    keutamaan: "Barangsiapa membaca Ayat Kursi setiap selesai shalat fardhu, tidak ada yang menghalanginya masuk surga melainkan kematian."
  },

  // --- SELAMAT & PROTEKSI ---
  {
    id: 5,
    judul: "Doa Sapu Jagad (Kebaikan Dunia & Akhirat)",
    kategori: "selamat",
    kategoriLabel: "Doa Selamat",
    teksArab: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    teksLatin: "Rabbana aatina fid-dunya hasanataw-wa fil-akhirati hasanataw-wa qina 'adzaban-nar.",
    teksIndonesia: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.",
    sumber: "QS. Al-Baqarah: 201",
    keutamaan: "Doa yang paling sering dibaca oleh Rasulullah SAW karena mencakup seluruh kebaikan."
  },
  {
    id: 6,
    judul: "Doa Mohon Keselamatan Agama & Dunia",
    kategori: "selamat",
    kategoriLabel: "Doa Selamat",
    teksArab: "اَللَّهُمَّ إِنَّا نَسْأَلُكَ سَلَامَةً فِي الدِّينِ، وَعَافِيَةً فِي الْجَسَدِ، وَزِيَادَةً فِي الْعِلْمِ، وَبَرَكَةً فِي الرِّزْقِ، وَتَوْبَةً قَبْلَ الْمَوْتِ، وَرَحْمَةً عِنْدَ الْمَوْتِ، وَمَغْفِرَةً بَعْدَ الْمَوْتِ",
    teksLatin: "Allahumma inna nas-aluka salamatan fid-diini, wa 'afiyatan fil-jasadi, wa ziyadatan fil-'ilmi, wa barakatan fir-rizqi, wa taubatan qablal-mauti, wa rahmatan 'indal-mauti, wa maghfiratan ba'dal-maut.",
    teksIndonesia: "Ya Allah, kami memohon kepada-Mu keselamatan dalam agama, kesehatan pada tubuh, tambahan ilmu, keberkahan rizki, taubat sebelum mati, rahmat ketika mati, dan ampunan setelah mati.",
    sumber: "Doa Selamat Populer Sesuai Sunnah",
    keutamaan: "Sangat baik dibaca sehabis shalat dan saat memanjatkan doa bersama."
  },
  {
    id: 7,
    judul: "Doa Perlindungan dari Bahaya & Penyakit",
    kategori: "selamat",
    kategoriLabel: "Doa Selamat",
    teksArab: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    teksLatin: "Bismillahilladzi laa yadhurru ma'asmihi syai-un fil-ardhi wa laa fis-samaa-i wa huwas-sami'ul-'aliim.",
    teksIndonesia: "Dengan nama Allah yang dengan nama-Nya tidak ada sesuatu pun di bumi maupun di langit yang dapat membahayakan, dan Dia Maha Mendengar lagi Maha Mengetahui.",
    sumber: "HR. Abu Daud No. 5088 & Tirmidzi",
    keutamaan: "Dibaca 3x di pagi dan petang agar terhindar dari bahaya yang tak terduga."
  },

  // --- KELUARGA & ORANG TUA ---
  {
    id: 8,
    judul: "Doa Untuk Kedua Orang Tua",
    kategori: "keluarga",
    kategoriLabel: "Orang Tua & Keluarga",
    teksArab: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    teksLatin: "Rabbighfir lii wa li-walidayya warhamhuma kama rabbayani shaghira.",
    teksIndonesia: "Wahai Tuhanku, ampunilah aku dan kedua orang tuaku, dan sayangilah keduanya sebagaimana mereka merawatku di waktu kecil.",
    sumber: "QS. Al-Isra: 24",
    keutamaan: "Bentuk bakti anak (birrul walidain) yang wajib dirutinkan."
  },
  {
    id: 9,
    judul: "Doa Keluarga Sakinah, Mawaddah, Warahmah",
    kategori: "keluarga",
    kategoriLabel: "Orang Tua & Keluarga",
    teksArab: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    teksLatin: "Rabbana hab lana min azwajina wa dzurriyyatina qurrata a'yuniw-waj'alna lil-muttaqina imama.",
    teksIndonesia: "Ya Tuhan kami, anugerahkanlah kepada kami pasangan dan keturunan kami sebagai penyejuk hati (kami), dan jadikanlah kami pemimpin bagi orang-orang yang bertakwa.",
    sumber: "QS. Al-Furqan: 74",
    keutamaan: "Doa memohon keharmonisan rumah tangga dan keturunan yang shalih/shalihah."
  },

  // --- HARIAN ---
  {
    id: 10,
    judul: "Doa Sebelum Makan",
    kategori: "harian",
    kategoriLabel: "Harian",
    teksArab: "اَللَّهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ، بِسْمِ اللهِ",
    teksLatin: "Allahumma barik lana fii ma razaqtana wa qina 'adzaban-nar, Bismillah.",
    teksIndonesia: "Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari azab neraka. Dengan nama Allah.",
    sumber: "HR. Ibnu An-Sunni",
    keutamaan: "Membawa keberkahan pada makanan dan minuman yang dikonsumsi."
  },
  {
    id: 11,
    judul: "Doa Setelah Makan",
    kategori: "harian",
    kategoriLabel: "Harian",
    teksArab: "اَلْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِينَ",
    teksLatin: "Alhamdulillahilladzi ath'amanaa wa saqaanaa wa ja'alanaa minal-muslimin.",
    teksIndonesia: "Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami termasuk golongan orang-orang muslim.",
    sumber: "HR. Abu Daud & Tirmidzi",
    keutamaan: "Ungkapan rasa syukur atas nikmat pangan setiap hari."
  },
  {
    id: 12,
    judul: "Doa Masuk Masjid",
    kategori: "harian",
    kategoriLabel: "Harian",
    teksArab: "اَللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    teksLatin: "Allahummaftah lii abwaba rahmatika.",
    teksIndonesia: "Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.",
    sumber: "HR. Muslim No. 713",
    keutamaan: "Mendatangkan rahmat Allah saat melangkah masuk ke rumah-Nya."
  },
  {
    id: 13,
    judul: "Doa Keluar Masjid",
    kategori: "harian",
    kategoriLabel: "Harian",
    teksArab: "اَللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    teksLatin: "Allahumma innii as-aluka min fadhlika.",
    teksIndonesia: "Ya Allah, sesungguhnya aku memohon karunia-Mu.",
    sumber: "HR. Muslim No. 713",
    keutamaan: "Memohon karunia dan rezeki saat meninggalkan masjid."
  },
  {
    id: 14,
    judul: "Doa Naik Kendaraan / Bepergian",
    kategori: "harian",
    kategoriLabel: "Harian",
    teksArab: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ",
    teksLatin: "Subhanalladzi sakhkhara lana hadza wa ma kunna lahu muqrinina wa inna ila rabbina lamunqalibun.",
    teksIndonesia: "Maha Suci Allah yang telah menundukkan kendaraan ini bagi kami padahal kami sebelumnya tidak mampu menguasainya, dan sesungguhnya kami akan kembali kepada Tuhan kami.",
    sumber: "QS. Az-Zukhruf: 13-14",
    keutamaan: "Memberikan perlindungan dan keselamatan selama dalam perjalanan."
  },
  {
    id: 15,
    judul: "Doa Memohon Ilmu yang Bermanfaat",
    kategori: "harian",
    kategoriLabel: "Harian",
    teksArab: "اَللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
    teksLatin: "Allahumma innii as-aluka 'ilman nafi'an wa rizqan thayyiban wa 'amalan mutaqabbala.",
    teksIndonesia: "Ya Allah, sesungguhnya aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang halal dan baik, serta amal yang diterima.",
    sumber: "HR. Ibnu Majah No. 925",
    keutamaan: "Dibaca setiap pagi atau setelah shalat Subuh."
  },

  // --- KHUSUS & KESUSAHAN ---
  {
    id: 16,
    judul: "Doa Nabi Yunus (Saat Mengalami Kesusahan/Ujian)",
    kategori: "khusus",
    kategoriLabel: "Khusus & Perlindungan",
    teksArab: "لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    teksLatin: "Laa ilaha illa anta subhanaka innii kuntu minazh-zhalimin.",
    teksIndonesia: "Tidak ada tuhan selain Engkau. Maha Suci Engkau, sesungguhnya aku adalah termasuk orang-orang yang zhalim.",
    sumber: "QS. Al-Anbiya: 87",
    keutamaan: "Barangsiapa membaca doa ini dalam kesukaran, niscaya Allah akan mengabulkan dan melapangkan kesusahannya."
  },
  {
    id: 17,
    judul: "Doa Memohon Kelapangan Dada & Kelancaran Bicara",
    kategori: "khusus",
    kategoriLabel: "Khusus & Perlindungan",
    teksArab: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي",
    teksLatin: "Rabbisy-rah lii shadrii wa yassir lii amrii wahlul 'uqdatam min lisanii yafqahu qaulii.",
    teksIndonesia: "Ya Tuhanku, lapangkanlah dadaku, mudahkanlah urusanku, dan lepaskanlah kekakuan dari lidahku, agar mereka mengerti perkataanku.",
    sumber: "QS. Thaha: 25-28",
    keutamaan: "Doa Nabi Musa AS sebelum menghadapi tugas besar atau berbicara di depan umum."
  },
  {
    id: 18,
    judul: "Doa Memohon Pelunas Hutang & Bebas Kesusahan",
    kategori: "khusus",
    kategoriLabel: "Khusus & Perlindungan",
    teksArab: "اَللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
    teksLatin: "Allahumma innii a'udzu bika minal-hammi wal-hazani wa a'udzu bika minal-'ajzi wal-kasali wa a'udzu bika minal-jubni wal-bukhli wa a'udzu bika min ghalabatid-daini wa qahrir-rijal.",
    teksIndonesia: "Ya Allah, aku berlindung kepada-Mu dari rasa sedih dan gelisah, dari sifat lemah dan malas, dari sifat penakut dan kikir, serta dari lilitan hutang dan tekanan orang-orang.",
    sumber: "HR. Abu Daud No. 1555",
    keutamaan: "Mengusir kecemasan, rasa malas, serta memudahkan pelunasan hutang."
  }
];
