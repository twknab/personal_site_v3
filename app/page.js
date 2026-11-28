import HomeClient from "./HomeClient";
import {
  fetchLastCommit,
  fetchRecentActivity,
} from "../src/lib/githubActivity";
import { getTechStack } from "../src/lib/techStack";

// Static export: the GitHub activity is fetched once, at build time, and is
// as fresh as the last deploy (every merge to main deploys).

export default async function Page() {
  const [recentActivity, lastCommit] = await Promise.all([
    fetchRecentActivity(),
    fetchLastCommit(),
  ]);
  const techStack = getTechStack();
  return (
    <HomeClient
      recentActivity={recentActivity}
      techStack={techStack}
      lastCommit={lastCommit}
    />
  );
}
