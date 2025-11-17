
import { useEffect, useState } from "react";
import { getStorageData, setStorageData } from "../Services/Storage";
import { Card, Button, Container, Row, Col, Collapse } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [openIds, setOpenIds] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const data = getStorageData();
        setMovies(data);
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(location.search).get("search");
        if (query) {
            const filtered = movies.filter((movie) =>
                movie.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredMovies(filtered);
        } else {
            setFilteredMovies(movies);
        }
    }, [location.search, movies]);

    const handleEdit = (id) => {
        navigate(`/Edit-Movies/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            const updated = movies.filter((m) => m.id !== id);
            setMovies(updated);
            setStorageData(updated);
        }
    };

    const toggleDetails = (id) => {
        setOpenIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Movie Gallery</h2>
            <Row className="g-4">
                {filteredMovies.length === 0 ? (
                    <h5 className="text-center">No movies found.</h5>
                ) : (
                    filteredMovies.map((movie) => (
                        <Col md={4} sm={6} xs={12} key={movie.id}>
                            <Card className="shadow-sm border-0" style={{ borderBlockEndColor: "aqua" }}>
                                <Card.Img
                                    variant="top"
                                    src={movie.img}
                                    style={{ height: "250px", objectFit: "cover" }}
                                />
                                <Card.Body>
                                    <Card.Title className="text-center">
                                        {movie.name}
                                    </Card.Title>
                                    <div className="text-center">
                                        <Button
                                            variant="link"
                                            onClick={() => toggleDetails(movie.id)}
                                            style={{ textDecoration: "none" }}
                                        >
                                            {openIds.includes(movie.id)
                                                ? "▲ Hide Details"
                                                : "▼ View Details"}
                                        </Button>
                                    </div>

                                    <Collapse in={openIds.includes(movie.id)}>
                                        <div className="mt-3">
                                            <p><strong>Category:</strong> {movie.category}</p>
                                            <p><strong>Language:</strong> {movie.Languages}</p>
                                            <p><strong>Price:</strong> ₹{movie.price}</p>
                                            <p><strong>Description:</strong> {movie.desc}</p>

                                            <div className="d-flex justify-content-between mt-3">
                                                <Button
                                                    variant="outline-success"
                                                    size="sm"
                                                    onClick={() => handleEdit(movie.id)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(movie.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </Collapse>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};

export default Home;

