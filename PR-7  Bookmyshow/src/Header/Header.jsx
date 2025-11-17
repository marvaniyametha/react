

import { useState } from "react";
import { Container, Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // search icon
import React from "react";


const Header = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // navigate to home with search query
            navigate(`/?search=${searchTerm}`);
            setSearchTerm("");
        }
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm py-2">
            <Container>
                {/* Brand */}
                <Navbar.Brand as={Link} to="/" className="fs-3 fw-bold text-danger">
                    🎟️ BookMyShow
                </Navbar.Brand>

                {/* Toggle for mobile */}
                <Navbar.Toggle aria-controls="main-navbar-nav" />

                <Navbar.Collapse id="main-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
                        <Nav.Link as={Link} to="/Add-Movies" className="mx-2">Add Movies</Nav.Link>
                    </Nav>

                    {/* Search Bar */}
                    
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <FormControl
                            type="search"
                            placeholder="Search movies..."
                            className="me-2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-light" type="submit">
                            <FaSearch />
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;

