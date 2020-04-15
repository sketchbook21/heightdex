import React from "react";
import { Container, InputGroup, FormControl, Spinner } from "react-bootstrap";

const Search = ({
  display,
  setDisplay,
  options,
  search,
  setPokedex,
  handleInputChange,
}) => {
  return (
    <>
      <InputGroup className="mt-5 mb-3">
        <FormControl
          placeholder="Search Pokemon"
          id="search"
          value={search}
          onChange={(event) => handleInputChange(event.target.value)}
        />
      </InputGroup>
      {display && (
        <div className="options-container w-100">
          {options
            .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
            .map((value, index) => {
              return (
                <div
                  className="option"
                  key={index}
                  onClick={() => setPokedex(value.name)}
                >
                  <span>{value.name}</span>
                  <img src={value.sprite} alt="pokemon" />
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default Search;
