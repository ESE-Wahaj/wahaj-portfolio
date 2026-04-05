import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const PROJECT_TABLE_CANDIDATES = ['projects', 'project'] as const;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!key) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing');
  }

  return createClient(url, key);
}

function normalizeStatus(status: unknown) {
  if (status === 'draft') return 'in_progress';
  if (status === 'published') return 'completed';
  if (status === 'archived' || status === 'completed' || status === 'in_progress') return status;
  return 'in_progress';
}

function getErrorMessage(error: unknown) {
  if (typeof error === 'object' && error && 'message' in error) {
    return String((error as { message: string }).message);
  }
  return String(error);
}

function isMissingProjectsTableError(message: string) {
  return (
    message.includes("Could not find the table 'public.projects'") ||
    message.includes("Could not find the table 'public.project'") ||
    message.includes('relation "public.projects" does not exist') ||
    message.includes('relation "public.project" does not exist')
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function resolveProjectsTable(supabase: any) {
  for (const table of PROJECT_TABLE_CANDIDATES) {
    const { error } = await supabase.from(table).select('id').limit(1);
    if (!error) {
      return { table };
    }

    const message = getErrorMessage(error);
    if (!isMissingProjectsTableError(message)) {
      return { error: message };
    }
  }

  return {
    error:
      "Projects table is missing. Run the SQL migration in supabase/migrations/001_initial_schema.sql on your connected Supabase project.",
  };
}

export async function GET() {
  try {
    const supabase = getSupabase();
    const resolution = await resolveProjectsTable(supabase);
    if (resolution.error) {
      return NextResponse.json({ error: resolution.error }, { status: 500 });
    }

    const { data, error } = await supabase
      .from(resolution.table!)
      .select('*')
      .eq('is_archived', false)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = {
      ...body,
      status: normalizeStatus(body?.status),
    };

    const supabase = getSupabase();
    const resolution = await resolveProjectsTable(supabase);
    if (resolution.error) {
      return NextResponse.json({ error: resolution.error }, { status: 500 });
    }

    const { data, error } = await supabase.from(resolution.table!).insert(payload).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Projects API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const payload = {
      ...updates,
      ...(updates.status ? { status: normalizeStatus(updates.status) } : {}),
    };

    const supabase = getSupabase();
    const resolution = await resolveProjectsTable(supabase);
    if (resolution.error) {
      return NextResponse.json({ error: resolution.error }, { status: 500 });
    }

    const { data, error } = await supabase
      .from(resolution.table!)
      .update(payload)
      .eq('id', id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Projects API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update project' },
      { status: 500 }
    );
  }
}
