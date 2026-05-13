import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, slug, description, content, thumbnail, category, status, beneficiary } = body;

    const program = await db.program.update({
      where: {
        id,
      },
      data: {
        title,
        slug,
        description,
        content,
        thumbnail,
        category,
        status,
        beneficiary,
      },
    });

    return NextResponse.json(program);
  } catch (error) {
    console.error("[PROGRAM_PATCH]", error);
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

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const program = await db.program.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(program);
  } catch (error) {
    console.error("[PROGRAM_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
