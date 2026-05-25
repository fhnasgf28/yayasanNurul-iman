import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { sanitizeHtml } from "@/lib/utils";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, slug, excerpt, content, thumbnail, category, tags, published } = body;

    const news = await db.news.update({
      where: {
        id,
      },
      data: {
        title,
        slug,
        excerpt: excerpt ? sanitizeHtml(excerpt) : undefined,
        content: content ? sanitizeHtml(content) : undefined,
        thumbnail,
        category,
        tags: tags ? tags.split(",").map((tag: string) => tag.trim()) : [],
        published,
      },
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error("[NEWS_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const news = await db.news.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error("[NEWS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
