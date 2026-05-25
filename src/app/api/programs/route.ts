import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { sanitizeHtml } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, slug, description, content, thumbnail, category, status, beneficiary } = body;

    if (!title || !slug || !description || !content || !category) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const program = await db.program.create({
      data: {
        title,
        slug,
        description: sanitizeHtml(description),
        content: sanitizeHtml(content),
        thumbnail,
        category,
        status,
        beneficiary,
      },
    });

    return NextResponse.json(program);
  } catch (error) {
    console.error("[PROGRAMS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status") as any;

    const programs = await db.program.findMany({
      where: {
        category: category || undefined,
        status: status || undefined,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(programs);
  } catch (error) {
    console.error("[PROGRAMS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
