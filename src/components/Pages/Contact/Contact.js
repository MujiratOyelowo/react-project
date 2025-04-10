import React, { useState } from "react";
import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import MapComponent from "../../Map/Map";
import ContactInfo from "./ContactInfo";
import { Container, Row, Col, Form, FloatingLabel, Button } from "react-bootstrap";
import { FaUser, FaEnvelope, FaClipboard, FaComment } from "react-icons/fa";
import "../../styling/custom.scss";

function Contact() {
  // Local state for form fields and validation
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);

  // Handling form submission
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    // If the form is invalid, stop propagation and set validation state to show feedback.
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      await addDoc(collection(db, "contactMessages"), {
        name,
        email,
        subject,
        message,
        createdAt: new Date(),
      });

      // Clearing the form and resetting validation
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setValidated(false);

      toast.success("Your message has been sent!", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error saving contact message: ", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <Container className="contact-page my-5">
      {/* Contact Info Section */}
      <Row className="mb-4">
        <Col>
          <ContactInfo />
        </Col>
      </Row>

      <div className="line-separator"></div>

      {/* Map & Contact Form Section */}
      <Row>
        {/* Left Column: Map */}
        <Col md={6} className="mb-4">
          <h2 className="map-location-title">Our Location</h2>
          <MapComponent />
        </Col>

        {/* Right Column: Contact Form */}
        <Col md={6}>
          <h2 className="map-location-title">Contact Us</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="icon-floating-group mb-3">
              <FaUser className="floating-icon" />
              <FloatingLabel controlId="floatingName" label="Your Name">
                <Form.Control
                  className="contact-form-input icon-field"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your name.
                </Form.Control.Feedback>
              </FloatingLabel>
            </div>

            {/* Email Field */}
            <div className="icon-floating-group mb-3">
              <FaEnvelope className="floating-icon" />
              <FloatingLabel controlId="floatingEmail" label="Your Email">
                <Form.Control
                  className="contact-form-input icon-field"
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </FloatingLabel>
            </div>

            {/* Subject Field */}
            <div className="icon-floating-group mb-3">
              <FaClipboard className="floating-icon" />
              <FloatingLabel controlId="floatingSubject" label="Subject">
                <Form.Control
                  className="contact-form-input icon-field"
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a subject.
                </Form.Control.Feedback>
              </FloatingLabel>
            </div>

            {/* Message Field */}
            <div className="icon-floating-group mb-3">
              <FaComment className="floating-icon" />
              <FloatingLabel controlId="floatingMessage" label="Message">
                <Form.Control
                  className="contact-form-input icon-field"
                  as="textarea"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ height: "120px" }}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a message.
                </Form.Control.Feedback>
              </FloatingLabel>
            </div>

            <Button className="contact-form-button" variant="primary" type="submit">
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;