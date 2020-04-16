import React from "react";
import { Container, Row, Image, Col } from "react-bootstrap";

const CompDisplay = ({ pokemon }) => {
  const { name, height: pokemonHeight } = pokemon;
  let pokemonUrl = "https://img.pokemondb.net/artwork/pikachu.jpg";
  if (name) {
    pokemonUrl = `https://img.pokemondb.net/artwork/${name.toLowerCase()}.jpg`;
  }

  const humanHeight = 16.5;
  const maxImageHeight = 300;
  let pokemonImageHeight = maxImageHeight;
  let personImageHeight = maxImageHeight;

  if (!pokemonHeight) {
    pokemonImageHeight = maxImageHeight * (4 / humanHeight);
  } else if (pokemonHeight > humanHeight) {
    personImageHeight = maxImageHeight * (16.5 / pokemonHeight);
  } else {
    pokemonImageHeight = maxImageHeight * (pokemonHeight / humanHeight);
  }

  return (
    <Container className="cont">
      <Row className="align-items-end">
        <Col className="d-flex justify-content-end">
          <Image
            src="https://cdn.clipart.email/cd1a0326018498328550a0d2fb72666c_gray-silhouette-of-a-man-clip-art-at-clkercom-vector-clip-art-_204-592.png"
            rounded
            style={{ height: `${personImageHeight}px`, padding: "0 50px" }}
          />
        </Col>
        <Col className="d-flex justify-content-start">
          <Image
            src={pokemonUrl}
            rounded
            style={{ height: `${pokemonImageHeight}px` }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CompDisplay;
