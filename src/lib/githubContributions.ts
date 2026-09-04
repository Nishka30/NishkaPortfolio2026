export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type ContributionData = {
  days: ContributionDay[];
  totalLastYear: number;
  longestStreak: number;
  currentStreak: number;
  peakDay: ContributionDay | null;
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

export async function getGithubContributions(username: string): Promise<ContributionData> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok)
      return { days: [], totalLastYear: 0, longestStreak: 0, currentStreak: 0, peakDay: null };
    const json = await res.json();
    const days: ContributionDay[] = Array.isArray(json?.contributions)
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

    // The API returns whole calendar years concatenated newest-first (e.g. all of
    // 2026, then all of 2025, ...), not one continuous ascending sequence — so a
    // naive slice(-365) grabs the oldest year instead of the most recent days.
    // Sort ascending and drop future placeholder days (rest of the current year)
    // before taking the trailing 365-day window — this also keeps the headline
    // stat and the grid counting exactly the same window, GitHub's own convention.
    const todayStr = new Date().toISOString().slice(0, 10);
    const lastYearDays = days
      .filter((d) => d.date <= todayStr)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-365);

    const totalLastYear = lastYearDays.reduce((sum, d) => sum + d.count, 0);

    return {
      days: lastYearDays,
      totalLastYear,
      longestStreak: computeLongestStreak(lastYearDays),
      currentStreak: computeCurrentStreak(lastYearDays),
      peakDay: findPeakDay(lastYearDays),
    };
  } catch {
    return { days: [], totalLastYear: 0, longestStreak: 0, currentStreak: 0, peakDay: null };
  }
}
