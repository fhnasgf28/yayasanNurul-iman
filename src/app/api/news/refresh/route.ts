import { NextResponse } from "next/server";
import { refreshNewsIfStale } from "@/features/news/news-scraper";

export const runtime = "nodejs";

function parseLimit(value: string | null) {
  if (!value) return undefined;

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return undefined;

  return Math.min(Math.max(Math.trunc(parsed), 1), 20);
}

function isAuthorized(req: Request) {
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }

  const url = new URL(req.url);
  const authHeader = req.headers.get("authorization");

  return authHeader === `Bearer ${secret}` || url.searchParams.get("token") === secret;
}

export async function GET(req: Request) {
  const hasSecret = Boolean(process.env.CRON_SECRET);

  if (!isAuthorized(req)) {
    return NextResponse.json(
      { message: hasSecret ? "Unauthorized" : "CRON_SECRET is not configured" },
      { status: hasSecret ? 401 : 503 }
    );
  }

  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category")?.trim() || undefined;
    const limit = parseLimit(url.searchParams.get("limit"));
    const force = url.searchParams.get("force") === "true";
    const refresh = await refreshNewsIfStale({ category, limit, force });

    return NextResponse.json({
      message: refresh.skipped ? "News is still fresh" : "News refreshed",
      ...refresh,
    });
  } catch (error) {
    console.error("[NEWS_REFRESH_CRON]", error);
    return NextResponse.json({ message: "Failed to refresh news" }, { status: 500 });
  }
}
