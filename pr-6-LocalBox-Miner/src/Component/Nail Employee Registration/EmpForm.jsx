import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaUserPlus, FaCamera, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt, FaUserGraduate } from "react-icons/fa";
import "./EmpForm.css";
import { useState, useEffect } from "react";
import uniqueId from "generate-unique-id";

const NailForm = () => {
  const storageData = () => JSON.parse(localStorage.getItem("studentDetails")) || [];

  const emailregex = /^[^@]+@[^@]+\.[^@]+$/;
  const initialValue = {
    fullName: "",
    email: "",
    phone: "",
    joiningDate: "",
    experienceLevel: "",
    course: "",
    batchTime: "",
    address: "",
    imageUrl: "",
  };

  const [inputForm, setInputForm] = useState(initialValue);
  const [inputError, setInputError] = useState({});
  const [storage, setStorage] = useState(storageData());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const handleError = () => {
    let errors = {};
    if (inputForm.fullName.trim() === "") errors.fullNameErr = "Enter your full name";
    if (!emailregex.test(inputForm.email)) errors.emailErr = "Enter a valid email";
    if (inputForm.phone.length !== 10) errors.phoneErr = "Enter a 10-digit number";
    if (inputForm.joiningDate === "") errors.joiningDateErr = "Select a joining date";
    if (inputForm.experienceLevel === "") errors.experienceLevelErr = "Select experience level";
    if (inputForm.course === "") errors.courseErr = "Select a course";
    if (inputForm.batchTime === "") errors.batchTimeErr = "Select batch timing";
    if (inputForm.address === "") errors.addressErr = "Enter your address";
    if (inputForm.imageUrl === "") errors.imageUrlErr = "Provide an image URL";

    setInputError(errors);
    return Object.keys(errors).length === 0;
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  if (handleError()) {
    const newStudent = {
      ...inputForm,
      id: "STU" + uniqueId({ length: 5, useLetters: false }),
    };

    setStorage((prev) => [...prev, newStudent]);
    setInputForm(initialValue);
  }
};

  useEffect(() => {
    localStorage.setItem("studentDetails", JSON.stringify(storage));
  }, [storage]);

  return (
    <div className="modern-form-bg">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={7}>
            <div className="text-center mb-5">
              <div className="header-icon mb-3">
                {/* <FaUserGraduate /> */}
                <img src="public/nailart.png" alt="" width={100} height={100}/>
              </div>
       <h3
  className="fw-bold text-white"
  style={{
    textShadow: "0 0 10px rgba(255, 105, 180, 0.6)",
  }}
>
  ✨ Nail Art Course Registration ✨
</h3>
<p className="text-light">Join our academy and start your creative journey!</p>



            </div>

            <Card className="glass-form-card border-0">
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="form-group-modern">
                        <Form.Label className="fw-semibold">
                          Full Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          placeholder="Enter your name"
                          className="modern-input"
                          value={inputForm.fullName}
                          onChange={handleChange}
                        />
                        {inputError.fullNameErr && <small className="text-danger">{inputError.fullNameErr}</small>}
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="form-group-modern">
                        <Form.Label className="fw-semibold">
                          Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="example@mail.com"
                          className="modern-input"
                          value={inputForm.email}
                          onChange={handleChange}
                        />
                        {inputError.emailErr && <small className="text-danger">{inputError.emailErr}</small>}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group className="form-group-modern">
                        <Form.Label className="fw-semibold">Phone</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          placeholder="Enter 10-digit number"
                          maxLength={10}
                          className="modern-input"
                          value={inputForm.phone}
                          onChange={handleChange}
                        />
                        {inputError.phoneErr && <small className="text-danger">{inputError.phoneErr}</small>}
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="form-group-modern">
                        <Form.Label className="fw-semibold">
                          <FaCalendarAlt className="me-2" />
                          Joining Date
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="joiningDate"
                          className="modern-input"
                          value={inputForm.joiningDate}
                          onChange={handleChange}
                        />
                        {inputError.joiningDateErr && <small className="text-danger">{inputError.joiningDateErr}</small>}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col md={4}>
                      <Form.Group className="form-group-modern">
                        <Form.Label className="fw-semibold">Experience</Form.Label>
                        <Form.Select
                          name="experienceLevel"
                          className="modern-select"
                          value={inputForm.experienceLevel}
                          onChange={handleChange}
                        >
                          <option value="">Select level</option>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="professional">Professional</option>
                        </Form.Select>
                        {inputError.experienceLevelErr && <small className="text-danger">{inputError.experienceLevelErr}</small>}
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group className="form-group-modern">
                        <Form.Label className="fw-semibold">Course</Form.Label>
                        <Form.Select
                          name="course"
                          className="modern-select"
                          value={inputForm.course}
                          onChange={handleChange}
                        >
                          <option value="">Choose course</option>
                          <option value="basic-nail-art">Basic Nail Art</option>
                          <option value="advanced-nail-art">Advanced Nail Art</option>
                          <option value="gel-extension">Gel Extension</option>
                          <option value="acrylic-extension">Acrylic Extension</option>
                          <option value="3d-nail-art">3D Nail Art</option>
                          <option value="nail-care">Nail Care & Hygiene</option>
                        </Form.Select>
                        {inputError.courseErr && <small className="text-danger">{inputError.courseErr}</small>}
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group className="form-group-modern">
                        <Form.Label className="fw-semibold">Batch Timing</Form.Label>
                        <Form.Select
                          name="batchTime"
                          className="modern-select"
                          value={inputForm.batchTime}
                          onChange={handleChange}
                        >
                          <option value="">Select batch</option>
                          <option value="morning">Morning (9 AM - 12 PM)</option>
                          <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
                          <option value="evening">Evening (5 PM - 8 PM)</option>
                        </Form.Select>
                        {inputError.batchTimeErr && <small className="text-danger">{inputError.batchTimeErr}</small>}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="form-group-modern mb-4">
                    <Form.Label className="fw-semibold">
                      <FaMapMarkerAlt className="me-2" />
                      Address
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="address"
                      rows={3}
                      placeholder="Enter your address"
                      className="modern-textarea"
                      value={inputForm.address}
                      onChange={handleChange}
                    />
                    {inputError.addressErr && <small className="text-danger">{inputError.addressErr}</small>}
                  </Form.Group>

                  <Form.Group className="form-group-modern mb-4">
                    <Form.Label className="fw-semibold">
                      <FaCamera className="me-2" />
                      Profile Photo URL
                    </Form.Label>
                    <Form.Control
                      type="url"
                      name="imageUrl"
                      placeholder="Paste your image link"
                      className="modern-input"
                      value={inputForm.imageUrl}
                      onChange={handleChange}
                    />
                    {inputError.imageUrlErr && <small className="text-danger">{inputError.imageUrlErr}</small>}
                  </Form.Group>

                  <div className="text-center pt-3">
                    <Button type="submit" className="modern-submit-btn py-3 px-5">
                      <FaUserPlus className="me-2" />
                      Enroll Now
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <div className="text-center mt-4">
              <p className="text-black-50 small">
                💖 Your details are safe with us — let’s start your nail art journey!
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NailForm;
