import { db } from "@/lib/db";
import type { DonaturItem } from "@/lib/donatur-shared";

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
