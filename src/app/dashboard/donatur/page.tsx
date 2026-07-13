import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllDonatur } from "@/lib/donatur";
import DonaturManager from "@/components/admin/DonaturManager";

export const metadata = {
  title: "Data Donatur | Admin Yayasan Nurul Iman",
};

export default async function DonaturAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const donaturList = await getAllDonatur();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary sm:text-3xl">Data Donatur</h1>
          <p className="mt-1 text-sm leading-6 text-gray-500 sm:text-base">
            Kelola daftar donatur tetap dan rekam nominal donasi bulanan mereka.
          </p>
        </div>
        <div className="rounded-2xl border border-primary/10 bg-white px-4 py-3 text-xs font-semibold text-gray-500 shadow-sm">
          Data ini hanya tersedia untuk role ADMIN.
        </div>
      </div>

      <DonaturManager initialDonaturList={donaturList} />
    </div>
  );
}
