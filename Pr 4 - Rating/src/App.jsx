import { useState, useEffect } from "react";

function App() {
  const [input, setInput] = useState({});
  const [list, setList] = useState([]);
  const [errors, setErrors] = useState({});

  // 🔹 Load reviews from localStorage on first render
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setList(savedReviews);
  }, []);

  // 🔹 Save reviews to localStorage whenever list changes
  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(list));
  }, [list]);

  const getInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!input.name) newErrors.name = "* Name is required";
    if (!input.profile) newErrors.profile = "* Profile picture URL is required";
    if (!input.email) newErrors.email = "* Email is required";
    else if (!/\S+@\S+\.\S+/.test(input.email))
      newErrors.email = "* Enter a valid email";
    if (!input.rating) newErrors.rating = "* Rating is required";
    else if (input.rating < 1 || input.rating > 5)
      newErrors.rating = "* Rating must be 1–5";
    if (!input.description)
      newErrors.description = "* Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const setData = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let profileURL = input.profile?.trim();
    if (profileURL && !/^https?:\/\//i.test(profileURL)) {
      profileURL = "https://" + profileURL;
    }

    const updatedInput = { ...input, profile: profileURL };
    const updatedList = [updatedInput, ...list];

    setList(updatedList);
    setInput({});
    setErrors({});
  };

  return (
    <div style={styles.page}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>✨ Share Your Experience ✨</h2>
        <form onSubmit={setData}>
          <InputField
            type="text"
            name="name"
            placeholder="Full Name"
            value={input.name || ""}
            onChange={getInput}
            error={errors.name}
          />
          <InputField
            type="text"
            name="profile"
            placeholder="Profile Image URL"
            value={input.profile || ""}
            onChange={getInput}
            error={errors.profile}
          />
          <InputField
            type="email"
            name="email"
            placeholder="Email Address"
            value={input.email || ""}
            onChange={getInput}
            error={errors.email}
          />
          <InputField
            type="number"
            name="rating"
            placeholder="Rating (1–5)"
            value={input.rating || ""}
            onChange={getInput}
            error={errors.rating}
          />
          <TextAreaField
            name="description"
            placeholder="Write your review here..."
            value={input.description || ""}
            onChange={getInput}
            error={errors.description}
          />
          <button type="submit" style={styles.submitButton}>
            Submit Review
          </button>
        </form>
      </div>

      <h2 style={styles.reviewHeading}>🌟 Customer Reviews 🌟</h2>
      <div style={styles.cardGrid}>
        {list.length === 0 ? (
          <p style={styles.noReview}>No reviews yet — be the first!</p>
        ) : (
          list.map((review, index) => (
            <div key={index} style={styles.card}>
              <img
                src={
                  review.profile &&
                  /\.(jpg|jpeg|png|webp|gif)$/i.test(review.profile)
                    ? review.profile
                    : "https://via.placeholder.com/120"
                }
                alt="profile"
                style={styles.profileImage}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/120")
                }
              />
              <h3 style={styles.name}>{review.name}</h3>
              <p style={styles.email}>{review.email}</p>
              <div style={styles.ratingStars}>
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    style={{
                      color: i < review.rating ? "#FFD700" : "#d1d5db",
                      fontSize: "20px",
                    }}
                  >
                    {i < review.rating ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <p style={styles.description}>{review.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function InputField({ type, name, placeholder, value, onChange, error }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          ...styles.input,
          borderColor: error ? "#e63946" : "#ccc",
        }}
      />
      {error && <div style={styles.errorText}>{error}</div>}
    </div>
  );
}

function TextAreaField({ name, placeholder, value, onChange, error }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={4}
        style={{
          ...styles.input,
          resize: "vertical",
          height: "110px",
          borderColor: error ? "#e63946" : "#ccc",
        }}
      />
      {error && <div style={styles.errorText}>{error}</div>}
    </div>
  );
}

const styles = {
  page: {
    background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
    minHeight: "100vh",
    padding: "50px 20px",
    fontFamily: "'Poppins', sans-serif",
  },
  formContainer: {
    maxWidth: "650px",
    margin: "0 auto",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "30px",
    fontWeight: "600",
    color: "#0d47a1",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "10px",
    fontSize: "15px",
    border: "1.5px solid #d1d5db",
    outline: "none",
    backgroundColor: "#f9fafb",
    transition: "0.3s",
  },
  submitButton: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #1976d2, #0d47a1)",
    color: "#fff",
    borderRadius: "10px",
    border: "none",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },
  errorText: {
    color: "#e63946",
    fontSize: "13px",
    marginTop: "6px",
  },
  reviewHeading: {
    textAlign: "center",
    margin: "50px 0 25px",
    fontSize: "28px",
    fontWeight: "600",
    color: "#0d47a1",
  },
  noReview: {
    textAlign: "center",
    color: "#555",
    fontSize: "16px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "28px",
    padding: "0 20px 50px",
  },
  card: {
    padding: "26px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  profileImage: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "12px",
    border: "3px solid #90caf9",
  },
  ratingStars: {
    margin: "10px 0",
  },
  email: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "8px",
  },
  description: {
    fontSize: "15px",
    color: "#374151",
    fontStyle: "italic",
    marginTop: "12px",
    lineHeight: "1.5",
  },
  name: {
    fontSize: "18px",
    color: "#0d47a1",
    fontWeight: "600",
  },
};

export default App;
