export type PypiStats = {
  lastMonth: number | null;
};

export async function getPypiRecentDownloads(pkg: string): Promise<PypiStats> {
  try {
    const res = await fetch(`https://pypistats.org/api/packages/${pkg}/recent`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { lastMonth: null };
    const json = await res.json();
    const lastMonth = json?.data?.last_month;
    return { lastMonth: typeof lastMonth === "number" ? lastMonth : null };
  } catch {
    return { lastMonth: null };
  }
}
