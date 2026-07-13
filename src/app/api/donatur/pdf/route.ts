import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getAllDonatur, formatBulan, formatRupiah } from "@/lib/donatur";

type PdfColor = [number, number, number];

const pageWidth = 595.28;
const pageHeight = 841.89;
const marginX = 42;
const primary: PdfColor = [26, 77, 46];
const secondary: PdfColor = [201, 168, 76];
const muted: PdfColor = [95, 105, 116];
const light: PdfColor = [253, 250, 244];
const lightGreen: PdfColor = [235, 246, 239];
const border: PdfColor = [218, 224, 230];

function sanitizeText(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "-");
}

function escapePdfText(value: string) {
  return sanitizeText(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function textWidth(text: string, fontSize: number) {
  return sanitizeText(text).length * fontSize * 0.48;
}

function wrapText(text: string, maxWidth: number, fontSize: number) {
  const words = sanitizeText(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (textWidth(candidate, fontSize) <= maxWidth || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }

  if (line) lines.push(line);
  return lines.length ? lines : ["-"];
}

class PdfBuilder {
  streams: string[] = [""];
  currentPage = 0;
  y = pageHeight - marginX;

  private get stream() {
    return this.streams[this.currentPage];
  }

  private set stream(value: string) {
    this.streams[this.currentPage] = value;
  }

  addPage() {
    this.streams.push("");
    this.currentPage += 1;
    this.y = pageHeight - marginX;
  }

  ensureSpace(height: number) {
    if (this.y - height < 52) this.addPage();
  }

  command(value: string) {
    this.stream += `${value}\n`;
  }

  fillColor([r, g, b]: PdfColor) {
    this.command(`${(r / 255).toFixed(3)} ${(g / 255).toFixed(3)} ${(b / 255).toFixed(3)} rg`);
  }

  strokeColor([r, g, b]: PdfColor) {
    this.command(`${(r / 255).toFixed(3)} ${(g / 255).toFixed(3)} ${(b / 255).toFixed(3)} RG`);
  }

  rect(x: number, y: number, width: number, height: number, fill: PdfColor, stroke?: PdfColor) {
    this.fillColor(fill);
    if (stroke) {
      this.strokeColor(stroke);
      this.command(`${x} ${y} ${width} ${height} re B`);
    } else {
      this.command(`${x} ${y} ${width} ${height} re f`);
    }
  }

  line(x1: number, y1: number, x2: number, y2: number, color: PdfColor = border) {
    this.strokeColor(color);
    this.command(`1 w ${x1} ${y1} m ${x2} ${y2} l S`);
  }

  text(text: string, x: number, y: number, size: number, color: PdfColor = [20, 24, 28], bold = false) {
    this.fillColor(color);
    this.command(`BT /${bold ? "F2" : "F1"} ${size} Tf ${x} ${y} Td (${escapePdfText(text)}) Tj ET`);
  }

  paragraph(text: string, x: number, y: number, width: number, size = 10, color: PdfColor = [20, 24, 28], leading = 14) {
    const lines = wrapText(text, width, size);
    lines.forEach((line, index) => this.text(line, x, y - index * leading, size, color));
    return lines.length * leading;
  }

  output() {
    const objects: string[] = [];
    const catalogId = 1;
    const pagesId = 2;
    const fontRegularId = 3;
    const fontBoldId = 4;
    const firstPageId = 5;
    const pageObjectIds = this.streams.map((_, index) => firstPageId + index * 2);
    const contentObjectIds = this.streams.map((_, index) => firstPageId + index * 2 + 1);

    objects[catalogId] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
    objects[pagesId] = `<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${this.streams.length} >>`;
    objects[fontRegularId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
    objects[fontBoldId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

    this.streams.forEach((stream, index) => {
      const pageId = pageObjectIds[index];
      const contentId = contentObjectIds[index];
      objects[pageId] = `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`;
      objects[contentId] = `<< /Length ${Buffer.byteLength(stream, "binary")} >>\nstream\n${stream}endstream`;
    });

    let pdf = "%PDF-1.4\n";
    const offsets = [0];

    for (let id = 1; id < objects.length; id += 1) {
      offsets[id] = Buffer.byteLength(pdf, "binary");
      pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
    }

    const xrefOffset = Buffer.byteLength(pdf, "binary");
    pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;

    for (let id = 1; id < objects.length; id += 1) {
      pdf += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
    }

    pdf += `trailer\n<< /Size ${objects.length} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
    return Buffer.from(pdf, "binary");
  }
}

function drawHeader(pdf: PdfBuilder) {
  pdf.rect(0, pageHeight - 142, pageWidth, 142, primary);
  pdf.rect(36, pageHeight - 110, 50, 50, [255, 255, 255]);
  pdf.text("YNI", 49, pageHeight - 88, 16, primary, true);
  pdf.text("Yayasan Nurul Iman", 104, pageHeight - 70, 22, [255, 255, 255], true);
  pdf.text("Daftar Donatur Tetap", 104, pageHeight - 94, 14, [236, 245, 239]);
  pdf.text(
    `Dicetak: ${new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date())}`,
    104,
    pageHeight - 116,
    9,
    [225, 238, 230]
  );

  pdf.rect(pageWidth - marginX - 120, pageHeight - 78, 120, 28, secondary);
  pdf.text("DATA DONATUR", pageWidth - marginX - 100, pageHeight - 67, 10, primary, true);
  pdf.y = pageHeight - 172;
}

function drawFooter(pdf: PdfBuilder) {
  pdf.streams.forEach((_, index) => {
    pdf.currentPage = index;
    pdf.line(marginX, 38, pageWidth - marginX, 38, border);
    pdf.text("Yayasan Nurul Iman - Data Donatur Tetap", marginX, 24, 8, muted);
    pdf.text(`Halaman ${index + 1}`, pageWidth - marginX - 45, 24, 8, muted);
  });
}

async function buildDonaturPdf() {
  const donaturList = await getAllDonatur();
  const pdf = new PdfBuilder();

  drawHeader(pdf);

  // Summary cards
  const aktifCount = donaturList.filter((d) => d.aktif).length;
  const totalCount = donaturList.length;

  // Total nominal dari semua donatur bulan ini
  const thisMonth = new Date();
  const thisMonthKey = `${thisMonth.getUTCFullYear()}-${String(thisMonth.getUTCMonth() + 1).padStart(2, "0")}`;

  let totalNominalBulanIni = 0;
  for (const d of donaturList) {
    for (const don of d.donations) {
      const key = don.bulan.slice(0, 7);
      if (key === thisMonthKey) {
        totalNominalBulanIni += don.nominal;
      }
    }
  }

  const cardGap = 12;
  const cardWidth = (pageWidth - marginX * 2 - cardGap) / 2;

  pdf.rect(marginX, pdf.y - 72, cardWidth, 72, lightGreen, border);
  pdf.text("TOTAL DONATUR AKTIF", marginX + 14, pdf.y - 22, 8, muted, true);
  pdf.text(`${aktifCount} dari ${totalCount} donatur`, marginX + 14, pdf.y - 50, 13, primary, true);

  pdf.rect(marginX + cardWidth + cardGap, pdf.y - 72, cardWidth, 72, [255, 247, 229], border);
  pdf.text("ESTIMASI DONASI BULAN INI", marginX + cardWidth + cardGap + 14, pdf.y - 22, 8, muted, true);
  pdf.text(
    totalNominalBulanIni > 0 ? formatRupiah(totalNominalBulanIni) : "Belum ada data",
    marginX + cardWidth + cardGap + 14,
    pdf.y - 50,
    11,
    primary,
    true
  );

  pdf.y -= 88;

  // Table header
  pdf.ensureSpace(40);
  pdf.rect(marginX, pdf.y - 32, pageWidth - marginX * 2, 32, primary);
  pdf.text("NO", marginX + 10, pdf.y - 20, 9, [255, 255, 255], true);
  pdf.text("NAMA DONATUR", marginX + 45, pdf.y - 20, 9, [255, 255, 255], true);
  pdf.text("TELEPON", marginX + 260, pdf.y - 20, 9, [255, 255, 255], true);
  pdf.text("DONASI TERAKHIR", marginX + 365, pdf.y - 20, 9, [255, 255, 255], true);
  pdf.text("STATUS", pageWidth - marginX - 55, pdf.y - 20, 9, [255, 255, 255], true);
  pdf.y -= 40;

  let rowNum = 0;
  for (const donatur of donaturList) {
    rowNum++;
    const latestDonation = donatur.donations[0];
    const rowHeight = 38;

    pdf.ensureSpace(rowHeight + 4);

    const rowBg: PdfColor = rowNum % 2 === 0 ? [248, 251, 249] : [255, 255, 255];
    pdf.rect(marginX, pdf.y - rowHeight, pageWidth - marginX * 2, rowHeight, rowBg, border);

    pdf.text(String(rowNum), marginX + 10, pdf.y - 24, 9, primary);
    pdf.text(sanitizeNama(donatur.nama), marginX + 45, pdf.y - 24, 9, primary, true);
    pdf.text(donatur.telepon ? sanitizeNama(donatur.telepon) : "-", marginX + 260, pdf.y - 24, 9, muted);

    if (latestDonation) {
      pdf.text(formatRupiah(latestDonation.nominal), marginX + 365, pdf.y - 14, 8, [24, 120, 67], true);
      pdf.text(sanitizeNama(formatBulan(latestDonation.bulan)), marginX + 365, pdf.y - 28, 7, muted);
    } else {
      pdf.text("-", marginX + 365, pdf.y - 24, 9, muted);
    }

    const statusColor: PdfColor = donatur.aktif ? [24, 120, 67] : [157, 93, 22];
    pdf.text(donatur.aktif ? "Aktif" : "Nonaktif", pageWidth - marginX - 55, pdf.y - 24, 8, statusColor, true);

    pdf.y -= rowHeight + 2;
  }

  if (donaturList.length === 0) {
    pdf.rect(marginX, pdf.y - 70, pageWidth - marginX * 2, 70, light, border);
    pdf.text("Belum ada data donatur yang tersedia.", marginX + 16, pdf.y - 38, 11, muted);
    pdf.y -= 78;
  }

  // Rincian donasi per donatur dengan history
  if (donaturList.some((d) => d.donations.length > 0)) {
    pdf.y -= 20;
    pdf.ensureSpace(60);
    pdf.text("Rincian Riwayat Donasi per Donatur", marginX, pdf.y, 13, primary, true);
    pdf.y -= 24;

    for (const donatur of donaturList) {
      if (donatur.donations.length === 0) continue;

      pdf.ensureSpace(50);
      pdf.rect(marginX, pdf.y - 40, pageWidth - marginX * 2, 40, lightGreen, border);
      pdf.text(sanitizeNama(donatur.nama), marginX + 14, pdf.y - 16, 11, primary, true);
      if (donatur.telepon) {
        pdf.text(sanitizeNama(donatur.telepon), marginX + 14, pdf.y - 30, 8, muted);
      }

      const totalDonatur = donatur.donations.reduce((sum, d) => sum + d.nominal, 0);
      pdf.text(`Total: ${formatRupiah(totalDonatur)}`, pageWidth - marginX - 120, pdf.y - 22, 9, [24, 120, 67], true);
      pdf.y -= 48;

      for (const don of donatur.donations) {
        pdf.ensureSpace(28);
        pdf.rect(marginX + 14, pdf.y - 26, pageWidth - marginX * 2 - 14, 26, [255, 255, 255], border);
        pdf.text(sanitizeNama(formatBulan(don.bulan)), marginX + 28, pdf.y - 16, 9, muted);
        pdf.text(formatRupiah(don.nominal), pageWidth - marginX - 90, pdf.y - 16, 9, primary, true);
        if (don.catatan) {
          pdf.text(`Ket: ${sanitizeNama(don.catatan)}`, marginX + 28, pdf.y - 28, 7, muted);
        }
        pdf.y -= 28;
      }

      pdf.y -= 8;
    }
  }

  drawFooter(pdf);
  return pdf.output();
}

function sanitizeNama(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "-");
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const pdf = await buildDonaturPdf();

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="data-donatur-yayasan-nurul-iman.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[DONATUR_PDF]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
