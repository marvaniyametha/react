import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutAsync } from "../../service/ation/athencation";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);

  const handleLogout = () => {
    dispatch(signOutAsync());
  };

  return (
    <header className="pro-header">
      <Container fluid className="d-flex align-items-center justify-content-between">

        {/* Logo */}
        <Link to="/" className="pro-logo">
          BLOG<span className="dot">.</span>
        </Link>

        {/* Navigation */}
        <nav className="pro-nav d-flex align-items-center gap-4">

          {user ? (
            <>
              <Link to="/AddBLOG" className="pro-btn add-blog-btn">
                + Add Blog
              </Link>

              <div className="pro-user d-flex flex-column text-end">
                <span className="pro-user-email">{user.email}</span>
                <button className="pro-btn logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/signIn" className="pro-btn signin-btn">
              Sign In
            </Link>
          )}

        </nav>
      </Container>
    </header>
  );
};

export default Header;
