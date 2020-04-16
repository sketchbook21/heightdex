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
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    fetchPokemon();
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (event.target.id !== "search" && event.target.className !== "sprite") {
      setDisplay(false);
    }
  };

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
          .then(({ id, name, sprites: { front_default: sprite }, height }) => {
            const capitalizedName =
              name.charAt(0).toUpperCase() + name.slice(1);
            if (sprite === null) {
              sprite = "/pokeball.jpg";
            }
            pokemon.push({
              id,
              name: capitalizedName,
              sprite,
              height,
            });
            pokemon.sort((a, b) => {
              return a.id > b.id ? 1 : -1;
            });
          })
      );
    });
    setOptions(pokemon);
    isLoading(false);
  };

  const setPokedex = (pokemon) => {
    setSearch(pokemon.name);
    setSelectedPokemon({
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
    });
    setDisplay(false);
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
          setDisplay={setDisplay}
          options={options}
          search={search}
          setSearch={setSearch}
          setPokedex={setPokedex}
        />
        <Row>
          <CompDisplay pokemon={selectedPokemon} />
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
