import { NextRequest, NextResponse } from "next/server";

const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions";

export const revalidate = 86400; // cache 24 jam — data bab jarang berubah

export interface SectionDetail {
  hadithnumber_first: number;
  hadithnumber_last: number;
  arabicnumber_first: number;
  arabicnumber_last: number;
}

export interface SectionsResponse {
  bookName: string;
  sections: Record<string, string>;          // { "1": "Revelation", ... }
  section_details: Record<string, SectionDetail>;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const book = searchParams.get("book");

  if (!book) {
    return NextResponse.json({ error: "Parameter 'book' wajib diisi" }, { status: 400 });
  }

  if (!/^[a-z\-]+$/.test(book)) {
    return NextResponse.json({ error: "Nama kitab tidak valid" }, { status: 400 });
  }

  try {
    // Gunakan file .min.json agar lebih ringan (tanpa teks hadits, hanya metadata)
    // Sayangnya .min.json tetap punya semua hadits — ambil full lalu strip hadiths
    const url = `${BASE_URL}/ind-${book}.min.json`;
    const res = await fetch(url, { next: { revalidate: 86400 } });

    if (!res.ok) {
      return NextResponse.json({ error: "Kitab tidak ditemukan" }, { status: 404 });
    }

    const data = await res.json();
    const meta = data.metadata ?? {};

    const response: SectionsResponse = {
      bookName: meta.name ?? book,
      sections: meta.sections ?? {},
      section_details: meta.section_details ?? {},
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json({ error: "Gagal mengambil daftar bab" }, { status: 500 });
  }
}
