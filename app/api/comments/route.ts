import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('post_id');
  const postType = searchParams.get('post_type');
  const includeAll = searchParams.get('admin') === '1';

  const supabase = getSupabase();
  let query = supabase.from('comments').select('*').order('created_at', { ascending: false });

  if (!includeAll) {
    query = query.eq('is_approved', true).eq('is_flagged', false);
  }

  if (postId) query = query.eq('post_id', postId);
  if (postType) query = query.eq('post_type', postType);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { post_type, post_id, author_name, author_email, content } = body;

    if (!post_type || !post_id || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = getSupabase();
    const { data, error } = await supabase.from('comments').insert({
      post_type,
      post_id,
      author_name: author_name || 'Anonymous',
      author_email,
      content,
      ip_address: request.headers.get('x-forwarded-for') || 'unknown',
    }).select().single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Comment API error:', error);
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
  }
}
