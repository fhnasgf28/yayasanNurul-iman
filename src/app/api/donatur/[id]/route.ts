import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { serializeDonatur } from "@/lib/donatur";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    if (!body.nama || typeof body.nama !== "string" || !body.nama.trim()) {
      return new NextResponse("Nama donatur wajib diisi", { status: 400 });
    }

    const donatur = await db.donatur.update({
      where: { id },
      data: {
        nama: String(body.nama).trim(),
        telepon: body.telepon ? String(body.telepon).trim() : null,
        alamat: body.alamat ? String(body.alamat).trim() : null,
        catatan: body.catatan ? String(body.catatan).trim() : null,
        aktif: body.aktif !== undefined ? Boolean(body.aktif) : true,
      },
      include: { donations: { orderBy: { bulan: "desc" } } },
    });

    return NextResponse.json(serializeDonatur(donatur));
  } catch (error) {
    console.error("[DONATUR_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.donatur.delete({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[DONATUR_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
