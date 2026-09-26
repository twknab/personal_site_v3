import React from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import mailDigestIco from "../../../assets/images/apps/maildigest-ico.svg";

function MailDigest() {
  return (
    <div>
      <Row className="project-row">
        <Col md="3" className="project-col tilt">
          <Image
            src={mailDigestIco.src}
            alt="Mail Digest app icon"
            className="project-icon"
            rounded
            fluid
          />
        </Col>
        <Col md="9">
          <h3>Mail Digest</h3>
          <p>
            A mail triage tool that reads several accounts three times a weekday
            and reports only what actually needs a person. It is read-only by
            construction &mdash; mailboxes open <code>readonly</code> and every
            fetch uses <code>BODY.PEEK</code> &mdash; and ships a checker that
            proves it, diffing unread counts over{" "}
            <a
              href="https://datatracker.ietf.org/doc/html/rfc3501"
              target="_blank"
              rel="noopener noreferrer"
            >
              IMAP
            </a>{" "}
            across a run rather than asking you to take its word for it. The
            interesting problem is identity: several aliases deliver into one
            inbox behind a single login, so the account cannot say which address
            owns a message &mdash; only the delivery headers can. That one fact
            decides how the digest is grouped, which bundle each message belongs
            to, and which address a drafted reply is sent from. Replies are
            written into the Drafts folder and never sent; the drafting module
            holds no send capability at all, and a test asserts it. Written in{" "}
            <a
              href="https://docs.python.org/3/library/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Python
            </a>{" "}
            with no dependencies outside the standard library, scheduled with{" "}
            <a
              href="https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              launchd
            </a>
            , surfaced in the menu bar through{" "}
            <a
              href="https://swiftbar.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              SwiftBar
            </a>
            , with{" "}
            <a
              href="https://claude.com/claude-code"
              target="_blank"
              rel="noopener noreferrer"
            >
              Claude
            </a>{" "}
            doing the triage itself. Runs entirely on one Mac; credentials live
            in the Keychain and nothing is uploaded. In private development.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default MailDigest;
