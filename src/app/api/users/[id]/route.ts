import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

type Params = { params: Promise<{ id: string }> };

// PATCH — edit nama, role, atau password user
export async function PATCH(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { name, role, password } = await req.json();

  // Cegah admin hapus role dirinya sendiri
  if (id === session.user.id && role && role !== "ADMIN") {
    return NextResponse.json({ error: "Tidak bisa mengubah role akun sendiri" }, { status: 400 });
  }

  const updateData: Record<string, unknown> = {};
  if (name?.trim()) updateData.name = name.trim();
  if (role === "ADMIN" || role === "EDITOR") updateData.role = role;
  if (password?.trim()) {
    if (password.length < 6) {
      return NextResponse.json({ error: "Password minimal 6 karakter" }, { status: 400 });
    }
    updateData.password = await bcrypt.hash(password, 10);
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: "Tidak ada data yang diubah" }, { status: 400 });
  }

  const user = await db.user.update({
    where: { id },
    data: updateData,
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  return NextResponse.json(user);
}

// DELETE — hapus user
export async function DELETE(_req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Cegah admin menghapus akunnya sendiri
  if (id === session.user.id) {
    return NextResponse.json({ error: "Tidak bisa menghapus akun sendiri" }, { status: 400 });
  }

  // Pastikan minimal ada 1 admin yang tersisa
  const adminCount = await db.user.count({ where: { role: "ADMIN" } });
  const targetUser = await db.user.findUnique({ where: { id }, select: { role: true } });

  if (targetUser?.role === "ADMIN" && adminCount <= 1) {
    return NextResponse.json({ error: "Tidak bisa menghapus satu-satunya Admin" }, { status: 400 });
  }

  await db.user.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
