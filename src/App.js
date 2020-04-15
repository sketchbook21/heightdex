import React, { useState, useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import "./App.scss";
import Search from "./components/Search";
import Footer from "./components/Footer";
import CompDisplay from "./components/CompDisplay";

const App = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    isLoading(true);
    const pokemon = [];
    const promises = new Array(807)
      .fill()
      .map((value, index) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}/`)
      );

    await Promise.all(promises).then((pokemonArr) => {
      return pokemonArr.map((response) =>
        response
          .json()
          .then(({ name, sprites: { front_default: sprite }, height }) => {
            const capitalizedName =
              name.charAt(0).toUpperCase() + name.slice(1);
            return pokemon.push({ name: capitalizedName, sprite, height });
          })
      );
    });
    setOptions(pokemon);
    isLoading(false);
  };

  const setPokedex = (poke) => {
    setSearch(poke);
    setDisplay(false);
  };

  const handleInputChange = (input) => {
    setSearch(input);
    if (input.length > 1) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  let content;
  if (loading) {
    content = (
      <Container className="h-100">
        <Spinner animation="border" variant="warning" />
      </Container>
    );
  } else {
    content = (
      <Container>
        <Search
          display={display}
          options={options}
          search={search}
          setPokedex={setPokedex}
          handleInputChange={handleInputChange}
        />
        <Row>
          <CompDisplay />
        </Row>
      </Container>
    );
  }

  return (
    <>
      {content}
      <Footer />
    </>
  );
};

export default App;
