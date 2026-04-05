import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Supabase environment variables are missing');
  }

  return createClient(url, key);
}

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('site_settings').select('key, value');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const settings = (data || []).reduce<Record<string, string>>((acc, item) => {
      acc[item.key] = item.value || '';
      return acc;
    }, {});

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Settings API GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const supabase = getSupabase();

    const rows = Object.entries(body).map(([key, value]) => ({
      key,
      value: typeof value === 'boolean' ? String(value) : (value ?? '').toString(),
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from('site_settings').upsert(rows, { onConflict: 'key' });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Settings API PUT error:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
