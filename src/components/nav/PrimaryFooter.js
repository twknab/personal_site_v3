import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import washingtonStateOutline from "../../assets/images/washington-state-outline.png";
import LottieFigure from "../fun/LottieFigure";
import { footerAnimation } from "../../assets/lottie";

function PrimaryFooter() {
  return (
    <div>
      <Container
        fluid
        className="pl-0 pr-0 h-100 footer"
        data-testid="primary-footer"
      >
        <LottieFigure
          animationData={footerAnimation}
          className="lottie-footer"
          ariaLabel="Animated footer illustration"
        />
        <Row className="tagline">
          <Col lg>
            <p className="crafted-tag">
              <span className="wa-state">
                <Image src={washingtonStateOutline.src} />
              </span>
              <span className="crafted-with-care">
                Crafted with{" "}
                <span role="img" aria-label="love" className="love-icon">
                  💚
                </span>{" "}
                from Washington
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
              2021 - {new Date().getFullYear()}{" "}
              <a href="https://timknab.dev">timknab.dev</a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PrimaryFooter;
