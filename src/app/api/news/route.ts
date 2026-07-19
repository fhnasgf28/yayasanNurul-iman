import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { sanitizeHtml } from "@/lib/utils";
import { refreshNewsIfStale } from "@/features/news/news-scraper";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, slug, excerpt, content, thumbnail, category, tags, published } = body;

    if (!title || !slug || !excerpt || !content || !category) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const news = await db.news.create({
      data: {
        title,
        slug,
        excerpt: sanitizeHtml(excerpt),
        content: sanitizeHtml(content),
        thumbnail,
        category,
        tags: tags ? tags.split(",").map((tag: string) => tag.trim()) : [],
        published,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error("[NEWS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await refreshNewsIfStale().catch((error) => {
      console.error("[NEWS_AUTO_REFRESH]", error);
    });

    const { searchParams } = new URL(req.url);
    const published = searchParams.get("published") === "true";

    const news = await db.news.findMany({
      where: {
        published: published || undefined,
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
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error("[NEWS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const olderThanDays = parseInt(searchParams.get("olderThanDays") ?? "30", 10);

    if (isNaN(olderThanDays) || olderThanDays < 1) {
      return new NextResponse("Parameter olderThanDays tidak valid", { status: 400 });
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

    const { count } = await db.news.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    });

    return NextResponse.json({
      message: `Berhasil menghapus ${count} berita yang lebih lama dari ${olderThanDays} hari.`,
      deletedCount: count,
    });
  } catch (error) {
    console.error("[NEWS_DELETE_BULK]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
