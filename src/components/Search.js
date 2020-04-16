import React from "react";
import { Row, InputGroup, FormControl } from "react-bootstrap";
import SpriteTile from "./SpriteTile";

const Search = ({
  display,
  setDisplay,
  options,
  search,
  setSearch,
  setPokedex,
}) => {
  const handleClick = () => {
    setDisplay(true);
    setSearch("");
  };

  return (
    <>
      <Row className="w-80">
        <InputGroup className="mt-5 mb-3">
          <FormControl
            placeholder="Search Pokemon"
            id="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onClick={handleClick}
          />
        </InputGroup>
      </Row>
      {display && (
        <Row className="options-container">
          {options
            .filter(
              ({ name }) =>
                name.toLowerCase().indexOf(search.toLowerCase()) > -1
            )
            .map((value, index) => {
              return (
                <SpriteTile
                  key={index}
                  pokemon={value}
                  setPokedex={setPokedex}
                />
              );
            })}
        </Row>
      )}
    </>
  );
};

export default Search;
