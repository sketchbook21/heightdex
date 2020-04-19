import React, { useState, useEffect } from "react";
import { Container, Row, Spinner, Alert } from "react-bootstrap";
import "./App.scss";
import Search from "./components/Search";
import Footer from "./components/Footer";
import CompDisplay from "./components/CompDisplay";
import CompSelector from "./components/CompSelector";

const App = () => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [selectedComp, setSelectedComp] = useState("Boy");
  const [customHeight, setCustomHeight] = useState(0);
  const [loading, isLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const fetchPikachu = async () => {
      let pikachuData;
      await fetch(`https://pokeapi.co/api/v2/pokemon/25/`)
        .then((response) => response.json())
        .then(
          (response) =>
            (pikachuData = {
              id: response.id,
              name: capitalizeName(response.name),
              sprite: response.sprites.front_default,
              height: response.height,
            })
        );

      const description = await fetchDescription(pikachuData);

      pikachuData["description"] = description;

      setSelectedPokemon(pikachuData);
    };

    const fetchPokemon = async () => {
      isLoading(true);
      await fetchPikachu();
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
            .then(
              ({ id, name, sprites: { front_default: sprite }, height }) => {
                if (sprite === null) {
                  sprite = "/images/pokeball.jpg";
                }
                pokemon.push({
                  id,
                  name: capitalizeName(name),
                  sprite,
                  height,
                });
                pokemon.sort((a, b) => {
                  return a.id > b.id ? 1 : -1;
                });
              }
            )
        );
      });
      setOptions(pokemon);
      isLoading(false);
    };

    fetchPokemon();

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      event.target.id !== "search" &&
      event.target.className !== "sprite" &&
      event.target.className !== "options-container row"
    ) {
      setDisplay(false);
    }
  };

  const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const fetchDescription = async (pokemon) => {
    let flavor_text;
    await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`)
      .then((response) => response.json())
      .then((response) =>
        response.flavor_text_entries.some((entry) => {
          if (entry.language.name === "en") {
            const replaceReturns = entry.flavor_text.replace(
              /\r\n|\n|\r/g,
              " "
            );
            flavor_text = replaceReturns.replace(".", ". ");
            return true;
          }
          return false;
        })
      );

    return flavor_text;
  };

  const setPokedex = async (pokemon) => {
    setSearch(pokemon.name);
    setDisplay(false);
    const description = await fetchDescription(pokemon);
    setSelectedPokemon({
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      description,
    });
  };

  let content;
  if (loading) {
    content = (
      <div
        id="spinner-container"
        className="d-flex align-items-center align-self-center "
      >
        <Spinner animation="grow" variant="warning" />
      </div>
    );
  } else {
    content = (
      <Container>
        <Container className="search-container">
          <Search
            display={display}
            setDisplay={setDisplay}
            options={options}
            search={search}
            setSearch={setSearch}
            setPokedex={setPokedex}
          />
        </Container>
        <Row>
          <CompDisplay
            pokemon={selectedPokemon}
            selectedComp={selectedComp}
            customHeight={customHeight}
          />
        </Row>
      </Container>
    );
  }

  return (
    <>
      {content}
      <div className="mt-auto">
        {alert && (
          <div className="mx-auto" id="input-alert">
            <Alert variant="warning">Please enter height</Alert>
          </div>
        )}
        {!loading && (
          <CompSelector
            selectedComp={selectedComp}
            setSelectedComp={setSelectedComp}
            setCustomHeight={setCustomHeight}
            setAlert={setAlert}
          />
        )}

        <Footer />
      </div>
    </>
  );
};

export default App;
