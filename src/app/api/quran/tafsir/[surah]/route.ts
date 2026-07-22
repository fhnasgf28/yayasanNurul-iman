import { NextRequest, NextResponse } from "next/server";

export const revalidate = 86400; // Cache 24 jam

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ surah: string }> }
) {
  const { surah } = await params;
  const surahNum = parseInt(surah, 10);

  if (isNaN(surahNum) || surahNum < 1 || surahNum > 114) {
    return NextResponse.json({ error: "Nomor surah tidak valid" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://equran.id/api/v2/tafsir/${surahNum}`, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Data tafsir tidak ditemukan" }, { status: 404 });
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data tafsir dari server" },
      { status: 500 }
    );
  }
}
