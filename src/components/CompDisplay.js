import React, { useState, useEffect } from "react";
import { Container, Row, Image as RBImage, Col, Badge } from "react-bootstrap";
import compHeights from "../helpers/compHeights";

const convertToInches = (centimeters) => {
  const totalInches = Math.round(centimeters / 2.54);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;

  return { feet, inches };
};

const CompDisplay = ({ pokemon, selectedComp, customHeight }) => {
  const [dimensions, setDimensions] = useState({});
  const [dimFetched, setDimFetched] = useState(false);
  const { name, height } = pokemon;

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
    if (name === "Mimikyu-disguised") {
      pokemonUrl = `https://img.pokemondb.net/artwork/mimikyu.jpg`;
    } else {
      pokemonUrl = `https://img.pokemondb.net/artwork/${name.toLowerCase()}.jpg`;
    }
    if (!dimFetched) {
      checkDimensions(pokemonUrl);
      setDimFetched(true);
    }
  }

  const pokemonHeight = height ? height * 10 : compHeights.pikachu;
  let compHeight;
  let compPath;
  if (selectedComp === "Boy") {
    compPath = "/images/boy.jpg";
    compHeight = customHeight > 0 ? customHeight : compHeights.boy;
  } else if (selectedComp === "Girl") {
    compPath = "/images/girl.jpg";
    compHeight = customHeight > 0 ? customHeight : compHeights.girl;
  } else if (selectedComp === "Shaq") {
    compPath = "/images/shaq.jpg";
    compHeight = compHeights.shaq;
  } else if (selectedComp === "Giraffe") {
    compPath = "/images/giraffe.jpg";
    compHeight = compHeights.giraffe;
  }

  let pokemonWidth;
  let humanWidth;
  let humanPixels = dimensions.height * (compHeight / pokemonHeight);
  pokemonWidth = dimensions.width / (dimensions.width + humanPixels);
  humanWidth = 1 - pokemonWidth;

  let displayContClass;
  if (pokemonHeight / compHeight > 2 || pokemonHeight / compHeight < 0.5) {
    displayContClass = "cont alt-comp-width";
  } else {
    displayContClass = "cont comp-width";
  }

  const feetInchesHeight = convertToInches(pokemonHeight);

  return (
    <>
      <Container className={displayContClass}>
        <Row className="d-flex mx-auto">
          <Col className="d-flex justify-content-center align-items-end">
            <RBImage
              src={compPath}
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
      <Container>
        <Row className="d-flex justify-content-center">
          <Badge className="mt-3 mb-3" pill variant="warning">
            Height
          </Badge>
        </Row>
        <Row className="d-flex justify-content-center mb-3" id="comp-height">
          <span className="mr-3">
            {feetInchesHeight.feet}' - {feetInchesHeight.inches}"
          </span>
          |<span className="ml-3">{pokemonHeight} cm</span>
        </Row>
        <Row
          className="d-flex justify-content-center mx-auto"
          style={{ textAlign: "center", width: "320px" }}
        >
          {pokemon.description}
        </Row>
      </Container>
    </>
  );
};

export default CompDisplay;
