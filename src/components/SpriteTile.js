import React from "react";
import { Col, Image } from "react-bootstrap";

const SpriteTile = ({ index, pokemon, setPokedex }) => {
  return (
    <Col className="align-center" onClick={() => setPokedex(pokemon.name)}>
      <Image className="sprite" src={pokemon.sprite} />
      <br />
      <p>{pokemon.name}</p>
    </Col>
  );
};

export default SpriteTile;
