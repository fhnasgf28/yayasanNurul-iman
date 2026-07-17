import NewsCard from "@/features/news/NewsCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getNews } from "@/lib/data";

export default async function NewsPage() {
  const news = await getNews();
  const featured = news[0];

  return (
    <main className="pt-20">
      <section className="bg-primary py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-islamic" />
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">Berita & Artikel</h1>
          <p className="text-white/70 text-lg md:text-xl">Ikuti terus perkembangan setiap langkah kebaikan dan kegiatan dakwah di Yayasan Nurul Iman.</p>
        </div>
      </section>

      <section className="py-24 px-6 bg-islamic">
        <div className="max-w-7xl mx-auto space-y-24">
          {featured ? (
            <div className="relative h-[600px] rounded-3xl overflow-hidden group border-8 border-white shadow-xl">
              {featured.thumbnail && (
                <img
                  src={featured.thumbnail}
                  alt={featured.title}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                  <div className="max-w-3xl space-y-6">
                      <span className="bg-secondary text-primary text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                          Terbaru
                      </span>
                      <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                          {featured.title}
                      </h2>
                      <p className="text-white/70 text-lg line-clamp-2">
                          {featured.excerpt}
                      </p>
                      <Link href={`/news/${featured.slug}`} className="inline-flex items-center text-secondary font-bold group">
                          Baca Selengkapnya <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                      </Link>
                  </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-secondary/10">
              <p className="text-gray-500 font-serif text-xl italic">Belum ada berita yang diterbitkan saat ini.</p>
            </div>
          )}

          {news.length > 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {news.slice(1).map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
