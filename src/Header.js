import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const totalItems = useSelector((state) => state.cart.totalItems);

  return (
    <header className="site-header">
      <h1>Paradise Nursery</h1>

      <nav className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        <Link to="/products" className={location.pathname === "/products" ? "active" : ""}>Shop</Link>
        <Link to="/cart" className="cart-link">
          🛒 <span className="cart-count">{totalItems}</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
