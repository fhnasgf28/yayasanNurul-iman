export type AyahData = {
  text: string;
  translation: string;
  surah: string;
  ayahNumber: number;
};

const FALLBACK_VERSES: AyahData[] = [
  {
    text: "مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنۢبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنۢبُلَةٍ مِّائَةُ حَبَّةٍ ۗ وَاللَّهُ يُضَاعِفُ Lِمَن يَشَاءُ ۗ وَاللَّهُ وَاسِعٌ عَلِيمٌ",
    translation: "Perumpamaan orang yang menginfakkan hartanya di jalan Allah seperti sebutir biji yang menumbuhkan tujuh tangkai, pada setiap tangkai ada seratus biji. Allah melipatgandakan bagi siapa yang Dia kehendaki, dan Allah Mahaluas, Maha Mengetahui.",
    surah: "Al-Baqarah",
    ayahNumber: 261,
  },
  {
    text: "الَّذِينَ يُنفِقُونَ أَمْوَالَهُم بِاللَّيْلِ وَالنَّهَارِ سِرًّا وَعَلَانِيَةً فَلَهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
    translation: "Orang-orang yang menginfakkan hartanya malam dan siang hari secara sembunyi-sembunyi maupun terang-terangan, mereka mendapat pahala di sisi Tuhannya. Tidak ada kekhawatiran pada mereka dan tidak pula mereka bersedih hati.",
    surah: "Al-Baqarah",
    ayahNumber: 274,
  },
  {
    text: "يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ ۚ وَاللَّهُ بِمَا تَعْمَلُونَ خَبِIRٌ",
    translation: "Allah akan mengangkat (derajat) orang-orang yang beriman di antaramu dan orang-orang yang diberi ilmu beberapa derajat. Dan Allah Mahateliti terhadap apa yang kamu kerjakan.",
    surah: "Al-Mujadilah",
    ayahNumber: 11,
  },
  {
    text: "قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَALَّذِينَ لَا يَعْلَمُونَ ۗ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ",
    translation: "Katakanlah, 'Apakah sama orang-orang yang mengetahui dengan orang-orang yang tidak mengetahui?' Sebenarnya hanya orang-orang yang berakallah yang dapat menerima pelajaran.",
    surah: "Az-Zumar",
    ayahNumber: 9,
  }
];

// Curated ayah numbers to rotate through (30 verses)
const CURATED_AYAH_NUMBERS = [
  261, 274, 285, 1250, 102, 4153, 4945, 277, 1215, 342, 1032, 189, 442, 550, 882,
  254, 267, 271, 272, 3424, 4941, 103, 104, 110, 114, 191, 197, 200, 201, 286
];

export async function getDailyAyah(): Promise<AyahData> {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const ayahIndex = dayOfYear % CURATED_AYAH_NUMBERS.length;
  const ayahId = CURATED_AYAH_NUMBERS[ayahIndex];
  
  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/ayah/${ayahId}/editions/quran-simple,id.indonesian`,
      {
        next: { revalidate: 3600 * 12 }, // Revalidate every 12 hours
      }
    );
    
    if (!response.ok) throw new Error("Failed to fetch ayah");
    
    const json = await response.json();
    if (json.code !== 200 || !json.data || json.data.length < 2) {
      throw new Error("Invalid response from quran api");
    }
    
    return {
      text: json.data[0].text,
      translation: json.data[1].text,
      surah: json.data[0].surah.englishName,
      ayahNumber: json.data[0].numberInSurah,
    };
  } catch (err) {
    console.error("getDailyAyah error, using fallback:", err);
    return FALLBACK_VERSES[dayOfYear % FALLBACK_VERSES.length];
  }
}
