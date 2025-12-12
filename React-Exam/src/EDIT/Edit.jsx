import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getSingleBlogAsync, updateBlogAsync } from "../service/ation/action";
import "./Edit.css";

const EditBlog = () => {
  const { id } = useParams();
  const { blog, isUpdated } = useSelector((state) => state.blogReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = { id: "", title: "", desc: "", img: "", category: "" };
  const [inputForm, setInputForm] = useState(initialState);
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getSingleBlogAsync(id));
  }, [id]);

  useEffect(() => {
    if (blog) setInputForm({ ...initialState, ...blog });
  }, [blog]);

  useEffect(() => {
    if (isUpdated) navigate("/");
  }, [isUpdated]);

  const handleChange = (e) =>
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    let formError = {};
    if (!inputForm.title) formError.title = "Title Required";
    if (!inputForm.desc) formError.desc = "Description Required";
    if (!inputForm.img) formError.img = "Image URL Required";
    if (!inputForm.category) formError.category = "Category Required";
    setError(formError);
    if (Object.keys(formError).length > 0) return;

    dispatch(updateBlogAsync(inputForm));
  };

  return (
    <Container className="py-5 edit-wrapper">
      <h1 className="text-center mb-4 fw-bold">Edit Blog</h1>
      <Row className="g-4">
        {/* Form Section */}
        <Col lg={6}>
          <Card className="p-4 shadow-sm rounded-4 dark-card">
            <Form onSubmit={handleSubmit}>
              {/* Title */}
              <Form.Group className="mb-3">
                <Form.Label>Blog Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={inputForm.title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                  isInvalid={!!error.title}
                />
                <Form.Control.Feedback type="invalid">
                  {error.title}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Category */}
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={inputForm.category}
                  onChange={handleChange}
                  isInvalid={!!error.category}
                >
                  <option value="">Select category</option>
                  {["Tech", "Fashion", "Sports", "News", "Travel", "Lifestyle"].map(
                    (c, i) => <option key={i} value={c}>{c}</option>
                  )}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {error.category}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Description */}
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="desc"
                  value={inputForm.desc}
                  onChange={handleChange}
                  placeholder="Update your blog description"
                  isInvalid={!!error.desc}
                />
                <Form.Control.Feedback type="invalid">
                  {error.desc}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Image URL */}
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="img"
                  value={inputForm.img}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  isInvalid={!!error.img}
                />
                <Form.Control.Feedback type="invalid">
                  {error.img}
                </Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" className="w-100 submit-btn mt-3">
                Update Blog
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Live Preview Section */}
        <Col lg={6}>
          <Card className="p-3 shadow-sm rounded-4 dark-card preview-card text-center">
            {inputForm.img ? (
              <img src={inputForm.img} alt="preview" className="img-fluid rounded-4 mb-3" />
            ) : (
              <div className="no-img-preview">🖼 Image preview here</div>
            )}
            <h4 className="fw-bold">{inputForm.title || "Blog Title"}</h4>
            <span className="badge bg-primary mb-2">{inputForm.category || "Category"}</span>
            <p>{inputForm.desc || "Blog description preview..."}</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditBlog;
