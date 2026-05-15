import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const items = await db.prestasi.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(items);
  } catch {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });
    const body = await req.json();
    const item = await db.prestasi.create({ data: body });
    return NextResponse.json(item);
  } catch {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
