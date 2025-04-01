import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styling/custom.scss";

function Navigation() {
  return (
    <div className="navbar-container">
      {/* LEFT (Red) */}
      <div className="custom-navbar-brand">
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          <h2 className="custom-navbar-brand-text" style={{ margin: 0 }}>Peaks & Spices</h2>
        </Link>
      </div>

      {/* RIGHT (Green) */}
      <div className="custom-navbar-links">
        <Nav className="custom-nav-link">
          <Nav.Link as={Link} to="/menu" style={{ color: "#fff" }}>
            Menu
          </Nav.Link>
          <Nav.Link as={Link} to="/reservation" style={{ color: "#fff" }}>
            Reservation
          </Nav.Link>
          <Nav.Link as={Link} to="/contact" style={{ color: "#fff" }}>
            Contact Us
          </Nav.Link>
          <Nav.Link as={Link} to="/about" style={{ color: "#fff" }}>
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/admin" style={{ color: "#fff" }}>
            Admin
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
}

export default Navigation;