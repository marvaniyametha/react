import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { signInAsync } from "../service/ation/athencation";
import "./Signin.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errMsg, user } = useSelector((state) => state.authReducer);

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
    dispatch(signInAsync(inputForm));
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <Container fluid className="signin-dark-container">
      <Row className="vh-100">

        {/* LEFT DARK HERO AREA */}
        <Col md={6} className="d-none d-md-flex align-items-center justify-content-center signin-dark-left">
          <div className="dark-hero-text">
            <h1>Welcome Back</h1>
            <p>Your stories are waiting for you — let's continue.</p>
          </div>
        </Col>

        {/* RIGHT FORM */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <Card className="signin-dark-card p-5">
            <h2 className="text-center mb-2">Sign In</h2>
            <p className="text-center text-secondary mb-4">
              Access your blog dashboard
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
                  placeholder="you@mail.com"
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
                Sign In
              </Button>
            </Form>

            <p className="text-center mt-4 text-secondary">
              Don’t have an account?{" "}
              <Link to="/signUp" className="neon-link">
                Sign Up
              </Link>
            </p>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default SignIn;
