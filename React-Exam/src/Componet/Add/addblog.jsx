import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { addNewBlogAsync } from "../../service/ation/action";

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCreated } = useSelector((state) => state.blogReducer);

  const [input, setInput] = useState({
    title: "",
    desc: "",
    img: "",
    category: "",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const err = {};
    if (!input.title.trim()) err.title = "Title required";
    if (!input.desc.trim()) err.desc = "Description required";
    if (!input.img.trim()) err.img = "Image URL required";
    if (!input.category.trim()) err.category = "Category required";
    setError(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(addNewBlogAsync({
      ...input,
      id: String(Math.floor(Math.random() * 10000)),
    }));
  };

  if (isCreated) navigate("/");

  return (
    <Container className="py-5 add-blog-wrapper">
      <h1 className="text-center mb-4 fw-bold">Add New Blog</h1>
      <Row className="g-4">
        {/* Form Section */}
        <Col lg={6}>
          <Card className="p-4 shadow-sm rounded-4 dark-card">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Blog Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                  isInvalid={!!error.title}
                />
                <Form.Control.Feedback type="invalid">
                  {error.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={input.category}
                  onChange={handleChange}
                  isInvalid={!!error.category}
                >
                  <option value="">Select category</option>
                  {["Tech", "Lifestyle", "Sports", "Travel", "Fashion", "News"].map(
                    (c, i) => <option key={i} value={c}>{c}</option>
                  )}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {error.category}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="desc"
                  value={input.desc}
                  onChange={handleChange}
                  placeholder="Write full blog content..."
                  isInvalid={!!error.desc}
                />
                <Form.Control.Feedback type="invalid">
                  {error.desc}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="img"
                  value={input.img}
                  onChange={handleChange}
                  placeholder="Paste image link"
                  isInvalid={!!error.img}
                />
                <Form.Control.Feedback type="invalid">
                  {error.img}
                </Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" className="w-100 submit-btn mt-3">
                Publish Blog
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Live Preview Section */}
        <Col lg={6}>
          <Card className="p-3 shadow-sm rounded-4 dark-card preview-card text-center">
            {input.img ? (
              <img src={input.img} alt="Preview" className="img-fluid rounded-4 mb-3" />
            ) : (
              <div className="no-img-preview">🖼 Live preview here</div>
            )}
            <h4 className="fw-bold">{input.title || "Blog Title"}</h4>
            <span className="badge bg-primary mb-2">{input.category || "Category"}</span>
            <p>{input.desc || "Blog description preview..."}</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddBlog;
