import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-auth";
import { updateRegistrationStatusSchema } from "@/lib/student-registration";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: Request, { params }: RouteParams) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const result = updateRegistrationStatusSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message ?? "Status pendaftaran tidak valid";
      return NextResponse.json(
        { message: firstError, errors: result.error.issues },
        { status: 400 }
      );
    }

    const registration = await db.studentRegistration.update({
      where: { id },
      data: {
        status: result.data.status,
        reviewedAt: result.data.status === "NEW" ? null : new Date(),
      },
    });

    return NextResponse.json(registration);
  } catch (error) {
    console.error("[STUDENT_REGISTRATION_PATCH]", error);
    return NextResponse.json(
      { message: "Gagal memperbarui status pendaftaran" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, { params }: RouteParams) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    await db.studentRegistration.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Pendaftaran dihapus" });
  } catch (error) {
    console.error("[STUDENT_REGISTRATION_DELETE]", error);
    return NextResponse.json(
      { message: "Gagal menghapus pendaftaran" },
      { status: 500 }
    );
  }
}
