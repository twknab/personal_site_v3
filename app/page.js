import HomeClient from "./HomeClient";
import {
  fetchLastCommit,
  fetchRecentActivity,
} from "../src/lib/githubActivity";
import { getTechStack } from "../src/lib/techStack";

// ISR: the page (and its GitHub activity fetch) regenerates at most hourly.
// Next requires a literal here; keep in step with REVALIDATE_SECONDS in
// src/lib/githubActivity.js.
export const revalidate = 3600;

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
