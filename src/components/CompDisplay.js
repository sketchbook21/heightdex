import React, { useState, useEffect } from "react";
import { Container, Row, Image as RBImage, Col } from "react-bootstrap";

const CompDisplay = ({ pokemon }) => {
  const [dimensions, setDimensions] = useState({});
  const [dimFetched, setDimFetched] = useState(false);
  const { name, height: pokemonHeight } = pokemon;

  useEffect(() => {
    setDimFetched(false);
  }, [pokemon.name]);

  function checkDimensions(url) {
    var img = new Image();
    img.onload = function () {
      setDimensions({
        width: this.width,
        height: this.height,
      });
    };
    img.src = url;
    return img;
  }

  let pokemonUrl = "https://img.pokemondb.net/artwork/pikachu.jpg";
  if (name) {
    pokemonUrl = `https://img.pokemondb.net/artwork/${name.toLowerCase()}.jpg`;
    if (!dimFetched) {
      checkDimensions(pokemonUrl);
      setDimFetched(true);
    }
  }
  const pikachuDimensions = { width: 360, height: 337 };
  const humanHeight = 16.5;

  let pokemonWidth;
  let humanWidth;
  if (!pokemonHeight) {
    let humanPixels = pikachuDimensions.height * (humanHeight / 4);
    pokemonWidth =
      pikachuDimensions.width / (pikachuDimensions.width + humanPixels);
    humanWidth = 1 - pokemonWidth;
  } else {
    let humanPixels = dimensions.height * (humanHeight / pokemonHeight);
    pokemonWidth = dimensions.width / (dimensions.width + humanPixels);
    humanWidth = 1 - pokemonWidth;
  }

  return (
    <Container className="cont">
      <Row className="d-flex mx-auto">
        <Col className="d-flex justify-content-center align-items-end">
          <RBImage
            src="/images/boy.jpg"
            rounded
            style={{
              width: `${humanWidth * 90}%`,
            }}
          />
          <RBImage
            src={pokemonUrl}
            rounded
            style={{
              width: `${pokemonWidth * 90}%`,
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CompDisplay;
