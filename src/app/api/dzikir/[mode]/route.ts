import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ mode: string }> }
) {
  const { mode } = await params;

  if (mode !== "pagi" && mode !== "sore") {
    return NextResponse.json({ error: "Mode tidak valid" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://dzikir.zakiego.com/api/v0/dzikir-${mode}`,
      { next: { revalidate: 86400 } } // cache 1 hari
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Gagal mengambil data" }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
