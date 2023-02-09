import React from "react";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { FaGithubSquare } from "react-icons/fa";
import gearListIco from "../../../assets/images/apps/gearlist-ico.png";

function GearList() {
  return (
    <div>
      <Row className="project-row">
        <Col md="3" className="project-col tilt">
          <a
            href="https://github.com/twknab/gear_list_MEVN"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={gearListIco} className="project-icon" rounded fluid />
          </a>
        </Col>
        <Col md="9">
          <h3>GearList</h3>
          <p>
            <a
              href="https://github.com/twknab/gear_list_MEVN"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithubSquare size="1.5em" />
            </a>{" "}
            Gear management tool to help increase trip safety by allowing one to
            better prepare for adventures. Create gear lists, create gear items,
            add items to lists or lists to items. See gross list weights, and
            real-time pack weight. This tool uses{" "}
            <a
              href="https://vuejs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              VueJS
            </a>{" "}
            and{" "}
            <a
              href="https://muse-ui.org/#/en-US"
              target="_blank"
              rel="noopener noreferrer"
            >
              MuseUI
            </a>{" "}
            for the front-end, and the backend is powered by{" "}
            <a
              href="https://nodejs.org/en/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Node
            </a>
            /
            <a
              href="https://expressjs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Express
            </a>
            /
            <a
              href="https://www.mongodb.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mongo
            </a>
            .
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default GearList;
