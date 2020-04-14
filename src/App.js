import React from "react";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import "./App.scss";
import Search from "./components/Search";
import Footer from "./components/Footer";
import CompDisplay from "./components/CompDisplay";

function App() {
  return (
    <>
      <Container className="w-50">
        <Row>
          <Search />
        </Row>
        <Row>
          <CompDisplay />
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default App;
