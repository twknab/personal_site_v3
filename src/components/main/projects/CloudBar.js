import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { FaGithub } from "react-icons/fa";
import cloudBarIco from "../../../assets/images/apps/cloudbar-ico.svg";

const REPO = "https://github.com/twknab/gcp-system-tray-admin";

function CloudBar() {
  return (
    <div>
      <Row className="project-row">
        <Col
          md="3"
          className="project-col tilt"
          onClick={() => window.open(REPO, "_blank")}
        >
          <Image
            src={cloudBarIco.src}
            alt="CloudBar app icon"
            className="project-icon"
            rounded
            fluid
          />
        </Col>
        <Col md="9">
          <h3>CloudBar</h3>
          <p>
            A read-only{" "}
            <a
              href="https://cloud.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Cloud
            </a>{" "}
            dashboard for the macOS menu bar: month-to-date spend against the
            budget, what is deployed across every project, and whether any of it
            is on fire. Read-only is enforced, not promised &mdash; every request
            passes through a guard that allows only <code>GET</code> and
            BigQuery <code>SELECT</code>, and a test asserts it. Spend comes from
            the billing export, with every query partition-filtered and capped by{" "}
            <code>maximumBytesBilled</code> so a runaway query fails for free
            instead of billing you. The design rule is honest status: a green
            check appears only when a resource is up <em>and</em> monitoring
            actually covers it, so something deployed but unwatched shows{" "}
            <code>?</code> rather than a reassuring tick, unknown spend is never
            shown as zero, and every number carries its age. A failing or
            permission-denied source degrades to &ldquo;unavailable&rdquo; with a
            reason while the rest still renders. Written in{" "}
            <a
              href="https://www.typescriptlang.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              TypeScript
            </a>{" "}
            as a{" "}
            <a
              href="https://swiftbar.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              SwiftBar
            </a>{" "}
            plugin, it holds no credentials of its own and signs in with your
            existing gcloud session.
          </p>
          <Button
            variant="primary"
            size="lg"
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="project-btn"
          >
            <FaGithub aria-hidden="true" />
            View on GitHub
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default CloudBar;
