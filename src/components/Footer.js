import React, { useState } from "react";
import InfoIcon from "../icons/InfoIcon";
import { Modal, Row } from "react-bootstrap";
import FooterLink from "./FooterLink";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="d-flex footer heightdex-font justify-content-between py-3 bg-dark">
      <span className="invisible">a</span>
      HeightDex
      <div className="align-self-center finger">
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            className="d-flex justify-content-center"
            style={{ backgroundColor: "#333a40" }}
          >
            <Modal.Title
              className="heightdex-font"
              id="contained-modal-title-vcenter"
            >
              HeightDex
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              HeightDex was lovingly built by{" "}
              <a
                href="https://www.linkedin.com/in/gilberthsu/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontWeight: "700" }}
              >
                Gilbert Hsu
              </a>{" "}
              for pokemon fans everywhere.
            </p>
            <ul>
              <li className="mb-2">
                Project built in React with React Bootstrap
              </li>
              <li className="mb-2">Pokemon data fetched from PokeAPI</li>
              <li className="mb-2">Data available up to #807 Zeraora</li>
              <li className="mb-2">
                All content & design © Pokémon Database, 2008-2020
              </li>
              <li className="mb-2">
                Pokémon images & names © 1995-2020 Nintendo/Game Freak
              </li>
            </ul>
            <Row className="d-flex justify-content-between mt-3 pt-2">
              <FooterLink
                name="LinkedIn"
                logo="/images/linkedin-logo.png"
                url="https://www.linkedin.com/in/gilberthsu/"
              />
              <FooterLink
                name="Github"
                logo="/images/github-logo.png"
                url="https://github.com/sketchbook21"
              />
              <FooterLink
                name="PokeAPI"
                logo="/images/pokeapi-logo.png"
                url="https://pokeapi.co/docs/v2.html"
              />
            </Row>
          </Modal.Body>
        </Modal>
        <span onClick={() => setShowModal(true)}>
          <InfoIcon />
        </span>
      </div>
    </div>
  );
};

export default Footer;
