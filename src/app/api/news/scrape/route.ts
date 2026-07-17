import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { refreshNewsIfStale } from '@/features/news/news-scraper';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { category, limit } = await req.json();
    
    const refresh = await refreshNewsIfStale({
      category,
      limit,
      force: true,
    });

    return NextResponse.json({
      message: 'Scraping completed',
      results: refresh.results,
      lastRefreshAt: refresh.lastRefreshAt,
      nextRefreshAt: refresh.nextRefreshAt,
    });
  } catch (error) {
    console.error('API Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
