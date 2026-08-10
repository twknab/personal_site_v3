import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Scroll from "react-scroll";
import { GoGitCommit, GoGitMerge, GoRepo, GoTag } from "react-icons/go";
const Element = Scroll.Element;

// Per-kind accent color (CSS var consumed by the card styles) + icon.
const KIND_STYLES = {
  push: { accent: "var(--theme-turquoise)", Icon: GoGitCommit },
  merge: { accent: "var(--theme-purple)", Icon: GoGitMerge },
  release: { accent: "var(--theme-orange)", Icon: GoTag },
  create: { accent: "var(--theme-green)", Icon: GoRepo },
};

// Live GitHub activity strip (#78). Items are fetched and cached server-side;
// when there is nothing to show the whole section stays out of the page.
function RecentlyShipped({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div>
      <Element name="recently-shipped"></Element>
      <Row className="recently-shipped" data-testid="recently-shipped">
        <Col lg>
          <h1>
            <span role="img" aria-label="rocket">
              🚀
            </span>{" "}
            Recently Shipped
          </h1>
          <p className="shipped-intro">
            <span className="shipped-live">
              <span className="shipped-live-dot" aria-hidden="true"></span>
              live
            </span>
            Commits, merges, and releases — straight from my public GitHub
            activity.
          </p>
          <div className="shipped-strip-wrap">
            <ul className="shipped-strip">
              {items.map((item) => {
                const { accent, Icon } = KIND_STYLES[item.kind] || KIND_STYLES.push;
                return (
                  <li
                    key={item.id}
                    className="shipped-card"
                    style={{ "--shipped-accent": accent }}
                  >
                    <a
                      className="shipped-link"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="shipped-icon" aria-hidden="true">
                        <Icon />
                      </span>
                      <span className="shipped-body">
                        <span className="shipped-repo">{item.repoName}</span>
                        <span className="shipped-action">{item.label}</span>
                        {item.detail && (
                          <span className="shipped-detail">{item.detail}</span>
                        )}
                        <time className="shipped-time" dateTime={item.isoTime}>
                          {item.timeAgo}
                        </time>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="shipped-swipe-hint" aria-hidden="true">
              <span className="shipped-swipe-hint-label">Swipe</span>
              <span className="shipped-swipe-hint-chevrons">››</span>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default RecentlyShipped;
