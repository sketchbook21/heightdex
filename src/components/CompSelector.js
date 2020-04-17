import React from "react";
import {
  Container,
  Row,
  DropdownButton,
  Dropdown,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const CompSelector = ({ selectedComp, setSelectedComp }) => {
  return (
    <Container
      className="d-flex justify-content-center"
      style={{ marginBottom: "5vh" }}
    >
      <Row>
        <InputGroup>
          <InputGroup.Prepend>
            <DropdownButton
              id="dropdown-basic-button"
              title={selectedComp}
              drop="up"
              variant="warning"
              className="height-input"
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
          </InputGroup.Prepend>
          <FormControl
            placeholder="Customize Height"
            // id="height-input"
            // value={search}
            // onChange={(event) => setSearch(event.target.value)}
            // onClick={handleClick}
          />
        </InputGroup>
      </Row>
    </Container>
  );
};

export default CompSelector;
