import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const includeDrafts = searchParams.get('admin') === '1';

  const supabase = getSupabase();
  let query = supabase
    .from('social_posts')
    .select('*, category:categories(*)')
    .order('pinned', { ascending: false })
    .order('created_at', { ascending: false });

  if (!includeDrafts) {
    query = query.eq('is_published', true);
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabase();
    const { data, error } = await supabase.from('social_posts').insert(body).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Posts API error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
