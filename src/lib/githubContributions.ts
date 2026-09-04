export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type ContributionView = {
  key: string;
  label: string;
  days: ContributionDay[];
  total: number;
  longestStreak: number;
  currentStreak: number | null;
  peakDay: ContributionDay | null;
};

export type ContributionData = {
  views: ContributionView[];
};

function computeLongestStreak(days: ContributionDay[]): number {
  let longest = 0;
  let current = 0;
  for (const day of days) {
    if (day.count > 0) {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 0;
    }
  }
  return longest;
}

function computeCurrentStreak(days: ContributionDay[]): number {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) streak += 1;
    else break;
  }
  return streak;
}

function findPeakDay(days: ContributionDay[]): ContributionDay | null {
  return days.reduce<ContributionDay | null>(
    (peak, day) => (peak === null || day.count > peak.count ? day : peak),
    null
  );
}

function buildView(key: string, label: string, days: ContributionDay[], total: number, includeCurrentStreak: boolean): ContributionView {
  return {
    key,
    label,
    days,
    total,
    longestStreak: computeLongestStreak(days),
    currentStreak: includeCurrentStreak ? computeCurrentStreak(days) : null,
    peakDay: findPeakDay(days),
  };
}

export async function getGithubContributions(username: string): Promise<ContributionData> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { views: [] };
    const json = await res.json();
    const allDays: ContributionDay[] = Array.isArray(json?.contributions)
      ? json.contributions
          .filter(
            (d: unknown): d is ContributionDay =>
              typeof d === "object" &&
              d !== null &&
              typeof (d as ContributionDay).date === "string" &&
              typeof (d as ContributionDay).count === "number"
          )
          .map((d: ContributionDay) => ({
            date: d.date,
            count: d.count,
            level: typeof d.level === "number" ? d.level : 0,
          }))
      : [];

    if (allDays.length === 0) return { views: [] };

    // The API returns whole calendar years concatenated newest-first (e.g. all of
    // 2026, then all of 2025, ...), not one continuous ascending sequence — so a
    // naive slice(-N) on the raw array grabs the wrong end. Sort ascending once,
    // then derive both the rolling "last 12 months" view and each full calendar
    // year from that.
    const todayStr = new Date().toISOString().slice(0, 10);
    const sorted = [...allDays].sort((a, b) => a.date.localeCompare(b.date));
    const pastOrToday = sorted.filter((d) => d.date <= todayStr);

    const rollingDays = pastOrToday.slice(-365);
    const rollingTotal = rollingDays.reduce((sum, d) => sum + d.count, 0);
    const views: ContributionView[] = [
      buildView("last12", "Last 12 months", rollingDays, rollingTotal, true),
    ];

    const totalsByYear: Record<string, number> =
      json?.total && typeof json.total === "object" ? json.total : {};
    const years = Array.from(new Set(sorted.map((d) => d.date.slice(0, 4)))).sort().reverse();

    for (const year of years) {
      const yearDays = sorted.filter((d) => d.date.slice(0, 4) === year && d.date <= todayStr);
      if (yearDays.length === 0) continue;
      const total = typeof totalsByYear[year] === "number" ? totalsByYear[year] : yearDays.reduce((s, d) => s + d.count, 0);
      views.push(buildView(year, year, yearDays, total, false));
    }

    return { views };
  } catch {
    return { views: [] };
  }
}
