import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styling/custom.scss";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar-container">
      {/* LEFT (Red) */}
      <div className="custom-navbar-brand">
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          <h2 className="custom-navbar-brand-text" style={{ margin: 0 }}>Peaks & Spices</h2>
        </Link>
      </div>

      {/* Hamburger Menu Button */}
      <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle menu">
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
      </button>

      {/* RIGHT (Green) */}
      <div className={`custom-navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <div className="custom-nav-link">
          <Link to="/menu">Menu</Link>
          <Link to="/reservation">Reservation</Link>
          <Link to="/events">Events</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/about">About</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;