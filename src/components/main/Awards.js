import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SectionHeading from "../common/SectionHeading";
import { FaCaretRight } from "react-icons/fa";

function Awards() {
  return (
    <div>
      <Row className="awards">
        <Col lg>
          <SectionHeading id="awards" label="Awards">
            <span role="img" aria-label="awards">
              ⭐️
            </span>{" "}
            Awards
          </SectionHeading>
          <p>
            <FaCaretRight size="1.2em" />
            Received the{" "}
            <strong>Fearless Trailblazer</strong> award from a Major Educational
            Company in 2025.
          </p>
          <p>
            <FaCaretRight size="1.2em" />
            Student recycling work lead to University of Iowa receiving $60,000
            DNR grant and Iowa Recycling Association Best Practices Award.
          </p>
          <p>
            <FaCaretRight size="1.2em" />
            Awarded student conservation{" "}
            <a
              href="https://www.continuetolearn.uiowa.edu/lakesidelab/university/scholarships/parker-gentry.html"
              target="_blank" rel="noopener noreferrer"
            >
              Parker Gentry Award
            </a>{" "}
            and $700 scholarship for my performance and group leadership during
            field work.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Awards;
