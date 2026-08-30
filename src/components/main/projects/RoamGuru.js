import React from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import roamGuruIco from "../../../assets/images/apps/roamguru-ico.png";
import accent from "../../../assets/images/projects/roamguru/accent.png";
import destination from "../../../assets/images/projects/roamguru/destination.png";
import tripReview from "../../../assets/images/projects/roamguru/trip-review.png";
import tripType from "../../../assets/images/projects/roamguru/trip-type.png";
import trips from "../../../assets/images/projects/roamguru/trips.png";
import ProjectGallery from "./ProjectGallery";

// Captions describe what is actually on screen. Every one of these was wrong
// before -- two gear lists labelled "awards" and a "ready check", a trip list
// labelled "trip detail", and a fourth image that was not this app at all.
// Captured from the app running on an iPhone 16 Pro simulator, built from
// source and signed in against the real dev Firebase project -- so the map,
// the place search and the suggested trip name are all live, not mocked.
const SHOTS = [
  { src: trips, alt: "Trips, with days out and what is upcoming" },
  { src: tripType, alt: "Starting a trip: what kind is it?" },
  { src: destination, alt: "Finding the destination" },
  { src: tripReview, alt: "The trip before you commit to it" },
  { src: accent, alt: "Choosing an accent colour on first run" },
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
