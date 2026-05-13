import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { imageUrl, caption, category } = body;

    if (!imageUrl) {
      return new NextResponse("Missing image URL", { status: 400 });
    }

    const gallery = await db.gallery.create({
      data: {
        imageUrl,
        caption,
        category,
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("[GALLERY_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const gallery = await db.gallery.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.error("[GALLERY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
