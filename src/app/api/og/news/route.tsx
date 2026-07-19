import type { NextRequest } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

// Escape XML/SVG special characters
function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Wrap long text into multiple SVG tspan lines
function wrapText(text: string, maxCharsPerLine: number, maxLines: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if ((current + " " + word).trim().length > maxCharsPerLine) {
      if (lines.length >= maxLines - 1) {
        lines.push((current + " " + word).trim().slice(0, maxCharsPerLine - 3) + "...");
        return lines;
      }
      lines.push(current.trim());
      current = word;
    } else {
      current = current ? current + " " + word : word;
    }
  }
  if (current) lines.push(current.trim());
  return lines.slice(0, maxLines);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") ?? "";

  const post = slug
    ? await db.news
        .findUnique({
          where: { slug },
          select: { title: true, category: true, thumbnail: true },
        })
        .catch(() => null)
    : null;

  const title = post?.title ?? "Berita Yayasan Nurul Iman";
  const category = (post?.category ?? "Berita").toUpperCase();
  const thumbnail = post?.thumbnail ?? null;
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://yayasannuruliman.clipperyt.online"
  ).replace(/^https?:\/\//, "");

  // Fetch thumbnail as base64
  let thumbB64 = "";
  let thumbMime = "image/jpeg";
  if (thumbnail) {
    try {
      const res = await fetch(thumbnail, {
        headers: { "User-Agent": "YayasanNurulIman-OGBot/1.0" },
        signal: AbortSignal.timeout(6000),
      });
      if (res.ok) {
        const buf = await res.arrayBuffer();
        thumbMime = res.headers.get("content-type") ?? "image/jpeg";
        thumbB64 = Buffer.from(buf).toString("base64");
      }
    } catch { /* ignore */ }
  }

  // Build wrapped title lines
  const hasThumb = thumbB64.length > 0;
  const maxChars = hasThumb ? 42 : 60;
  const titleLines = wrapText(title, maxChars, 4);

  // Build SVG thumbnail section
  const thumbSection = hasThumb
    ? `<image href="data:${thumbMime};base64,${thumbB64}" x="780" y="60" width="360" height="510" preserveAspectRatio="xMidYMid slice" rx="16"/>`
    : "";

  // Build SVG title tspans
  const titleSvg = titleLines
    .map(
      (line, i) =>
        `<tspan x="60" dy="${i === 0 ? 0 : 48}">${esc(line)}</tspan>`
    )
    .join("");

  const W = 1200;
  const H = 630;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <clipPath id="thumbClip"><rect x="780" y="60" width="360" height="510" rx="16"/></clipPath>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1A4D2E"/>
      <stop offset="100%" stop-color="#0f3020"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bgGrad)"/>

  <!-- Gold top bar -->
  <rect width="${W}" height="6" fill="#C9A84C"/>

  <!-- Thumbnail with clip -->
  ${thumbB64 ? `<image href="data:${thumbMime};base64,${thumbB64}" x="780" y="60" width="360" height="510" clip-path="url(#thumbClip)" preserveAspectRatio="xMidYMid slice"/>` : ""}

  <!-- Branding block -->
  <rect x="60" y="52" width="30" height="30" rx="6" fill="#C9A84C"/>
  <text x="100" y="74" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" fill="#C9A84C">Yayasan Nurul Iman</text>

  <!-- Category accent bar + text -->
  <rect x="60" y="170" width="4" height="22" rx="2" fill="#C9A84C"/>
  <text x="74" y="188" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="700" fill="#C9A84C" letter-spacing="3">${esc(category)}</text>

  <!-- Title -->
  <text font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="800" fill="#ffffff">
    <tspan x="60" y="${titleLines.length > 1 ? 248 : 270}">${titleSvg}</tspan>
  </text>

  <!-- Divider -->
  <line x1="60" y1="${H - 70}" x2="${hasThumb ? 720 : W - 60}" y2="${H - 70}" stroke="rgba(201,168,76,0.3)" stroke-width="1"/>

  <!-- Footer domain -->
  <text x="60" y="${H - 44}" font-family="Arial, Helvetica, sans-serif" font-size="12" fill="rgba(255,255,255,0.4)">${esc(siteUrl)}</text>
  <text x="${hasThumb ? 700 : W - 60}" y="${H - 44}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="600" fill="#C9A84C">Baca selengkapnya</text>

  <!-- Gold bottom bar -->
  <rect y="${H - 4}" width="${W}" height="4" fill="#C9A84C"/>
</svg>`;

  // Convert SVG to PNG using sharp
  const sharp = (await import("sharp")).default;
  const pngBuf = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(pngBuf.buffer as ArrayBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
