import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync } from "../service/ation/athencation";
import "./Signup.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errMsg, isCreated } = useSelector((state) => state.authReducer);

  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
  });

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputForm.email || !inputForm.password) {
      alert("Please fill all fields");
      return;
    }
    dispatch(createUserAsync(inputForm));
  };

  useEffect(() => {
    if (isCreated) {
      navigate("/signIn");
    }
  }, [isCreated, navigate]);

  return (
    <Container fluid className="signup-dark-container">
      <Row className="vh-100">

        {/* LEFT ILLUSTRATION SIDE */}
        <Col md={6} className="d-none d-md-flex align-items-center justify-content-center dark-left">
          <div className="hero-text">
            <h1>Write. Share. Inspire.</h1>
            <p>Your voice belongs here — start your journey today.</p>
          </div>
        </Col>

        {/* RIGHT FORM SIDE */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <Card className="dark-card p-5">
            <h2 className="text-center mb-3">Create Account</h2>
            <p className="text-center text-secondary mb-4">
              Join our blogging community
            </p>

            {errMsg && <p className="text-danger text-center">{errMsg}</p>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={inputForm.email}
                  onChange={handleChanged}
                  className="dark-input"
                  placeholder="example@mail.com"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={inputForm.password}
                  onChange={handleChanged}
                  className="dark-input"
                  placeholder="********"
                />
              </Form.Group>

              <Button type="submit" className="dark-btn w-100">
                Sign Up
              </Button>
            </Form>

            <p className="text-center mt-4 text-secondary">
              Already have an account?{" "}
              <Link to="/signIn" className="neon-link">
                Sign In
              </Link>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
