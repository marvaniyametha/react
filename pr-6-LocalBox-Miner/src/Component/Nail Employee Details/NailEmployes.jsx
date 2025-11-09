import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form, Image, Row, Col } from "react-bootstrap";
import { FaTrashAlt, FaEdit, FaEye } from "react-icons/fa";
import "./NailEmployes.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("studentDetails")) || [];
    setStudents(storedData);
  }, []);

  const handleDelete = (id) => {
    const updated = students.filter((std) => std.id !== id);
    setStudents(updated);
    localStorage.setItem("studentDetails", JSON.stringify(updated));
  };

  const handleView = (std) => {
    setSelectedStudent(std);
    setShowView(true);
  };

  const handleEdit = (std) => {
    setSelectedStudent(std);
    setEditForm(std);
    setShowEdit(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleSaveEdit = () => {
    const updated = students.map((std) =>
      std.id === editForm.id ? editForm : std
    );
    setStudents(updated);
    localStorage.setItem("studentDetails", JSON.stringify(updated));
    setShowEdit(false);
  };

  return (
    <div className="employee-bg">
      <Container className="py-5">
        <h2 className="text-center mb-5 fw-bold text-white">
          Nail Art Course Students
        </h2>

        {students.length === 0 ? (
          <p className="text-center text-light">
            No student records found. Please add some students.
          </p>
        ) : (
          <div className="glass-table-wrapper p-4 rounded-4 shadow-lg">
            <div className="table-responsive">
              <Table hover bordered className="align-middle text-center modern-table">
                <thead className="table-gradient text-white">
                  <tr>
                    <th>ID</th>
                    <th>Photo</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Course</th>
                    <th>Level</th>
                    <th>Duration</th>
                    <th>Joining Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((std) => (
                    <tr key={std.id}>
                      <td>{std.id}</td>
                      <td>
                        <img
                          src={std.imageUrl || "https://via.placeholder.com/80"}
                          alt={std.fullName}
                          className="emp-img"
                        />
                      </td>
                      <td>{std.fullName}</td>
                      <td>{std.email}</td>
                      <td>{std.phone}</td>
                      <td className="text-capitalize">{std.course}</td>
                      <td className="text-capitalize">{std.level}</td>
                      <td>{std.duration} months</td>
                      <td>{std.joiningDate}</td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          className="me-2"
                          onClick={() => handleView(std)}
                        >
                          <FaEye />
                        </Button>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(std)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(std.id)}
                        >
                          <FaTrashAlt />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}

        {/* View Modal */}
        <Modal
          show={showView}
          onHide={() => setShowView(false)}
          centered
          className="modern-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Student Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedStudent && (
              <div className="text-center">
                <Image
                  src={selectedStudent.imageUrl || "https://via.placeholder.com/120"}
                  roundedCircle
                  className="mb-3 shadow-sm"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
                <h5 className="fw-bold">{selectedStudent.fullName}</h5>
                <p className="text-muted">{selectedStudent.email}</p>
                <p>{selectedStudent.phone}</p>
                <hr />
                <p>
                  <strong>Course:</strong> {selectedStudent.course}
                </p>
                <p>
                  <strong>Level:</strong> {selectedStudent.level}
                </p>
                <p>
                  <strong>Duration:</strong> {selectedStudent.duration} months
                </p>
                <p>
                  <strong>Joining Date:</strong> {selectedStudent.joiningDate}
                </p>
                <p>
                  <strong>Address:</strong> {selectedStudent.address}
                </p>
              </div>
            )}
          </Modal.Body>
        </Modal>

        {/* Edit Modal */}
        <Modal
          show={showEdit}
          onHide={() => setShowEdit(false)}
          centered
          className="modern-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editForm && (
              <Form>
                <div className="text-center mb-3">
                  <Image
                    src={editForm.imageUrl || "https://via.placeholder.com/120"}
                    roundedCircle
                    className="shadow-sm"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>Profile Image URL</Form.Label>
                  <Form.Control
                    name="imageUrl"
                    value={editForm.imageUrl}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        name="fullName"
                        value={editForm.fullName}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        name="email"
                        value={editForm.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        name="phone"
                        value={editForm.phone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Duration (Months)</Form.Label>
                      <Form.Control
                        name="duration"
                        value={editForm.duration}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Course</Form.Label>
                      <Form.Select
                        name="course"
                        value={editForm.course}
                        onChange={handleChange}
                      >
                        <option value="">Choose Course</option>
                        <option value="basic-nail-art">Basic Nail Art</option>
                        <option value="advanced-nail-art">Advanced Nail Art</option>
                        <option value="gel-extension">Gel Extension</option>
                        <option value="acrylic-extension">Acrylic Extension</option>
                        <option value="3d-nail-art">3D Nail Art</option>
                        <option value="nail-care">Nail Care & Hygiene</option>
                        <option value="salon-management">Salon Management</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Level</Form.Label>
                      <Form.Select
                        name="level"
                        value={editForm.level}
                        onChange={handleChange}
                      >
                        <option value="">Select Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Joining Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="joiningDate"
                    value={editForm.joiningDate}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="address"
                    value={editForm.address}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button variant="success" className="px-4" onClick={handleSaveEdit}>
                    Save Changes
                  </Button>
                </div>
              </Form>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default Students;
