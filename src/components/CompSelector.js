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

const CompSelector = ({
  selectedComp,
  setSelectedComp,
  setCompHeight,
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

  const convertToInches = (centimeters) => {
    const totalInches = Math.round(centimeters / 2.54);
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;

    return { feet, inches };
  };

  const convertToCm = ({ feet, inches }) => {
    const inchesFromFeet = feet * 12;
    const totalInches = inchesFromFeet + +inches;
    const cm = Math.round(totalInches * 2.54);

    return cm;
  };

  const handleCompChange = ({ name, height }) => {
    setSelectedComp(name);
    const convertedHeight = convertToInches(height);
    setHeightFeet(`${convertedHeight.feet}'`);
    setHeightInches(`${convertedHeight.inches}"`);
    setHeightCm(height);

    if (name === "Shaq" || name === "Giraffe") {
      setDisabled(true);
    } else {
      setDisabled(false);
      setHeightFeet("");
      setHeightInches("");
      setHeightCm("");
    }
  };

  const handleInputChange = ({ event, inputNumber }) => {
    if (units == "ft") {
      if (inputNumber === 1) {
        setHeightFeet(event.target.value);
      } else {
        setHeightInches(event.target.value);
      }
    } else {
      setHeightCm(event.target.value);
    }
  };

  const handleSubmitClick = () => {
    if (units === "ft") {
      if (heightFeet > 0) {
        setHeightFeet(`${heightFeet}'`);
        if (heightInches === "") {
          setHeightInches(`0"`);
        } else {
          setHeightInches(`${heightInches}"`);
        }
      } else {
        triggerAlert();
        return;
      }
      const convertedHeight = convertToCm({
        feet: heightFeet,
        inches: heightInches,
      });
      setHeightCm(convertedHeight);
    } else if (units === "cm") {
      alert("hellow");
    }

    // setCompHeight();
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
        id="dropdown-basic-button"
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
          disabled={disabled}
        />
        {units === "ft" && (
          <FormControl
            placeholder="Inches"
            disabled={disabled}
            value={heightInches}
            pattern="[0-9]*"
            onChange={(event) => handleInputChange({ event, inputNumber: 2 })}
            // onClick={handleClick}
          />
        )}
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
        <InputGroup.Append>
          <Button
            variant="info"
            style={{ zIndex: "0" }}
            onClick={() => handleSubmitClick()}
          >
            Submit
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Container>
  );
};

export default CompSelector;
