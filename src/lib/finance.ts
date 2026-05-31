export const donationCategories = [
  { value: "OPERASIONAL_MASJID", label: "Operasional Masjid" },
  { value: "RENOVASI", label: "Renovasi" },
  { value: "BEASISWA_SANTRI", label: "Beasiswa Santri" },
  { value: "TAHFIDZ", label: "Tahfidz" },
] as const;

export type DonationCategoryValue = (typeof donationCategories)[number]["value"];

export const donationCategoryLabels: Record<DonationCategoryValue, string> = donationCategories.reduce(
  (acc, category) => {
    acc[category.value] = category.label;
    return acc;
  },
  {} as Record<DonationCategoryValue, string>
);

export type DonationReportItem = {
  id: string;
  title: string;
  month: string;
  category: DonationCategoryValue;
  income: number;
  expense: number;
  balance: number;
  notes: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMonth(value: string | Date) {
  return new Date(value).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
}

export function parseMonthInput(value: string) {
  return new Date(`${value}-01T00:00:00.000Z`);
}

export function toMonthInputValue(value: string | Date) {
  const date = new Date(value);
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function serializeDonationReport(report: {
  id: string;
  title: string;
  month: Date;
  category: DonationCategoryValue;
  income: { toString(): string };
  expense: { toString(): string };
  notes: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}): DonationReportItem {
  const income = Number(report.income.toString());
  const expense = Number(report.expense.toString());

  return {
    id: report.id,
    title: report.title,
    month: report.month.toISOString(),
    category: report.category,
    income,
    expense,
    balance: income - expense,
    notes: report.notes,
    published: report.published,
    createdAt: report.createdAt.toISOString(),
    updatedAt: report.updatedAt.toISOString(),
  };
}

export function summarizeDonationReports(reports: DonationReportItem[]) {
  return reports.reduce(
    (summary, report) => {
      summary.income += report.income;
      summary.expense += report.expense;
      summary.balance += report.balance;
      return summary;
    },
    { income: 0, expense: 0, balance: 0 }
  );
}

export function summarizeDonationReportsByCategory(reports: DonationReportItem[]) {
  return donationCategories.map((category) => {
    const categoryReports = reports.filter((report) => report.category === category.value);
    const summary = summarizeDonationReports(categoryReports);

    return {
      ...category,
      ...summary,
      reportCount: categoryReports.length,
    };
  });
}
