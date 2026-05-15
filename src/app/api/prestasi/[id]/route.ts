import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const item = await db.prestasi.findUnique({ where: { id } });
    if (!item) return new NextResponse("Not Found", { status: 404 });
    return NextResponse.json(item);
  } catch {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });
    const { id } = await params;
    const body = await req.json();
    const item = await db.prestasi.update({ where: { id }, data: body });
    return NextResponse.json(item);
  } catch {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });
    const { id } = await params;
    await db.prestasi.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
