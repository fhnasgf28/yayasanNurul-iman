import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { getNewsBySlug, getRelatedNews } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";
import ShareButtons from "@/components/ShareButtons";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://yayasannuruliman.clipperyt.online";

  if (!post || !post.published) {
    return buildPageMetadata({
      title: "Berita Tidak Ditemukan",
      description: "Berita yang Anda cari tidak tersedia atau belum diterbitkan.",
      path: "/news",
    });
  }

  const ogImageUrl = `${siteUrl}/api/og/news?slug=${encodeURIComponent(post.slug)}`;

  return {
    ...buildPageMetadata({
      title: post.title,
      description: post.excerpt,
      path: `/news/${post.slug}`,
      type: "article",
    }),
    keywords: [post.category, ...post.tags, "Yayasan Nurul Iman", "Masjid Nurul Iman", "DTA Nurul Iman"],
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/news/${post.slug}`,
      siteName: "Yayasan Nurul Iman",
      locale: "id_ID",
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author.name],
      tags: post.tags,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const related = await getRelatedNews(post.slug, post.category, 3);

  return (
    <main className="pt-20">
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-8">
            <Link href="/news" className="inline-flex items-center text-accent font-bold hover:underline">
              <ArrowLeft size={20} className="mr-2" /> Kembali ke Berita
            </Link>
            
            <div className="space-y-6">
              <span className="bg-accent/10 text-accent text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary leading-tight">
                {post.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <User size={18} className="text-accent" />
                  <span className="font-bold text-primary">{post.author.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={18} className="text-accent" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.thumbnail && (
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-xl max-w-none text-gray-600 prose-headings:font-serif prose-headings:text-primary prose-blockquote:border-accent prose-blockquote:bg-base prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer of Article */}
          <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center space-x-4 flex-wrap gap-y-2">
               <span className="font-bold text-primary">Tag:</span>
               <div className="flex flex-wrap gap-2">
                 {post.tags.map(tag => (
                   <span key={tag} className="bg-base px-3 py-1 rounded-full text-xs text-gray-500">#{tag}</span>
                 ))}
               </div>
            </div>

            <ShareButtons
              title={post.title}
              url={`${process.env.NEXT_PUBLIC_SITE_URL ?? "https://yayasannuruliman.clipperyt.online"}/news/${post.slug}`}
              excerpt={post.excerpt}
            />
          </div>
        </div>
      </section>

      {/* Related News Section */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 bg-[#FDFAF4] py-20 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-end justify-between mb-12">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Baca Juga</p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Berita Lainnya</h2>
              </div>
              <Link
                href="/news"
                className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent transition-colors group"
              >
                Lihat Semua Berita
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item, idx) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-primary/5">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                        <span className="text-4xl opacity-30">📰</span>
                      </div>
                    )}
                    {/* Category badge */}
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      {item.category}
                    </span>
                    {/* Featured label for first item */}
                    {idx === 0 && (
                      <span className="absolute top-4 right-4 bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        Terbaru
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 gap-3">
                    <h3 className="font-serif font-bold text-primary text-lg leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t border-gray-50">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(item.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {item.author.name}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile: Lihat Semua */}
            <div className="mt-10 flex md:hidden justify-center">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all"
              >
                Lihat Semua Berita <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
