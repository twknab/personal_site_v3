import React from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import roamGuruIco from "../../../assets/images/apps/roamguru-ico.png";

function RoamGuru() {
  return (
    <div>
      <Row className="project-row">
        <Col md="3" className="project-col tilt">
          <Image src={roamGuruIco.src} className="project-icon" rounded fluid />
        </Col>
        <Col md="9">
          <h3>RoamGuru</h3>
          <p>
            RoamGuru is a travel planning and adventure management platform
            designed to help travelers stay organized before, during, and after
            their journeys. Create trips, manage packing and task lists, track
            readiness, build itineraries, review weather conditions, and capture
            travel insights in one place. The mobile app is built with{" "}
            <a
              href="https://reactnative.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Native
            </a>{" "}
            (
            <a
              href="https://expo.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Expo
            </a>
            ), while the backend is powered by{" "}
            <a
              href="https://nestjs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NestJS
            </a>
            ,{" "}
            <a
              href="https://firebase.google.com/docs/auth"
              target="_blank"
              rel="noopener noreferrer"
            >
              Firebase Authentication
            </a>
            , and{" "}
            <a
              href="https://firebase.google.com/docs/firestore"
              target="_blank"
              rel="noopener noreferrer"
            >
              Firestore
            </a>
            .
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default RoamGuru;
