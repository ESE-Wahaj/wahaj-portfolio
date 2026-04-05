const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'ESE-wahaj';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers: HeadersInit = {
  Accept: 'application/vnd.github.v3+json',
  ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
};

export async function fetchGitHubRepos() {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
    { headers, next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function fetchRepoReadme(owner: string, repo: string) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/readme`,
    { headers }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return Buffer.from(data.content, 'base64').toString('utf-8');
}

export async function fetchRepoStats(owner: string, repo: string) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    { headers, next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return {
    stars: data.stargazers_count,
    forks: data.forks_count,
    language: data.language,
    updated_at: data.updated_at,
  };
}
