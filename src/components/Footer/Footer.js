import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "../styling/custom.scss";

function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Adding email to newsletter collection
      await addDoc(collection(db, "newsletter"), {
        email,
        subscribedAt: new Date(),
      });

      // Clearing form and show success message
      setEmail("");
      toast.success("Thank you for subscribing to our newsletter!");
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="footer-container">
      <Container>
        {/* Top Row: 3 Columns */}
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 p-3 footer-card">
              <Card.Title className="footer-card-title">Contact Us</Card.Title>
              <Card.Text className="footer-card-text">
                <Link to="/contact" className="footer-link">
                  Click here
                </Link>{" "}
                for more info.
                <br />
                You can also follow us in our 
                social media pages below
                <br />
                {/* Social Media Icons */}
                <div className="social-icons" style={{ marginTop: "1rem" }}>
                  <FaFacebook className="icon" />
                  <FaInstagram className="icon" />
                  <FaYoutube className="icon" />
                  <FaTwitter className="icon" />
                </div>
              </Card.Text>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="h-100 p-3 footer-card">
              <Card.Title className="footer-card-title">Opening Hours</Card.Title>
              <Card.Text className="footer-card-text">
                Monday - Saturday<br />
                10 AM - 10 PM<br />
                <br />
                Sunday<br />
                11 AM - 8 PM
              </Card.Text>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="h-100 p-3 footer-card">
              <Card.Title className="footer-card-title">Newsletter</Card.Title>
              <Card.Text className="footer-card-text">
                Get our offers first, subscribe now!
              </Card.Text>
              <Form onSubmit={handleSubscribe}>
                <Form.Group controlId="newsletterEmail" className="d-flex">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    className="form-stroke"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <Button
                    variant="success"
                    type="submit"
                    className="footer-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </Button>
                </Form.Group>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Bottom Green Section */}
      <div className="footer-bottom">
        <Container>
          <Row>
            <Col className="text-center">
              <p className="mb-0">© 2025 Peaks & Spice</p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;