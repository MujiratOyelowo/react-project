import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styling/custom.scss";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar-container">
      {/* LEFT (Red) */}
      <div className="custom-navbar-brand">
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          <h2 className="custom-navbar-brand-text" style={{ margin: 0 }}>Peaks & Spices</h2>
        </Link>
      </div>

      {/* Hamburger Menu Button */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
      </div>

      {/* RIGHT (Green) */}
      <div className={`custom-navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <div className="custom-nav-link">
          <Link to="/menu" className="nav-item">Menu</Link>
          <Link to="/reservation" className="nav-item">Reservation</Link>
          <Link to="/contact" className="nav-item">Contact Us</Link>
          <Link to="/about" className="nav-item">About</Link>
          <Link to="/admin" className="nav-item">Admin</Link>
        </div>
      </div>
    </div>
  );
}

export default Navigation;