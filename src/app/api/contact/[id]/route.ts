import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await req.json();
    const { isRead } = body;

    const message = await db.contactMessage.update({
      where: { id },
      data: { isRead },
    });

    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal memperbarui pesan" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;
    await db.contactMessage.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Pesan dihapus" });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menghapus pesan" },
      { status: 500 }
    );
  }
}
