import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { sanitizeHtml } from "@/lib/utils";

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
