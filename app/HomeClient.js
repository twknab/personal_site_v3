"use client";

import App from "../src/App";

// Client boundary: the interactive site tree (Lottie, cursor trail, Bootstrap
// components) stays client-side while page.js fetches data on the server.
export default function HomeClient({ recentActivity, techStack }) {
  return <App recentActivity={recentActivity} techStack={techStack} />;
}
