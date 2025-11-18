import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { error: 'Search query is required' },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`${API_BASE}/search.php?s=${encodeURIComponent(query)}`);
    
    if (!res.ok) {
      throw new Error('Failed to fetch meals');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search meals' },
      { status: 500 }
    );
  }
}