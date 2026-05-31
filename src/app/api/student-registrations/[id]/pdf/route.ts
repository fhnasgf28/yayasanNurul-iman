import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/admin-auth";
import {
  registrationStatusLabels,
  studentGenderLabels,
  type RegistrationStatusValue,
  type StudentGenderValue,
} from "@/lib/student-registration";

type RouteParams = {
  params: Promise<{ id: string }>;
};

type PdfColor = [number, number, number];

type RegistrationPdfData = {
  id: string;
  studentName: string;
  nickname: string | null;
  gender: StudentGenderValue;
  birthPlace: string;
  birthDate: Date;
  schoolOrigin: string | null;
  currentGrade: string | null;
  program: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string | null;
  address: string;
  notes: string | null;
  status: RegistrationStatusValue;
  submittedAt: Date;
  reviewedAt: Date | null;
};

const pageWidth = 595.28;
const pageHeight = 841.89;
const marginX = 48;
const primary: PdfColor = [23, 83, 55];
const accent: PdfColor = [204, 141, 46];
const muted: PdfColor = [102, 112, 122];
const lightGreen: PdfColor = [237, 247, 241];
const lightGray: PdfColor = [246, 247, 249];
const border: PdfColor = [218, 224, 230];

const statusColors: Record<RegistrationStatusValue, { fill: PdfColor; text: PdfColor }> = {
  NEW: { fill: [255, 246, 217], text: [146, 90, 0] },
  CONTACTED: { fill: [224, 239, 255], text: [24, 88, 160] },
  ACCEPTED: { fill: [223, 246, 232], text: [20, 120, 67] },
  REJECTED: { fill: [255, 226, 226], text: [184, 44, 44] },
};

function sanitizeText(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "-");
}

function escapePdfText(value: string) {
  return sanitizeText(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
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
    if (this.y - height < 48) this.addPage();
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

  paragraph(text: string, x: number, y: number, width: number, size = 10, color: PdfColor = [20, 24, 28], leading = 15) {
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

function drawHeader(pdf: PdfBuilder, registration: RegistrationPdfData) {
  pdf.rect(0, pageHeight - 145, pageWidth, 145, primary);
  pdf.rect(36, pageHeight - 118, 56, 56, [255, 255, 255]);
  pdf.text("YNI", 51, pageHeight - 93, 18, primary, true);
  pdf.text("Yayasan Nurul Iman", 108, pageHeight - 74, 23, [255, 255, 255], true);
  pdf.text("Formulir Pendaftaran Siswa Baru", 108, pageHeight - 98, 13, [231, 242, 235]);
  pdf.text(`Dicetak: ${formatDateTime(new Date())}`, 108, pageHeight - 119, 9, [216, 232, 222]);

  const status = registrationStatusLabels[registration.status];
  const colors = statusColors[registration.status];
  const badgeWidth = Math.max(86, textWidth(status, 10) + 28);
  pdf.rect(pageWidth - marginX - badgeWidth, pageHeight - 82, badgeWidth, 28, colors.fill);
  pdf.text(status.toUpperCase(), pageWidth - marginX - badgeWidth + 14, pageHeight - 71, 10, colors.text, true);
  pdf.y = pageHeight - 176;
}

function sectionTitle(pdf: PdfBuilder, title: string) {
  pdf.ensureSpace(44);
  pdf.text(title, marginX, pdf.y, 13, primary, true);
  pdf.line(marginX, pdf.y - 10, pageWidth - marginX, pdf.y - 10, border);
  pdf.y -= 30;
}

function infoGrid(pdf: PdfBuilder, rows: Array<[string, string | null | undefined]>) {
  const colGap = 16;
  const colWidth = (pageWidth - marginX * 2 - colGap) / 2;

  for (let index = 0; index < rows.length; index += 2) {
    const pair = rows.slice(index, index + 2);
    const heights = pair.map(([, value]) => Math.max(58, 34 + wrapText(value || "-", colWidth - 28, 10).length * 14));
    const rowHeight = Math.max(...heights);
    pdf.ensureSpace(rowHeight + 10);

    pair.forEach(([label, value], colIndex) => {
      const x = marginX + colIndex * (colWidth + colGap);
      const y = pdf.y - rowHeight;
      pdf.rect(x, y, colWidth, rowHeight, lightGray, border);
      pdf.text(label.toUpperCase(), x + 14, pdf.y - 20, 8, muted, true);
      pdf.paragraph(value || "-", x + 14, pdf.y - 39, colWidth - 28, 10, [20, 24, 28], 14);
    });

    pdf.y -= rowHeight + 10;
  }
}

function notesBlock(pdf: PdfBuilder, title: string, value: string | null) {
  const width = pageWidth - marginX * 2;
  const lines = wrapText(value || "-", width - 28, 10);
  const height = Math.max(76, 42 + lines.length * 15);
  pdf.ensureSpace(height + 10);
  pdf.rect(marginX, pdf.y - height, width, height, [255, 255, 255], border);
  pdf.text(title.toUpperCase(), marginX + 14, pdf.y - 20, 8, muted, true);
  pdf.paragraph(value || "-", marginX + 14, pdf.y - 42, width - 28, 10, [20, 24, 28], 15);
  pdf.y -= height + 12;
}

function drawFooter(pdf: PdfBuilder) {
  pdf.streams.forEach((_, index) => {
    pdf.currentPage = index;
    pdf.line(marginX, 38, pageWidth - marginX, 38, border);
    pdf.text("Dokumen ini dibuat otomatis dari Dashboard Yayasan Nurul Iman.", marginX, 24, 8, muted);
    pdf.text(`Halaman ${index + 1}`, pageWidth - marginX - 45, 24, 8, muted);
  });
}

function buildRegistrationPdf(registration: RegistrationPdfData) {
  const pdf = new PdfBuilder();
  drawHeader(pdf, registration);

  pdf.rect(marginX, pdf.y - 78, pageWidth - marginX * 2, 78, lightGreen, border);
  pdf.text(registration.studentName, marginX + 18, pdf.y - 28, 20, primary, true);
  pdf.text(
    `${registration.program}${registration.currentGrade ? ` - ${registration.currentGrade}` : ""}`,
    marginX + 18,
    pdf.y - 51,
    11,
    [50, 80, 64]
  );
  pdf.text(`No. Dokumen: REG-${registration.id.slice(0, 8).toUpperCase()}`, pageWidth - marginX - 190, pdf.y - 28, 9, muted);
  pdf.text(`Tanggal daftar: ${formatDateTime(registration.submittedAt)}`, pageWidth - marginX - 190, pdf.y - 48, 9, muted);
  pdf.y -= 106;

  sectionTitle(pdf, "Data Siswa");
  infoGrid(pdf, [
    ["Nama lengkap", registration.studentName],
    ["Nama panggilan", registration.nickname],
    ["Jenis kelamin", studentGenderLabels[registration.gender]],
    ["Tempat, tanggal lahir", `${registration.birthPlace}, ${formatDate(registration.birthDate)}`],
    ["Asal sekolah", registration.schoolOrigin],
    ["Kelas saat ini", registration.currentGrade],
    ["Program pilihan", registration.program],
    ["Status pendaftaran", registrationStatusLabels[registration.status]],
  ]);

  sectionTitle(pdf, "Data Orang Tua / Wali");
  infoGrid(pdf, [
    ["Nama wali", registration.parentName],
    ["Nomor WhatsApp", registration.parentPhone],
    ["Email wali", registration.parentEmail],
    ["Ditinjau pada", registration.reviewedAt ? formatDateTime(registration.reviewedAt) : "Belum ditinjau"],
  ]);

  sectionTitle(pdf, "Alamat dan Catatan");
  notesBlock(pdf, "Alamat domisili", registration.address);
  notesBlock(pdf, "Catatan tambahan", registration.notes);

  sectionTitle(pdf, "Verifikasi");
  const signatureY = pdf.y - 88;
  pdf.ensureSpace(110);
  pdf.text("Petugas Pendaftaran", marginX, pdf.y, 10, muted, true);
  pdf.text("Orang Tua / Wali", pageWidth - marginX - 150, pdf.y, 10, muted, true);
  pdf.line(marginX, signatureY, marginX + 150, signatureY, border);
  pdf.line(pageWidth - marginX - 150, signatureY, pageWidth - marginX, signatureY, border);
  pdf.text("( Nama & tanda tangan )", marginX + 24, signatureY - 16, 8, muted);
  pdf.text("( Nama & tanda tangan )", pageWidth - marginX - 126, signatureY - 16, 8, muted);

  drawFooter(pdf);
  return pdf.output();
}

export async function GET(_req: Request, { params }: RouteParams) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const registration = await db.studentRegistration.findUnique({ where: { id } });

    if (!registration) {
      return NextResponse.json({ message: "Pendaftaran tidak ditemukan" }, { status: 404 });
    }

    const pdf = buildRegistrationPdf(registration);
    const fileName = `pendaftaran-${registration.studentName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "siswa"}.pdf`;

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[STUDENT_REGISTRATION_PDF]", error);
    return NextResponse.json(
      { message: "Gagal membuat PDF pendaftaran" },
      { status: 500 }
    );
  }
}
