import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDonationReports } from "@/lib/finance-data";
import DonationReportManager from "@/components/admin/DonationReportManager";

export default async function DonationReportsAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const reports = await getDonationReports();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary sm:text-3xl">Laporan Donasi & Keuangan</h1>
          <p className="mt-1 text-sm leading-6 text-gray-500 sm:text-base">
            Input laporan bulanan untuk transparansi donasi publik.
          </p>
        </div>
        <div className="rounded-2xl border border-primary/10 bg-white px-4 py-3 text-xs font-semibold text-gray-500 shadow-sm">
          Data ini hanya tersedia untuk role ADMIN.
        </div>
      </div>

      <DonationReportManager initialReports={reports} />
    </div>
  );
}
