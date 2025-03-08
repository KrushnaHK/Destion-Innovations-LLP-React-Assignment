import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Header = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/djifdyfkd/image/upload/v1741331627/E-Commerce-Portal-Development_ggzj1q.png"
              alt="website logo"
            />
          </Link>

          <button type="button" className="nav-mobile-btn" onClick={onClickLogout}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="nav logout"
              className="nav-bar-img"
            />
          </button>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/djifdyfkd/image/upload/v1741331627/E-Commerce-Portal-Development_ggzj1q.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/invoices" className="nav-link">
                Invoices
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>
          </ul>
          <button type="button" className="logout-desktop-btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>

          <li className="nav-menu-item">
            <Link to="/invoices" className="nav-link">
              Invoices
            </Link>
          </li>

          <li className="nav-menu-item">
            <Link to="/product" className="nav-link">
              Products
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;