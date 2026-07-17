import Link from "next/link";
import { getGallery } from "@/lib/data";

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const images = await getGallery();
  
  const categories = ["Semua", "Masjid Nurul Iman", "Kegiatan DTA", "Tahfidz", "Kegiatan PHBI", "Sosial"];

  const filteredImages = category && category !== "Semua"
    ? images.filter(img => img.category === category)
    : images;

  return (
    <main className="pt-20">
      <section className="bg-primary py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-islamic" />
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">Galeri Kegiatan</h1>
          <p className="text-white/70 text-lg md:text-xl italic font-arabic mt-4 text-secondary">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
          <p className="text-white/70 text-lg md:text-xl">Dokumentasi momen-momen berharga dalam setiap khidmah dan kegiatan di Yayasan Nurul Iman.</p>
        </div>
      </section>

      <section className="py-24 px-6 bg-islamic">
        <div className="max-w-7xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === "Semua" ? "/gallery" : `/gallery?category=${cat}`}
                className={`px-6 py-2 rounded-full text-xs md:text-sm font-bold transition-all border ${
                  (category === cat || (!category && cat === "Semua"))
                    ? "bg-secondary text-primary border-secondary shadow-md"
                    : "bg-white text-primary border-secondary/10 hover:border-secondary shadow-sm"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredImages.map((img) => (
              <div key={img.id} className="relative group overflow-hidden rounded-3xl break-inside-avoid shadow-lg hover:shadow-2xl transition-all duration-500 border-4 border-white">
                <img
                  src={img.imageUrl}
                  alt={img.caption || ""}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  {img.category && <span className="text-secondary text-[10px] font-bold uppercase tracking-widest mb-2">{img.category}</span>}
                  {img.caption && <p className="text-white font-serif font-bold text-xl">{img.caption}</p>}
                </div>
              </div>
            ))}
          </div>
          
          {filteredImages.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-secondary/10">
              <p className="text-gray-500 font-serif text-xl italic">Belum ada foto di galeri untuk kategori ini.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
