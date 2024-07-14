import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();
  React.useEffect(() => {
    // console.log(location.pathname)
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-secondary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {/* <form className="d-flex" role="search"> */}
            { localStorage.getItem('token')==undefined ?
            <div>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">
              Sign up
            </Link>
            <Link className="btn btn-primary mx-2" to="/login" role="button">
              Login
            </Link>
            </div>
            :
            <button className="btn btn-primary mx-2" onClick={handleLogout} role="button">
              Logout
            </button>
}
            {/* </form> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
