import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaCaretRight } from "react-icons/fa";

function Awards() {
  return (
    <div>
      <Row className="awards">
        <Col lg>
          <h1>
            <span role="img" aria-label="awards">
              ⭐️
            </span>{" "}
            Awards
          </h1>
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
              target="_new"
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
