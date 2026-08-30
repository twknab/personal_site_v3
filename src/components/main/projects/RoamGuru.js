import React from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import roamGuruIco from "../../../assets/images/apps/roamguru-ico.png";
import gearList from "../../../assets/images/projects/roamguru/gear-list.png";
import tripsList from "../../../assets/images/projects/roamguru/trips-list.png";
import ProjectGallery from "./ProjectGallery";

// Captions describe what is actually on screen. Every one of these was wrong
// before -- two gear lists labelled "awards" and a "ready check", a trip list
// labelled "trip detail", and a fourth image that was not this app at all.
const SHOTS = [
  { src: tripsList, alt: "Trips list, filtered by trip type" },
  { src: gearList, alt: "A gear list with per-item weight and volume" },
];

function RoamGuru() {
  return (
    <div className="project-block">
      <Row className="project-row">
        <Col md="3" className="project-col tilt">
          <Image src={roamGuruIco.src} className="project-icon"
            alt="" rounded fluid />
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
      <ProjectGallery images={SHOTS} projectName="RoamGuru" />
    </div>
  );
}

export default RoamGuru;
