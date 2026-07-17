import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  donationCategoryLabels,
  parseMonthInput,
  serializeDonationReport,
  type DonationCategoryValue,
} from "@/features/donation/finance";

function normalizeAmount(value: unknown) {
  const amount = Number(value);
  return Number.isFinite(amount) && amount >= 0 ? amount : null;
}

export async function GET() {
  try {
    const reports = await db.donationReport.findMany({
      orderBy: [{ month: "desc" }, { category: "asc" }],
    });

    return NextResponse.json(reports.map(serializeDonationReport));
  } catch (error) {
    console.error("[DONATION_REPORTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const category = body.category as DonationCategoryValue;
    const income = normalizeAmount(body.income);
    const expense = normalizeAmount(body.expense);

    if (!body.title || !body.month || !donationCategoryLabels[category] || income === null || expense === null) {
      return new NextResponse("Invalid report data", { status: 400 });
    }

    const report = await db.donationReport.create({
      data: {
        title: String(body.title),
        month: parseMonthInput(String(body.month)),
        category,
        income,
        expense,
        notes: body.notes ? String(body.notes) : null,
        published: Boolean(body.published),
      },
    });

    return NextResponse.json(serializeDonationReport(report));
  } catch (error) {
    console.error("[DONATION_REPORTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
