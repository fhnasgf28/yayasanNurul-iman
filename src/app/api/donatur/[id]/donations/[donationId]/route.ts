import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; donationId: string }> }
) {
  try {
    const { donationId } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.donaturDonation.delete({ where: { id: donationId } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[DONATUR_DONATION_ENTRY_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
