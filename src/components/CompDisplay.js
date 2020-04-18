import React, { useState, useEffect } from "react";
import { Container, Row, Image as RBImage, Col } from "react-bootstrap";
import compHeights from "../helpers/compHeights";

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

  const pikachuDimensions = { width: 360, height: 337 };

  const pokemonHeight = height * 10;
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
  if (!pokemonHeight) {
    let humanPixels =
      pikachuDimensions.height * (compHeight / compHeights.pikachu);
    pokemonWidth =
      pikachuDimensions.width / (pikachuDimensions.width + humanPixels);
    humanWidth = 1 - pokemonWidth;
  } else {
    let humanPixels = dimensions.height * (compHeight / pokemonHeight);
    pokemonWidth = dimensions.width / (dimensions.width + humanPixels);
    humanWidth = 1 - pokemonWidth;
  }

  return (
    <Container className="cont">
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
  );
};

export default CompDisplay;
