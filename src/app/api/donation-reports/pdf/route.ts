import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getDonationReports } from "@/features/donation/finance-data";
import {
  donationCategoryLabels,
  formatCurrency,
  groupDonationReportsByMonth,
  summarizeDonationReports,
  summarizeDonationReportsByCategory,
} from "@/features/donation/finance";

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

function drawHeader(pdf: PdfBuilder, includeDraft: boolean) {
  pdf.rect(0, pageHeight - 142, pageWidth, 142, primary);
  pdf.rect(36, pageHeight - 110, 50, 50, [255, 255, 255]);
  pdf.text("YNI", 49, pageHeight - 88, 16, primary, true);
  pdf.text("Yayasan Nurul Iman", 104, pageHeight - 70, 22, [255, 255, 255], true);
  pdf.text("Laporan Donasi & Keuangan", 104, pageHeight - 94, 14, [236, 245, 239]);
  pdf.text(`Dicetak: ${new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date())}`, 104, pageHeight - 116, 9, [225, 238, 230]);

  const badge = includeDraft ? "INTERNAL" : "PUBLIK";
  pdf.rect(pageWidth - marginX - 88, pageHeight - 78, 88, 28, secondary);
  pdf.text(badge, pageWidth - marginX - 62, pageHeight - 67, 10, primary, true);
  pdf.y = pageHeight - 172;
}

function drawSummaryCard(pdf: PdfBuilder, label: string, value: string, x: number, width: number, fill: PdfColor) {
  pdf.rect(x, pdf.y - 72, width, 72, fill, border);
  pdf.text(label.toUpperCase(), x + 14, pdf.y - 22, 8, muted, true);
  pdf.text(value, x + 14, pdf.y - 50, 13, primary, true);
}

function drawMonthlySection(pdf: PdfBuilder, group: ReturnType<typeof groupDonationReportsByMonth>[number]) {
  pdf.ensureSpace(92);
  pdf.rect(marginX, pdf.y - 56, pageWidth - marginX * 2, 56, lightGreen, border);
  pdf.text(group.label, marginX + 14, pdf.y - 22, 15, primary, true);
  pdf.text(`Masuk ${formatCurrency(group.summary.income)} | Keluar ${formatCurrency(group.summary.expense)} | Saldo ${formatCurrency(group.summary.balance)}`, marginX + 14, pdf.y - 42, 9, muted);
  pdf.y -= 72;

  for (const report of group.reports) {
    const noteLines = report.notes ? wrapText(report.notes, pageWidth - marginX * 2 - 28, 8).slice(0, 2) : [];
    const rowHeight = 74 + noteLines.length * 11;
    pdf.ensureSpace(rowHeight + 8);
    pdf.rect(marginX, pdf.y - rowHeight, pageWidth - marginX * 2, rowHeight, [255, 255, 255], border);
    pdf.text(donationCategoryLabels[report.category], marginX + 14, pdf.y - 20, 8, secondary, true);
    pdf.paragraph(report.title, marginX + 14, pdf.y - 38, 218, 10, primary, 13);
    pdf.text(`Masuk: ${formatCurrency(report.income)}`, pageWidth - marginX - 230, pdf.y - 24, 9, [24, 120, 67], true);
    pdf.text(`Keluar: ${formatCurrency(report.expense)}`, pageWidth - marginX - 230, pdf.y - 42, 9, [157, 93, 22], true);
    pdf.text(`Saldo: ${formatCurrency(report.balance)}`, pageWidth - marginX - 230, pdf.y - 60, 9, primary, true);

    noteLines.forEach((line, index) => {
      pdf.text(line, marginX + 14, pdf.y - 63 - index * 11, 8, muted);
    });

    pdf.y -= rowHeight + 8;
  }
}

function drawFooter(pdf: PdfBuilder) {
  pdf.streams.forEach((_, index) => {
    pdf.currentPage = index;
    pdf.line(marginX, 38, pageWidth - marginX, 38, border);
    pdf.text("Laporan dibuat otomatis dari sistem transparansi donasi Yayasan Nurul Iman.", marginX, 24, 8, muted);
    pdf.text(`Halaman ${index + 1}`, pageWidth - marginX - 45, 24, 8, muted);
  });
}

async function buildDonationPdf(includeDraft: boolean) {
  const reports = await getDonationReports({ publishedOnly: !includeDraft });
  const summary = summarizeDonationReports(reports);
  const categories = summarizeDonationReportsByCategory(reports);
  const groups = groupDonationReportsByMonth(reports);
  const pdf = new PdfBuilder();

  drawHeader(pdf, includeDraft);
  const cardGap = 12;
  const cardWidth = (pageWidth - marginX * 2 - cardGap * 2) / 3;
  drawSummaryCard(pdf, "Pemasukan", formatCurrency(summary.income), marginX, cardWidth, [232, 247, 238]);
  drawSummaryCard(pdf, "Pengeluaran", formatCurrency(summary.expense), marginX + cardWidth + cardGap, cardWidth, [255, 247, 229]);
  drawSummaryCard(pdf, "Saldo", formatCurrency(summary.balance), marginX + (cardWidth + cardGap) * 2, cardWidth, lightGreen);
  pdf.y -= 96;

  pdf.text("Rekap Kategori", marginX, pdf.y, 13, primary, true);
  pdf.y -= 22;
  for (const category of categories) {
    pdf.ensureSpace(30);
    pdf.text(category.label, marginX, pdf.y, 9, primary, true);
    pdf.text(`Masuk ${formatCurrency(category.income)}`, marginX + 170, pdf.y, 9, [24, 120, 67]);
    pdf.text(`Keluar ${formatCurrency(category.expense)}`, marginX + 300, pdf.y, 9, [157, 93, 22]);
    pdf.text(`Saldo ${formatCurrency(category.balance)}`, marginX + 430, pdf.y, 9, primary);
    pdf.y -= 20;
  }

  pdf.y -= 10;
  pdf.text("Rincian per Bulan", marginX, pdf.y, 13, primary, true);
  pdf.y -= 22;
  for (const group of groups) {
    drawMonthlySection(pdf, group);
  }

  if (groups.length === 0) {
    pdf.rect(marginX, pdf.y - 70, pageWidth - marginX * 2, 70, light, border);
    pdf.text("Belum ada laporan donasi yang tersedia.", marginX + 16, pdf.y - 38, 11, muted);
  }

  drawFooter(pdf);
  return pdf.output();
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const includeDraft = searchParams.get("includeDraft") === "true";

    if (includeDraft) {
      const session = await getServerSession(authOptions);
      if (!session || session.user.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
      }
    }

    const pdf = await buildDonationPdf(includeDraft);

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="laporan-donasi-yayasan-nurul-iman.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[DONATION_REPORTS_PDF]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
