import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { FaHandSparkles } from "react-icons/fa";

const Header = () => {
  return (
    <Navbar
      expand="lg"
      className="shadow-sm py-3"
      style={{
        background: "linear-gradient(90deg, #009688, #80cbc4)", // mint-teal gradient
        boxShadow: "0 4px 25px rgba(0, 150, 136, 0.3)",
      }}
    >
      <Container>
        <Navbar.Brand
          className="fw-bold text-uppercase mx-auto d-flex align-items-center text-white"
          style={{
            letterSpacing: "1.5px",
            fontSize: "1.3rem",
            textShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          <FaHandSparkles className="me-2 fs-3 text-light" />
          Nail Art Employee Management
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
