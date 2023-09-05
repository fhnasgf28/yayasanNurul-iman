
export interface Card {
  title: string;
  description: string;
  imageSrc: string;
}

export const cards: Card[] = [
    {
      title: 'Mendirikan Sarana Pendidikan ( TPA/TK )',
      description: 'Program Mendirikan Sarana Pendidikan (TPA/TK) adalah langkah yang berharga dalam memberikan fondasi pendidikan yang kuat bagi anak-anak, mempersiapkan mereka untuk masa depan yang lebih baik.',
      imageSrc: '/images/kegiatan/tk.jpg',
    },
    {
      title: 'Menyeleggarakan Anak Usia Dini ( PAUD )',
      description: ' Ini adalah upaya untuk memberikan pendidikan dan perawatan awal yang bermutu kepada anak-anak prasekolah (usia dini) agar mereka dapat mengembangkan potensi mereka dengan baik sebelum memasuki pendidikan formal.',
      imageSrc: '/images/kegiatan/paud1.jpg',
    },
    {
      title: 'Mendirikan Pusat Kegiatan Olahraga',
      description: ' adalah langkah untuk membuka fasilitas olahraga yang dapat digunakan oleh masyarakat dengan tujuan untuk meningkatkan kesehatan, kebugaran, dan gaya hidup aktif.',
      imageSrc: '/images/kegiatan/olahraga.jpg',
    },
]
