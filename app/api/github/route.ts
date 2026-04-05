import { NextResponse } from 'next/server';
import { fetchGitHubRepos } from '@/lib/github';

export async function GET() {
  try {
    const repos = await fetchGitHubRepos();
    return NextResponse.json(repos);
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json({ error: 'Failed to fetch repos' }, { status: 500 });
  }
}
