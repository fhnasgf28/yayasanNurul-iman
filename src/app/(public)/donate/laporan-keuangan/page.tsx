import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BadgeCheck, HandCoins, TrendingDown, WalletCards } from "lucide-react";
import {
  donationCategoryLabels,
  formatCurrency,
  formatMonth,
  summarizeDonationReports,
  summarizeDonationReportsByCategory,
} from "@/lib/finance";
import { getDonationReports } from "@/lib/finance-data";

export const metadata: Metadata = {
  title: "Laporan Keuangan Donasi",
  description:
    "Ringkasan transparansi donasi Yayasan Nurul Iman: pemasukan, pengeluaran, saldo, dan laporan bulanan per kategori program.",
};

export default async function DonationTransparencyPage() {
  const reports = await getDonationReports({ publishedOnly: true });
  const summary = summarizeDonationReports(reports);
  const categorySummaries = summarizeDonationReportsByCategory(reports);
  const latestMonth = reports[0]?.month;

  const stats = [
    {
      label: "Total Pemasukan",
      value: formatCurrency(summary.income),
      icon: HandCoins,
      className: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Total Pengeluaran",
      value: formatCurrency(summary.expense),
      icon: TrendingDown,
      className: "bg-amber-50 text-amber-700",
    },
    {
      label: "Saldo Tercatat",
      value: formatCurrency(summary.balance),
      icon: WalletCards,
      className: summary.balance >= 0 ? "bg-primary/10 text-primary" : "bg-red-50 text-red-700",
    },
  ];

  return (
    <main className="pt-20">
      <section className="relative overflow-hidden bg-primary px-6 py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-islamic opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <Link href="/donate" className="mb-8 inline-flex items-center text-sm font-bold text-secondary hover:underline">
            <ArrowLeft size={18} className="mr-2" />
            Kembali ke Donasi
          </Link>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
                <BadgeCheck size={16} />
                Transparansi Amanah
              </div>
              <h1 className="text-4xl font-serif font-bold leading-tight sm:text-5xl lg:text-6xl">
                Laporan Donasi & Keuangan
              </h1>
              <p className="mt-6 text-base leading-8 text-white/75 sm:text-lg">
                Ringkasan pemasukan, pengeluaran, dan saldo donasi Yayasan Nurul Iman yang dipublikasikan berkala sebagai bentuk pertanggungjawaban kepada jamaah dan donatur.
              </p>
            </div>

            <div className="rounded-3xl border border-white/12 bg-white/10 p-6 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">Laporan Terbaru</p>
              <p className="mt-2 text-3xl font-serif font-bold text-secondary">
                {latestMonth ? formatMonth(latestMonth) : "Belum Ada Data"}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Semua nominal ditampilkan berdasarkan laporan yang sudah ditandai publik oleh admin yayasan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-islamic px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div key={stat.label} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${stat.className}`}>
                    <Icon size={22} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">{stat.label}</p>
                  <p className="mt-2 text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
                </div>
              );
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {categorySummaries.map((category) => (
              <article key={category.value} className="rounded-3xl border border-secondary/10 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <h2 className="text-lg font-serif font-bold text-primary">{category.label}</h2>
                  <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">
                    {category.reportCount}
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-400">Masuk</span>
                    <span className="font-bold text-emerald-700">{formatCurrency(category.income)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-400">Keluar</span>
                    <span className="font-bold text-amber-700">{formatCurrency(category.expense)}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between gap-4">
                    <span className="font-semibold text-primary">Saldo</span>
                    <span className="font-bold text-primary">{formatCurrency(category.balance)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-serif font-bold text-primary">Daftar Laporan Bulanan</h2>
                <p className="mt-1 text-sm text-gray-500">Rincian laporan yang sudah dipublikasikan oleh admin.</p>
              </div>
              <Link href="/donate" className="inline-flex items-center text-sm font-bold text-secondary hover:underline">
                Donasi Sekarang <ArrowUpRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="bg-gray-50 text-xs font-bold uppercase tracking-[0.16em] text-gray-400">
                    <th className="px-6 py-4">Periode</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4">Judul</th>
                    <th className="px-6 py-4 text-right">Pemasukan</th>
                    <th className="px-6 py-4 text-right">Pengeluaran</th>
                    <th className="px-6 py-4 text-right">Saldo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {reports.map((report) => (
                    <tr key={report.id} className="text-sm text-gray-600">
                      <td className="px-6 py-4 font-semibold text-primary">{formatMonth(report.month)}</td>
                      <td className="px-6 py-4">{donationCategoryLabels[report.category]}</td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-700">{report.title}</p>
                        {report.notes && <p className="mt-1 line-clamp-1 text-xs text-gray-400">{report.notes}</p>}
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-emerald-700">{formatCurrency(report.income)}</td>
                      <td className="px-6 py-4 text-right font-bold text-amber-700">{formatCurrency(report.expense)}</td>
                      <td className="px-6 py-4 text-right font-bold text-primary">{formatCurrency(report.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {reports.length === 0 && (
              <div className="px-6 py-16 text-center text-sm text-gray-400">
                Belum ada laporan keuangan yang dipublikasikan.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
