import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import washingtonStateOutline from "../../assets/images/washington-state-outline.png";

function PrimaryFooter() {
  return (
    <div>
      <Container
        fluid="true"
        className="pl-0 pr-0 h-100 container-fluid footer"
      >
        <Row className="tagline">
          <Col lg>
            <p className="handcrafted-tag">
              <span className="wa-state">
                <Image src={washingtonStateOutline} />
              </span>
              <span className="crafted-with-care">
                handcrafted with{" "}
                <span role="img" aria-label="love" className="love-icon">
                  💚
                </span>{" "}
              </span>
            </p>
          </Col>
        </Row>
        <Row className="copyright">
          <Col lg className="copyright-text">
            <p>
              <span role="img" aria-label="copyright">
                ©
              </span>{" "}
              {new Date().getFullYear()} <a href="https://timknab.dev">timknab.dev</a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PrimaryFooter;
