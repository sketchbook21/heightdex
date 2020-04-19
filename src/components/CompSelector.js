import React, { useState } from "react";
import {
  Container,
  Button,
  DropdownButton,
  Dropdown,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import compHeights from "../helpers/compHeights";

export const convertToInches = (centimeters) => {
  const totalInches = Math.round(centimeters / 2.54);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;

  return { feet, inches };
};

export const convertToCm = (inches) => {
  const cm = Math.round(inches * 2.54);

  return cm;
};

const CompSelector = ({
  selectedComp,
  setSelectedComp,
  setCustomHeight,
  setAlert,
}) => {
  const [units, setUnits] = useState("ft");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [disabled, setDisabled] = useState(false);

  let heightInputPlaceholder;
  if (units === "ft") {
    heightInputPlaceholder = "Feet";
  } else {
    heightInputPlaceholder = "Centimeters";
  }

  const handleCompChange = ({ name, height }) => {
    setSelectedComp(name);
    const convertedHeight = convertToInches(height);
    setHeightFeet(convertedHeight.feet);
    setHeightInches(convertedHeight.inches);
    setHeightCm(height);

    if (name === "Shaq" || name === "Giraffe") {
      setDisabled(true);
    } else {
      setDisabled(false);
      setHeightFeet("");
      setHeightInches("");
      setHeightCm("");
      setCustomHeight(0);
    }
  };

  const handleInputChange = ({ event, inputNumber }) => {
    if (
      event &&
      event.target &&
      event.target.validity &&
      event.target.validity.valid
    ) {
      if (units === "ft") {
        if (inputNumber === 1) {
          setHeightFeet(+event.target.value);
        } else {
          setHeightInches(+event.target.value);
        }
      } else {
        setHeightCm(+event.target.value);
      }
    }
  };

  const handleInputClick = ({ inputNumber }) => {
    if (units === "ft") {
      if (inputNumber === 1) {
        setHeightFeet("");
      } else {
        setHeightInches("");
      }
    } else {
      setHeightCm("");
    }
  };

  const handleSubmit = () => {
    if (units === "ft") {
      const totalInches = +heightFeet * 12 + +heightInches;
      if (totalInches > 0) {
        const feet = Math.floor(totalInches / 12);
        const inches = totalInches % 12;
        setHeightFeet(feet);
        setHeightInches(inches);

        const convertedHeight = convertToCm(totalInches);
        setHeightCm(convertedHeight);
        // send custom height to parent
        setCustomHeight(convertedHeight);
      } else {
        triggerAlert();
        setHeightFeet("");
        setHeightInches("");
      }
      return;
    } else {
      if (heightCm > 0) {
        const convertedHeight = convertToInches(heightCm);
        setHeightFeet(convertedHeight.feet);
        setHeightInches(convertedHeight.inches);
        // send custom height to parent
        setCustomHeight(heightCm);
      } else {
        triggerAlert();
        setHeightCm("");
      }
    }
  };

  const triggerAlert = () => {
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
  };

  const displayUnits = units === "ft" ? heightFeet : heightCm;

  return (
    <Container
      className="d-flex justify-content-center"
      style={{ marginBottom: "5vh" }}
    >
      <DropdownButton
        title={selectedComp}
        drop="up"
        variant="warning"
        style={{ marginRight: "10px" }}
      >
        <Dropdown.Item
          onClick={() =>
            handleCompChange({ name: "Boy", height: compHeights.boy })
          }
        >
          Boy
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() =>
            handleCompChange({ name: "Girl", height: compHeights.girl })
          }
        >
          Girl
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() =>
            handleCompChange({ name: "Shaq", height: compHeights.shaq })
          }
        >
          Shaq
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() =>
            handleCompChange({
              name: "Giraffe",
              height: compHeights.giraffe,
            })
          }
        >
          Giraffe
        </Dropdown.Item>
      </DropdownButton>
      <InputGroup style={{ width: "280px" }}>
        <FormControl
          placeholder={heightInputPlaceholder}
          value={displayUnits}
          pattern="[0-9]*"
          onChange={(event) => handleInputChange({ event, inputNumber: 1 })}
          onClick={() => handleInputClick({ inputNumber: 1 })}
          disabled={disabled}
        />
        {units === "ft" && (
          <FormControl
            placeholder="Inches"
            disabled={disabled}
            value={heightInches}
            pattern="[0-9]*"
            max="11"
            onChange={(event) => handleInputChange({ event, inputNumber: 2 })}
            onClick={() => handleInputClick({ inputNumber: 2 })}
          />
        )}
        <DropdownButton
          id="unit-selector"
          title={units}
          drop="up"
          variant="secondary"
          className="height-input"
        >
          <Dropdown.Item onClick={() => setUnits("ft")}>ft</Dropdown.Item>
          <Dropdown.Item onClick={() => setUnits("cm")}>cm</Dropdown.Item>
        </DropdownButton>
        <InputGroup.Append>
          <Button
            variant="info"
            style={{ zIndex: "0" }}
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Container>
  );
};

export default CompSelector;
