import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getAllDonatur } from "@/lib/donatur";
import { formatBulan, formatRupiah } from "@/lib/donatur-shared";
import * as XLSX from "xlsx";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const donaturList = await getAllDonatur();

    // ─── Sheet 1: Ringkasan Donatur ──────────────────────────────────────────
    const thisMonth = new Date().toISOString().slice(0, 7);

    const summaryRows = donaturList.map((d, i) => {
      const totalDonasi = d.donations.reduce((sum, don) => sum + don.nominal, 0);
      const donasiBulanIni = d.donations
        .filter((don) => don.bulan.slice(0, 7) === thisMonth)
        .reduce((sum, don) => sum + don.nominal, 0);
      const latestDonation = d.donations[0];

      return {
        No: i + 1,
        "Nama Donatur": d.nama,
        Telepon: d.telepon ?? "-",
        Alamat: d.alamat ?? "-",
        Status: d.aktif ? "Aktif" : "Nonaktif",
        "Donasi Terakhir (Bulan)": latestDonation ? formatBulan(latestDonation.bulan) : "-",
        "Donasi Terakhir (Nominal)": latestDonation ? latestDonation.nominal : 0,
        "Donasi Bulan Ini": donasiBulanIni,
        "Total Donasi": totalDonasi,
        "Jumlah Donasi": d.donations.length,
        Catatan: d.catatan ?? "-",
        "Terdaftar Sejak": new Date(d.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      };
    });

    const wsSummary = XLSX.utils.json_to_sheet(summaryRows);

    // Atur lebar kolom
    wsSummary["!cols"] = [
      { wch: 4 },   // No
      { wch: 30 },  // Nama
      { wch: 18 },  // Telepon
      { wch: 35 },  // Alamat
      { wch: 10 },  // Status
      { wch: 22 },  // Donasi Terakhir Bulan
      { wch: 22 },  // Donasi Terakhir Nominal
      { wch: 20 },  // Donasi Bulan Ini
      { wch: 20 },  // Total Donasi
      { wch: 15 },  // Jumlah Donasi
      { wch: 30 },  // Catatan
      { wch: 22 },  // Terdaftar
    ];

    // ─── Sheet 2: Riwayat Donasi Lengkap ──────────────────────────────────────
    const historyRows: Record<string, string | number>[] = [];
    let rowNum = 1;

    for (const d of donaturList) {
      for (const don of d.donations) {
        historyRows.push({
          No: rowNum++,
          "Nama Donatur": d.nama,
          Telepon: d.telepon ?? "-",
          "Status Donatur": d.aktif ? "Aktif" : "Nonaktif",
          "Periode Bulan": formatBulan(don.bulan),
          "Tahun-Bulan": don.bulan.slice(0, 7),
          "Nominal (Rp)": don.nominal,
          "Nominal (Format)": formatRupiah(don.nominal),
          Keterangan: don.catatan ?? "-",
          "Tanggal Input": new Date(don.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        });
      }
    }

    const wsHistory = XLSX.utils.json_to_sheet(
      historyRows.length > 0
        ? historyRows
        : [{ Keterangan: "Belum ada riwayat donasi." }]
    );

    wsHistory["!cols"] = [
      { wch: 4 },   // No
      { wch: 30 },  // Nama
      { wch: 18 },  // Telepon
      { wch: 14 },  // Status
      { wch: 22 },  // Periode
      { wch: 12 },  // Tahun-Bulan
      { wch: 18 },  // Nominal
      { wch: 22 },  // Nominal Format
      { wch: 30 },  // Keterangan
      { wch: 22 },  // Tanggal Input
    ];

    // ─── Sheet 3: Rekap Per Bulan ─────────────────────────────────────────────
    const rekapByMonth: Record<string, { bulan: string; total: number; jumlahTransaksi: number; jumlahDonatur: Set<string> }> = {};

    for (const d of donaturList) {
      for (const don of d.donations) {
        const key = don.bulan.slice(0, 7);
        if (!rekapByMonth[key]) {
          rekapByMonth[key] = {
            bulan: formatBulan(don.bulan),
            total: 0,
            jumlahTransaksi: 0,
            jumlahDonatur: new Set(),
          };
        }
        rekapByMonth[key].total += don.nominal;
        rekapByMonth[key].jumlahTransaksi += 1;
        rekapByMonth[key].jumlahDonatur.add(d.id);
      }
    }

    const rekapRows = Object.entries(rekapByMonth)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([key, val], i) => ({
        No: i + 1,
        "Periode (Tahun-Bulan)": key,
        "Periode": val.bulan,
        "Jumlah Donatur": val.jumlahDonatur.size,
        "Jumlah Transaksi": val.jumlahTransaksi,
        "Total Donasi (Rp)": val.total,
        "Total Donasi (Format)": formatRupiah(val.total),
      }));

    const wsRekap = XLSX.utils.json_to_sheet(
      rekapRows.length > 0
        ? rekapRows
        : [{ Keterangan: "Belum ada data donasi." }]
    );

    wsRekap["!cols"] = [
      { wch: 4 },
      { wch: 20 },
      { wch: 22 },
      { wch: 18 },
      { wch: 18 },
      { wch: 20 },
      { wch: 24 },
    ];

    // ─── Buat Workbook ────────────────────────────────────────────────────────
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsSummary, "Data Donatur");
    XLSX.utils.book_append_sheet(wb, wsHistory, "Riwayat Donasi");
    XLSX.utils.book_append_sheet(wb, wsRekap, "Rekap Per Bulan");

    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    const tanggal = new Date().toISOString().slice(0, 10);
    const filename = `data-donatur-yayasan-nurul-iman-${tanggal}.xlsx`;

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[DONATUR_EXCEL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
