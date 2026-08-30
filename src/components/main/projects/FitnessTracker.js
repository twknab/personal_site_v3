import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { FaGithub } from "react-icons/fa";
import fitnessTrackerIco from "../../../assets/images/apps/fitnesstracker-ico.png";
import addWorkout from "../../../assets/images/projects/fitnesstracker/add-workout.png";
import dashboard from "../../../assets/images/projects/fitnesstracker/dashboard.png";
import summary from "../../../assets/images/projects/fitnesstracker/summary.png";
import workout from "../../../assets/images/projects/fitnesstracker/workout.png";
import ProjectGallery from "./ProjectGallery";

const REPO = "https://github.com/twknab/workout_tracker";

const SHOTS = [
  { src: dashboard, alt: "Fitness dashboard" },
  { src: workout, alt: "Active workout with exercises" },
  { src: addWorkout, alt: "Add a workout" },
  { src: summary, alt: "End-of-workout summary" },
];

function FitnessTracker() {
  return (
    <div className="project-block">
      <Row className="project-row">
        <Col
          md="3"
          className="project-col tilt"
          onClick={() => window.open(REPO, "_blank")}
        >
          <Image
            src={fitnessTrackerIco.src}
            className="project-icon"
            alt=""
            rounded
            fluid
          />
        </Col>
        <Col md="9">
          <h3>Fitness Tracker</h3>
          <p>
            Fitness tracking tool allowing user to record workouts and
            repeitions. Powered by{" "}
            <a
              href="https://www.python.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Python 3
            </a>{" "}
            using{" "}
            <a
              href="https://www.djangoproject.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Django
            </a>{" "}
            with{" "}
            <a
              href="https://getbootstrap.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bootstrap 4
            </a>
            .
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
      <ProjectGallery images={SHOTS} projectName="Fitness Tracker" />
    </div>
  );
}

export default FitnessTracker;
