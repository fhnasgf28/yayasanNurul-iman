import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getDonationReports } from "@/lib/finance-data";
import { donationCategoryLabels, formatMonth } from "@/lib/finance";

function csvCell(value: string | number) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const includeDraft = searchParams.get("includeDraft") === "true";

    if (includeDraft) {
      const session = await getServerSession(authOptions);
      if (!session || session.user.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
      }
    }

    const reports = await getDonationReports({ publishedOnly: !includeDraft });
    const rows = [
      ["Periode", "Kategori", "Judul", "Pemasukan", "Pengeluaran", "Saldo", "Status", "Catatan"],
      ...reports.map((report) => [
        formatMonth(report.month),
        donationCategoryLabels[report.category],
        report.title,
        report.income,
        report.expense,
        report.balance,
        report.published ? "Publik" : "Draft",
        report.notes ?? "",
      ]),
    ];

    const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="laporan-donasi-yayasan-nurul-iman.csv"`,
      },
    });
  } catch (error) {
    console.error("[DONATION_REPORTS_EXPORT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
