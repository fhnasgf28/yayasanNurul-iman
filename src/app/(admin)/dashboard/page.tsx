import { db } from "@/lib/db";
import {
  Users,
  BookOpen,
  Newspaper,
  Image as ImageIcon,
  ArrowUpRight,
} from "lucide-react";

async function getStats() {
  const [programCount, newsCount, galleryCount] = await Promise.all([
    db.program.count(),
    db.news.count(),
    db.gallery.count(),
  ]);

  return [
    { label: "Total Program", value: programCount.toString(), icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Berita Publish", value: newsCount.toString(), icon: Newspaper, color: "text-green-600", bg: "bg-green-50" },
    { label: "Total Galeri", value: galleryCount.toString(), icon: ImageIcon, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Pengunjung", value: "0", icon: Users, color: "text-orange-600", bg: "bg-orange-50" },
  ];
}

async function getRecentNews() {
  return await db.news.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { author: { select: { name: true } } },
  });
}

export default async function DashboardPage() {
  const stats = await getStats();
  const recentNews = await getRecentNews();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-primary">Overview Dashboard</h1>
        <p className="text-gray-500">Pantau performa konten dan statistik yayasan Anda.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold text-primary">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-serif font-bold text-primary">Berita Terbaru</h3>
            <button className="text-accent text-sm font-bold flex items-center hover:underline">
              Lihat Semua <ArrowUpRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="space-y-6">
            {recentNews.map((news) => (
              <div key={news.id} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Newspaper size={20} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">{news.title}</p>
                    <p className="text-xs text-gray-400">Oleh {news.author.name}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  {new Date(news.createdAt).toLocaleDateString("id-ID")}
                </span>
              </div>
            ))}
            {recentNews.length === 0 && <p className="text-center text-gray-400 py-10">Belum ada aktivitas berita.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
