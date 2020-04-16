import React from "react";
import { Col, Image, Badge } from "react-bootstrap";

const SpriteTile = ({ pokemon, setPokedex }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setPokedex(pokemon);
    }
  };

  let displayId = "" + pokemon.id;
  while (displayId.length < 3) {
    displayId = "0" + displayId;
  }

  return (
    <Col
      className="align-center mb-4"
      onClick={() => setPokedex(pokemon)}
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      <Image className="sprite" src={pokemon.sprite} />
      <div className="mb-2">{pokemon.name}</div>
      <Badge className="number-badge" pill variant="light">
        {displayId}
      </Badge>
    </Col>
  );
};

export default SpriteTile;
