export type GithubRepoStats = {
  stars: number | null;
  pushedAt: string | null;
};

export async function getGithubRepoStats(repo: string): Promise<GithubRepoStats> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return { stars: null, pushedAt: null };
    const json = await res.json();
    return {
      stars: typeof json?.stargazers_count === "number" ? json.stargazers_count : null,
      pushedAt: typeof json?.pushed_at === "string" ? json.pushed_at : null,
    };
  } catch {
    return { stars: null, pushedAt: null };
  }
}
