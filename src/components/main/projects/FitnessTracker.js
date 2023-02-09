import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import fitnessTrackerIco from "../../../assets/images/apps/fitnesstracker-ico.png";

function FitnessTracker() {
  return (
    <div>
      <Row className="project-row">
        <Col md="3" className="project-col tilt">
          <a
            href="https://github.com/twknab/workout_tracker"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={fitnessTrackerIco}
              className="project-icon"
              rounded
              fluid
            />
          </a>
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
            href="https://github.com/twknab/workout_tracker"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default FitnessTracker;
