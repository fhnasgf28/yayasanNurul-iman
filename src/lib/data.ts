import { db } from "@/lib/db";

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

export async function getProgramBySlug(slug: string) {
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
}

export async function getNews(limit?: number) {
  try {
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

export async function getNewsBySlug(slug: string) {
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
