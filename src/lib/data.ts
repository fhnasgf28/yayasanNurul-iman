import { db } from "@/lib/db";
import { refreshNewsIfStale } from "@/features/news/news-scraper";
import { cache } from "react";

export async function getPrograms(limit?: number) {
  try {
    const programs = await db.program.findMany({
      where: {
        status: "ACTIVE",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
    return programs;
  } catch (error) {
    console.error("getPrograms", error);
    return [];
  }
}

export const getProgramBySlug = cache(async function getProgramBySlug(slug: string) {
  try {
    const program = await db.program.findUnique({
      where: {
        slug,
      },
    });
    return program;
  } catch (error) {
    console.error("getProgramBySlug", error);
    return null;
  }
});

export async function getNews(limit?: number) {
  try {
    await refreshNewsIfStale().catch((error) => {
      console.error("refreshNewsIfStale", error);
    });

    const news = await db.news.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
    return news;
  } catch (error) {
    console.error("getNews", error);
    return [];
  }
}

export const getNewsBySlug = cache(async function getNewsBySlug(slug: string) {
  try {
    const post = await db.news.findUnique({
      where: {
        slug,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    console.error("getNewsBySlug", error);
    return null;
  }
});

export async function getRelatedNews(currentSlug: string, category: string, limit = 3) {
  try {
    // Prioritas: kategori sama, exclude artikel saat ini
    const sameCat = await db.news.findMany({
      where: { published: true, category, NOT: { slug: currentSlug } },
      select: {
        id: true, title: true, slug: true, excerpt: true,
        thumbnail: true, category: true, createdAt: true,
        author: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    if (sameCat.length >= limit) return sameCat;

    // Kurang dari limit — tambah berita terbaru dari kategori lain
    const needed = limit - sameCat.length;
    const excludeSlugs = [currentSlug, ...sameCat.map((n) => n.slug)];
    const others = await db.news.findMany({
      where: { published: true, slug: { notIn: excludeSlugs } },
      select: {
        id: true, title: true, slug: true, excerpt: true,
        thumbnail: true, category: true, createdAt: true,
        author: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: needed,
    });

    return [...sameCat, ...others];
  } catch (error) {
    console.error("getRelatedNews", error);
    return [];
  }
}


export async function getGallery() {
  try {
    const gallery = await db.gallery.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return gallery;
  } catch (error) {
    console.error("getGallery", error);
    return [];
  }
}
