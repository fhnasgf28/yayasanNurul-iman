import { db } from "@/lib/db";

export type DonaturItem = {
  id: string;
  nama: string;
  telepon: string | null;
  alamat: string | null;
  catatan: string | null;
  aktif: boolean;
  createdAt: string;
  updatedAt: string;
  donations: DonaturDonationItem[];
};

export type DonaturDonationItem = {
  id: string;
  donaturId: string;
  bulan: string;
  nominal: number;
  catatan: string | null;
  createdAt: string;
  updatedAt: string;
};

export function serializeDonatur(donatur: {
  id: string;
  nama: string;
  telepon: string | null;
  alamat: string | null;
  catatan: string | null;
  aktif: boolean;
  createdAt: Date;
  updatedAt: Date;
  donations: {
    id: string;
    donaturId: string;
    bulan: Date;
    nominal: { toString(): string };
    catatan: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
}): DonaturItem {
  return {
    id: donatur.id,
    nama: donatur.nama,
    telepon: donatur.telepon,
    alamat: donatur.alamat,
    catatan: donatur.catatan,
    aktif: donatur.aktif,
    createdAt: donatur.createdAt.toISOString(),
    updatedAt: donatur.updatedAt.toISOString(),
    donations: donatur.donations.map((d) => ({
      id: d.id,
      donaturId: d.donaturId,
      bulan: d.bulan.toISOString(),
      nominal: Number(d.nominal.toString()),
      catatan: d.catatan,
      createdAt: d.createdAt.toISOString(),
      updatedAt: d.updatedAt.toISOString(),
    })),
  };
}

export async function getAllDonatur() {
  const donaturList = await db.donatur.findMany({
    orderBy: [{ aktif: "desc" }, { nama: "asc" }],
    include: {
      donations: {
        orderBy: { bulan: "desc" },
      },
    },
  });

  return donaturList.map(serializeDonatur);
}

export function formatBulan(value: string | Date) {
  return new Date(value).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function toBulanInputValue(value: string | Date) {
  const date = new Date(value);
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function parseBulanInput(value: string) {
  return new Date(`${value}-01T00:00:00.000Z`);
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
