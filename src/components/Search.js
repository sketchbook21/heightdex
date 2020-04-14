import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

const Search = () => {
  return (
    <InputGroup className="mt-5 mb-3">
      <FormControl placeholder="Search Pokemon" id="search" />
    </InputGroup>
  );
};

export default Search;
