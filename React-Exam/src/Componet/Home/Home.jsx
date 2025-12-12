import { useEffect, useState } from "react";
import { Container, Row, Card, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogsAsync, deleteBlogAsync } from "../../service/ation/action";
import { useNavigate } from "react-router";
import "./Home.css";

const HOME = () => {
  const { blogs } = useSelector((state) => state.blogReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(getAllBlogsAsync());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBlogAsync(id));
  };

  const handleEdit = (id) => {
    navigate(`/editblog/${id}`);
  };

  const filteredBlogs = blogs?.filter((blog) => {
    const matchSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.desc.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category ? blog.category === category : true;

    return matchSearch && matchCategory;
  });

  const categories = [...new Set(blogs?.map((b) => b.category))];

  return (
    <Container className="home-wrapper py-5">
      <h1 className="main-title">Explore Blogs</h1>

      {/* FILTER BAR */}
      <div className="filter-box">
        <Form.Control
          type="text"
          className="search-field"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Form.Select
          className="category-field"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </Form.Select>
      </div>

      {/* BLOG GRID */}
      <Row className="gy-4 mt-3">
        {filteredBlogs?.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div className="col-lg-4 col-md-6" key={blog.id}>
              <Card className="pro-card">
                <div className="pro-img">
                  <Card.Img src={blog.img} alt="" />
                </div>

                <Card.Body>
                  <span className="pro-category">{blog.category}</span>

                  <h4 className="pro-title">{blog.title}</h4>

                  <p className="pro-desc">
                    {blog.desc.length > 100
                      ? blog.desc.slice(0, 100) + "..."
                      : blog.desc}
                  </p>

                  <div className="d-flex gap-2">
                    <Button className="btn-edit" onClick={() => handleEdit(blog.id)}>
                      Edit
                    </Button>
                    <Button className="btn-delete" onClick={() => handleDelete(blog.id)}>
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <h4 className="text-center text-muted mt-5">No Blogs Found</h4>
        )}
      </Row>
    </Container>
  );
};

export default HOME;
