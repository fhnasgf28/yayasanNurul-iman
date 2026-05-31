import { db } from "@/lib/db";
import Link from "next/link";
import {
  BookOpen,
  Newspaper,
  Image as ImageIcon,
  ArrowUpRight,
  Plus,
  TrendingUp,
  UserPlus,
  HandCoins,
} from "lucide-react";

async function getStats() {
  const [programCount, newsCount, galleryCount, publishedCount, registrationCount, donationReportCount] = await Promise.all([
    db.program.count(),
    db.news.count(),
    db.gallery.count(),
    db.news.count({ where: { published: true } }),
    db.studentRegistration.count(),
    db.donationReport.count(),
  ]);

  return { programCount, newsCount, galleryCount, publishedCount, registrationCount, donationReportCount };
}

async function getRecentNews() {
  return await db.news.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
    include: { author: { select: { name: true } } },
  });
}

async function getRecentPrograms() {
  return await db.program.findMany({
    orderBy: { createdAt: "desc" },
    take: 4,
    select: { id: true, title: true, category: true, status: true },
  });
}

const statusColor: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  DRAFT: "bg-gray-100 text-gray-500",
  COMPLETED: "bg-blue-100 text-blue-600",
};

export default async function DashboardPage() {
  const stats = await getStats();
  const recentNews = await getRecentNews();
  const recentPrograms = await getRecentPrograms();

  const statCards = [
    {
      label: "Total Program",
      value: stats.programCount,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
      href: "/dashboard/programs",
    },
    {
      label: "Total Berita",
      value: stats.newsCount,
      icon: Newspaper,
      color: "text-green-600",
      bg: "bg-green-50",
      href: "/dashboard/news",
    },
    {
      label: "Berita Terbit",
      value: stats.publishedCount,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      href: "/dashboard/news",
    },
    {
      label: "Total Galeri",
      value: stats.galleryCount,
      icon: ImageIcon,
      color: "text-purple-600",
      bg: "bg-purple-50",
      href: "/dashboard/gallery",
    },
    {
      label: "Pendaftar Siswa",
      value: stats.registrationCount,
      icon: UserPlus,
      color: "text-amber-700",
      bg: "bg-amber-50",
      href: "/dashboard/registrations",
    },
    {
      label: "Laporan Donasi",
      value: stats.donationReportCount,
      icon: HandCoins,
      color: "text-teal-700",
      bg: "bg-teal-50",
      href: "/dashboard/donation-reports",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary">Overview Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Pantau performa konten dan statistik yayasan.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 hover:shadow-md hover:border-primary/10 transition-all group"
          >
            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl w-fit`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-3xl font-bold text-primary mt-1">{stat.value}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Aksi Cepat</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/news/new"
            className="flex items-center space-x-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors"
          >
            <Plus size={16} />
            <span>Berita Baru</span>
          </Link>
          <Link
            href="/dashboard/programs/new"
            className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-primary/20 text-primary rounded-xl text-sm font-bold hover:bg-primary/5 transition-colors"
          >
            <Plus size={16} />
            <span>Program Baru</span>
          </Link>
          <Link
            href="/dashboard/gallery"
            className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors"
          >
            <ImageIcon size={16} />
            <span>Kelola Galeri</span>
          </Link>
          <Link
            href="/dashboard/registrations"
            className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors"
          >
            <UserPlus size={16} />
            <span>Pendaftaran Siswa</span>
          </Link>
          <Link
            href="/dashboard/donation-reports"
            className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors"
          >
            <HandCoins size={16} />
            <span>Laporan Donasi</span>
          </Link>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent News */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
            <h3 className="font-serif font-bold text-primary">Berita Terbaru</h3>
            <Link
              href="/dashboard/news"
              className="text-xs text-primary font-bold flex items-center hover:underline"
            >
              Lihat Semua <ArrowUpRight size={14} className="ml-0.5" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentNews.map((news) => (
              <div key={news.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/60 transition-colors">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                    <Newspaper size={16} className="text-gray-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-primary truncate">{news.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{news.author.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 shrink-0 ml-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      news.published ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {news.published ? "Terbit" : "Draft"}
                  </span>
                  <span className="text-xs text-gray-400 hidden sm:block">
                    {new Date(news.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                  </span>
                </div>
              </div>
            ))}
            {recentNews.length === 0 && (
              <div className="py-12 text-center text-gray-400 text-sm">Belum ada berita.</div>
            )}
          </div>
        </div>

        {/* Recent Programs */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
            <h3 className="font-serif font-bold text-primary">Program Aktif</h3>
            <Link
              href="/dashboard/programs"
              className="text-xs text-primary font-bold flex items-center hover:underline"
            >
              Lihat Semua <ArrowUpRight size={14} className="ml-0.5" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentPrograms.map((program) => (
              <div key={program.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/60 transition-colors">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-primary truncate">{program.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{program.category}</p>
                </div>
                <span
                  className={`ml-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase shrink-0 ${
                    statusColor[program.status] ?? "bg-gray-100 text-gray-500"
                  }`}
                >
                  {program.status}
                </span>
              </div>
            ))}
            {recentPrograms.length === 0 && (
              <div className="py-12 text-center text-gray-400 text-sm">Belum ada program.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
