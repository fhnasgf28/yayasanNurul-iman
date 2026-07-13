import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { parseBulanInput } from "@/lib/donatur";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: donaturId } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    if (!body.bulan) {
      return new NextResponse("Bulan wajib diisi", { status: 400 });
    }

    const nominal = Number(body.nominal);
    if (!Number.isFinite(nominal) || nominal < 0) {
      return new NextResponse("Nominal tidak valid", { status: 400 });
    }

    const donation = await db.donaturDonation.upsert({
      where: {
        donaturId_bulan: {
          donaturId,
          bulan: parseBulanInput(String(body.bulan)),
        },
      },
      create: {
        donaturId,
        bulan: parseBulanInput(String(body.bulan)),
        nominal,
        catatan: body.catatan ? String(body.catatan).trim() : null,
      },
      update: {
        nominal,
        catatan: body.catatan ? String(body.catatan).trim() : null,
      },
    });

    return NextResponse.json({
      id: donation.id,
      donaturId: donation.donaturId,
      bulan: donation.bulan.toISOString(),
      nominal: Number(donation.nominal.toString()),
      catatan: donation.catatan,
      createdAt: donation.createdAt.toISOString(),
      updatedAt: donation.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error("[DONATUR_DONATION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: donationId } = await params;
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.donaturDonation.delete({ where: { id: donationId } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[DONATUR_DONATION_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
