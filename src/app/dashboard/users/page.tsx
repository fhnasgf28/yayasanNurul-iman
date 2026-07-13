import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserManager from "@/components/admin/UserManager";

export const metadata = {
  title: "Manajemen User | Admin Yayasan Nurul Iman",
};

export default async function UsersAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary sm:text-3xl">
            Manajemen User
          </h1>
          <p className="mt-1 text-sm leading-6 text-gray-500 sm:text-base">
            Tambah, edit, atau hapus akun admin dan editor. Hanya ADMIN yang dapat mengakses halaman ini.
          </p>
        </div>
        <div className="rounded-2xl border border-primary/10 bg-white px-4 py-3 text-xs font-semibold text-gray-500 shadow-sm">
          Role: <span className="text-primary">ADMIN</span> • Akses penuh ke semua fitur
        </div>
      </div>

      {/* Info role */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
          <p className="text-sm font-bold text-primary">🛡️ Admin</p>
          <p className="mt-1 text-xs text-gray-500">
            Akses penuh — bisa mengelola semua konten, user, donatur, laporan donasi, dan pengaturan.
          </p>
        </div>
        <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-4">
          <p className="text-sm font-bold text-gray-700">✏️ Editor</p>
          <p className="mt-1 text-xs text-gray-500">
            Akses terbatas — bisa mengelola program, berita, galeri, dan prestasi. Tidak bisa akses donatur dan user.
          </p>
        </div>
      </div>

      <UserManager />
    </div>
  );
}
