import { db } from "@/lib/db";
import { serializeDonationReport } from "@/lib/finance";

export async function getDonationReports({ publishedOnly = false } = {}) {
  const reports = await db.donationReport.findMany({
    where: publishedOnly ? { published: true } : undefined,
    orderBy: [{ month: "desc" }, { category: "asc" }],
  });

  return reports.map(serializeDonationReport);
}
