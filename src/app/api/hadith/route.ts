import { NextRequest, NextResponse } from "next/server";

const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions";

// Cache TTL: 1 jam
export const revalidate = 3600;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const book = searchParams.get("book");
  const section = searchParams.get("section");

  if (!book || !section) {
    return NextResponse.json(
      { error: "Parameter 'book' dan 'section' wajib diisi" },
      { status: 400 }
    );
  }

  // Validasi book name (hanya huruf dan tanda hubung)
  if (!/^[a-z\-]+$/.test(book)) {
    return NextResponse.json({ error: "Nama kitab tidak valid" }, { status: 400 });
  }

  const sectionNum = parseInt(section, 10);
  if (isNaN(sectionNum) || sectionNum < 1) {
    return NextResponse.json({ error: "Nomor section tidak valid" }, { status: 400 });
  }

  try {
    const url = `${BASE_URL}/ind-${book}/${sectionNum}.json`;
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Hadits tidak ditemukan (section ${sectionNum})` },
        { status: 404 }
      );
    }

    const data = await res.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data hadits dari server" },
      { status: 500 }
    );
  }
}
