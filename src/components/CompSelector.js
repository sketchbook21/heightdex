import React, { useState } from "react";
import {
  Container,
  Button,
  DropdownButton,
  Dropdown,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const CompSelector = ({ selectedComp, setSelectedComp }) => {
  const [units, setUnits] = useState("ft");

  let heightInputPlaceholder;
  if (units === "ft") {
    heightInputPlaceholder = "Feet";
  } else {
    heightInputPlaceholder = "Centimeters";
  }

  return (
    <Container
      className="d-flex justify-content-center"
      style={{ marginBottom: "5vh" }}
    >
      <DropdownButton
        id="dropdown-basic-button"
        title={selectedComp}
        drop="up"
        variant="warning"
        style={{ marginRight: "10px" }}
        // className="height-input"
      >
        <Dropdown.Item onClick={() => setSelectedComp("Boy")}>
          Boy
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSelectedComp("Girl")}>
          Girl
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSelectedComp("Shaq")}>
          Shaq
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSelectedComp("Giraffe")}>
          Giraffe
        </Dropdown.Item>
      </DropdownButton>
      <InputGroup style={{ width: "250px" }}>
        <FormControl
          placeholder={heightInputPlaceholder}
          // id="height-input"
          // value={search}
          // onChange={(event) => setSearch(event.target.value)}
          // onClick={handleClick}
        />
        {units === "ft" && (
          <FormControl
            placeholder="Inches"
            // id="height-input"
            // value={search}
            // onChange={(event) => setSearch(event.target.value)}
            // onClick={handleClick}
          />
        )}
        <InputGroup.Append>
          <DropdownButton
            id="dropdown-basic-button"
            title={units}
            drop="up"
            variant="secondary"
            className="height-input"
          >
            <Dropdown.Item onClick={() => setUnits("ft")}>ft</Dropdown.Item>
            <Dropdown.Item onClick={() => setUnits("cm")}>cm</Dropdown.Item>
          </DropdownButton>
        </InputGroup.Append>
      </InputGroup>
    </Container>
  );
};

export default CompSelector;
