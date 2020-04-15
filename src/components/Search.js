import React from "react";
import { Row, InputGroup, FormControl } from "react-bootstrap";
import SpriteTile from "./SpriteTile";

const Search = ({
  display,
  options,
  search,
  setPokedex,
  handleInputChange,
}) => {
  return (
    <>
      <Row className="w-80">
        <InputGroup className="mt-5 mb-3">
          <FormControl
            placeholder="Search Pokemon"
            id="search"
            value={search}
            onChange={(event) => handleInputChange(event.target.value)}
            onFocus={() => handleInputChange("")}
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
