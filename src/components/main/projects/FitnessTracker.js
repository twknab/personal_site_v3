import React from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { FaGithubSquare } from "react-icons/fa";
import fitnessTrackerIco from "../../../assets/images/apps/fitnesstracker-ico.png";

function FitnessTracker() {
  return (
    <div>
      <Row>
        <Col md="3" className="project-col">
          <a href="https://github.com/twknab/workout_tracker" target="_new">
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
            <a href="https://github.com/twknab/workout_tracker" target="_new">
              <FaGithubSquare size="1.5em" />
            </a>{" "}
            Fitness tracking tool allowing user to record workouts and
            repeitions. Powered by{" "}
            <a href="https://www.python.org/" target="_new">
              Python 3
            </a>{" "}
            using <a href="https://www.djangoproject.com/">Django</a> with{" "}
            <a href="https://getbootstrap.com/" target="_new">
              Bootstrap 4
            </a>
            .
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default FitnessTracker;
