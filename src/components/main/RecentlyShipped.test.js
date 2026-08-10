import React from "react";
import { render } from "@testing-library/react";
import RecentlyShipped from "./RecentlyShipped";

const ITEMS = [
  {
    id: "1",
    kind: "merge",
    repo: "twknab/zen-frog-todo",
    repoName: "zen-frog-todo",
    label: "merged PR #45",
    detail: "Mobile rich editor selection toolbar",
    url: "https://github.com/twknab/zen-frog-todo/pull/45",
    isoTime: "2026-08-09T05:14:49Z",
    timeAgo: "yesterday",
  },
  {
    id: "2",
    kind: "push",
    repo: "twknab/personal_site_v3",
    repoName: "personal_site_v3",
    label: "2 pushes to main",
    detail: null,
    url: "https://github.com/twknab/personal_site_v3/commit/abc",
    isoTime: "2026-08-08T05:00:00Z",
    timeAgo: "2 days ago",
  },
];

describe("RecentlyShipped", () => {
  it("renders nothing when there are no items (graceful degradation)", () => {
    const { container: empty } = render(<RecentlyShipped items={[]} />);
    expect(empty).toBeEmptyDOMElement();
    const { container: missing } = render(<RecentlyShipped />);
    expect(missing).toBeEmptyDOMElement();
  });

  it("renders a semantic list of activity cards", () => {
    render(<RecentlyShipped items={ITEMS} />);
    const list = document.querySelector("ul.shipped-strip");
    expect(list).toBeInTheDocument();
    expect(list.querySelectorAll("li")).toHaveLength(2);
  });

  it("links each card to GitHub with readable text", () => {
    render(<RecentlyShipped items={ITEMS} />);
    const link = document.querySelector(
      'a[href="https://github.com/twknab/zen-frog-todo/pull/45"]'
    );
    expect(link).toBeInTheDocument();
    expect(link.textContent).toContain("zen-frog-todo");
    expect(link.textContent).toContain("merged PR #45");
    expect(link.textContent).toContain("Mobile rich editor selection toolbar");
    expect(link.textContent).toContain("yesterday");
  });

  it("marks timestamps up as <time> with a machine-readable datetime", () => {
    render(<RecentlyShipped items={ITEMS} />);
    const time = document.querySelector('time[datetime="2026-08-09T05:14:49Z"]');
    expect(time).toBeInTheDocument();
    expect(time.textContent).toBe("yesterday");
  });

  it("skips the detail line when an item has none", () => {
    render(<RecentlyShipped items={[ITEMS[1]]} />);
    expect(document.querySelector(".shipped-detail")).toBeNull();
  });

  it("exposes a mobile swipe hint for the horizontal strip", () => {
    render(<RecentlyShipped items={ITEMS} />);
    expect(document.querySelector(".shipped-strip-wrap")).toBeInTheDocument();
    expect(document.querySelector(".shipped-swipe-hint")).toHaveTextContent(
      /swipe/i
    );
  });
});
