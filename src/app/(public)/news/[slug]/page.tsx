import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { getNewsBySlug } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";
import ShareButtons from "@/components/ShareButtons";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post || !post.published) {
    return buildPageMetadata({
      title: "Berita Tidak Ditemukan",
      description: "Berita yang Anda cari tidak tersedia atau belum diterbitkan.",
      path: "/news",
    });
  }

  return {
    ...buildPageMetadata({
      title: post.title,
      description: post.excerpt,
      path: `/news/${post.slug}`,
      image: post.thumbnail,
      type: "article",
    }),
    keywords: [post.category, ...post.tags, "Yayasan Nurul Iman", "Masjid Nurul Iman", "DTA Nurul Iman"],
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/news/${post.slug}`,
      siteName: "Yayasan Nurul Iman",
      locale: "id_ID",
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [post.author.name],
      tags: post.tags,
      images: post.thumbnail ? [{ url: post.thumbnail, alt: post.title }] : undefined,
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

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
    </main>
  );
}
