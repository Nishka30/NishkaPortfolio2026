import { getGithubContributions } from "@/lib/githubContributions";
import { ContributionHeatmapClient } from "./ContributionHeatmapClient";

export async function ContributionHeatmap() {
  const { views } = await getGithubContributions("Nishka30");

  if (views.length === 0) {
    return null;
  }

  return <ContributionHeatmapClient views={views} />;
}
