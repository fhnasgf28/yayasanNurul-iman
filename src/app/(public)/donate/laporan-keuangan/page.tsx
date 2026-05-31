import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BadgeCheck, Download, FileText, HandCoins, TrendingDown, WalletCards } from "lucide-react";
import {
  donationCategoryLabels,
  formatCurrency,
  groupDonationReportsByMonth,
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
  const monthlyGroups = groupDonationReportsByMonth(reports);
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
                {latestMonth ? monthlyGroups[0]?.label : "Belum Ada Data"}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Semua nominal ditampilkan berdasarkan laporan yang sudah ditandai publik oleh admin yayasan.
              </p>
              <Link
                href="/api/donation-reports/pdf"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-secondary px-5 py-3 text-sm font-bold text-primary transition-transform hover:scale-[1.02]"
              >
                <FileText size={17} />
                Unduh PDF
              </Link>
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

          <div className="rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-serif font-bold text-primary">Laporan per Bulan</h2>
                <p className="mt-1 text-sm text-gray-500">Donasi tambahan akan muncul sebagai entri baru di periode bulan yang sama.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/api/donation-reports/pdf" className="inline-flex items-center text-sm font-bold text-primary hover:underline">
                  <FileText size={16} className="mr-1" />
                  PDF
                </Link>
                <Link href="/api/donation-reports/export" className="inline-flex items-center text-sm font-bold text-primary hover:underline">
                  <Download size={16} className="mr-1" />
                  CSV
                </Link>
                <Link href="/donate" className="inline-flex items-center text-sm font-bold text-secondary hover:underline">
                  Donasi Sekarang <ArrowUpRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            <div className="space-y-5 p-4 sm:p-6">
              {monthlyGroups.map((group) => (
                <section key={group.month} className="overflow-hidden rounded-3xl border border-secondary/10 bg-[#FDFAF4]">
                  <div className="grid gap-4 border-b border-secondary/10 bg-white px-5 py-5 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Periode</p>
                      <h3 className="mt-1 text-2xl font-serif font-bold text-primary">{group.label}</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-right">
                      <div>
                        <p className="text-[11px] font-bold uppercase text-gray-400">Masuk</p>
                        <p className="mt-1 text-sm font-bold text-emerald-700">{formatCurrency(group.summary.income)}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase text-gray-400">Keluar</p>
                        <p className="mt-1 text-sm font-bold text-amber-700">{formatCurrency(group.summary.expense)}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase text-gray-400">Saldo</p>
                        <p className="mt-1 text-sm font-bold text-primary">{formatCurrency(group.summary.balance)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="max-h-[20rem] divide-y divide-gray-100 overflow-y-auto bg-white md:hidden">
                    {group.reports.map((report) => (
                      <article key={report.id} className="px-4 py-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-primary">{report.title}</p>
                            <p className="mt-1 text-xs font-semibold text-secondary">{donationCategoryLabels[report.category]}</p>
                          </div>
                          <p className="shrink-0 text-sm font-bold text-primary">{formatCurrency(report.balance)}</p>
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-3 text-xs">
                          <span className="font-semibold text-emerald-700">Masuk {formatCurrency(report.income)}</span>
                          <span className="font-semibold text-amber-700">Keluar {formatCurrency(report.expense)}</span>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="hidden gap-4 p-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    {group.reports.map((report) => (
                      <article key={report.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-start justify-between gap-4">
                          <div>
                            <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">
                              {donationCategoryLabels[report.category]}
                            </span>
                            <h4 className="mt-3 text-base font-bold text-primary">{report.title}</h4>
                          </div>
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                            {formatCurrency(report.balance)}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="rounded-2xl bg-emerald-50 px-4 py-3">
                            <p className="text-[11px] font-bold uppercase text-emerald-700/70">Pemasukan</p>
                            <p className="mt-1 font-bold text-emerald-700">{formatCurrency(report.income)}</p>
                          </div>
                          <div className="rounded-2xl bg-amber-50 px-4 py-3">
                            <p className="text-[11px] font-bold uppercase text-amber-700/70">Pengeluaran</p>
                            <p className="mt-1 font-bold text-amber-700">{formatCurrency(report.expense)}</p>
                          </div>
                        </div>

                        {report.notes && <p className="mt-4 text-sm leading-6 text-gray-500">{report.notes}</p>}
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {monthlyGroups.length === 0 && (
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
