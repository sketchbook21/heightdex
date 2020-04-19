import React from "react";
import { Row, Col, Image } from "react-bootstrap";

const FooterLink = ({ name, url, logo }) => {
  return (
    <Col>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Row className="d-flex justify-content-center">
          <Image className="logo" src={logo} />
        </Row>
        <Row className="d-flex justify-content-center mt-2">{name}</Row>
      </a>
    </Col>
  );
};

export default FooterLink;
