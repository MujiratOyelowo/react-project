// Events.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, Modal, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styling/custom.scss";
import { FaUser, FaEnvelope, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaDollarSign, FaUsers } from "react-icons/fa";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: ''
  });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    // Fetching the events data from the JSON file in the public folder
    axios.get("/EventsData.json")
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setFormData({ ...formData, eventType: event.title });
    setShowModal(true);
  };

  const handleLearnMoreClick = (event) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setFormData({
      name: '',
      email: '',
      eventType: ''
    });
    setValidated(false);
  };

  const handleDetailsModalClose = () => {
    setShowDetailsModal(false);
    setSelectedEvent(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    // Form validation
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setSubmitting(true);

    try {
      // Preparing registration data
      const registrationData = {
        ...formData,
        eventId: selectedEvent.id,
        eventDate: selectedEvent.date,
        eventTime: selectedEvent.time,
        price: selectedEvent.price,
        registrationDate: serverTimestamp(),
        status: 'pending'
      };

      // Adding events registration to Firebase
      await addDoc(collection(db, "eventRegistrations"), registrationData);

      // Showing success message
      toast.success("Registration successful! We will contact you shortly.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      handleModalClose();
    } catch (error) {
      console.error("Error submitting registration:", error);
      toast.error("Registration failed. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setSubmitting(false);
      setValidated(false);
    }
  };

  // Function to format the date for display
  const formatDate = (dateString) => {
    if (dateString.includes("Every")) {
      return dateString;
    }
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Container className="my-5 events-page">
      <ToastContainer />
      <div className="heading-line">
        <h1 className="menu-header">Upcoming Events</h1>
      </div>
      
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading events...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center my-5">{error}</div>
      ) : (
        <Row className="mt-4">
          {events.map((event) => (
            <Col key={event.id} lg={4} md={6} sm={12} className="mb-4">
              <Card className="event-card h-100">
                <div className="event-image-container">
                  <Card.Img
                    variant="top"
                    src={event.imageUrl}
                    alt={event.title}
                    className="event-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/placeholder-event.jpg";
                    }}
                  />
                  {event.registrationRequired && (
                    <Badge bg="danger" className="registration-badge">Registration Required</Badge>
                  )}
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="event-title">{event.title}</Card.Title>
                  <Card.Text className="event-description">{event.description}</Card.Text>
                  <div className="mt-auto text-center">
                    <Button 
                      variant="primary" 
                      className="event-button me-2"
                      onClick={() => handleLearnMoreClick(event)}
                    >
                      Learn More
                    </Button>
                    {event.registrationRequired && (
                      <Button 
                        variant="primary" 
                        className="event-button"
                        disabled={event.capacity <= 0}
                        onClick={() => handleRegisterClick(event)}
                      >
                        Register Now
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Registration Modal */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>Register for {selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="icon-floating-group mb-3">
              <FaUser className="floating-icon" />
              <FloatingLabel controlId="floatingName" label="Full Name">
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="registration-input icon-field"
                  disabled={submitting}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your full name.
                </Form.Control.Feedback>
              </FloatingLabel>
            </div>

            <div className="icon-floating-group mb-3">
              <FaEnvelope className="floating-icon" />
              <FloatingLabel controlId="floatingEmail" label="Email Address">
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                  className="registration-input icon-field"
                  disabled={submitting}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email address.
                </Form.Control.Feedback>
              </FloatingLabel>
            </div>

            <FloatingLabel controlId="floatingEventType" label="Event">
              <Form.Control
                as="select"
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                required
                className="registration-input"
                disabled={submitting}
              >
                <option value="">Select Event</option>
                {events
                  .filter(event => event.registrationRequired)
                  .map(event => (
                    <option key={event.id} value={event.title}>
                      {event.title} - {event.date}
                    </option>
                  ))
                }
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select an event.
              </Form.Control.Feedback>
            </FloatingLabel>

            <div className="text-center mt-4">
              <Button 
                variant="secondary" 
                onClick={handleModalClose} 
                className="me-2"
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit" 
                className="event-button"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Registration'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Details Modal */}
      <Modal show={showDetailsModal} onHide={handleDetailsModalClose} centered size="lg">
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="details-modal-body">
          {selectedEvent && (
            <>
              <div className="event-image-container mb-4">
                <img
                  src={selectedEvent.imageUrl}
                  alt={selectedEvent.title}
                  className="w-100 event-detail-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/placeholder-event.jpg";
                  }}
                />
              </div>
              
              <div className="event-info-grid">
                <div className="info-item">
                  <FaCalendarAlt className="info-icon" />
                  <div>
                    <h5>Date</h5>
                    <p>{formatDate(selectedEvent.date)}</p>
                  </div>
                </div>

                <div className="info-item">
                  <FaClock className="info-icon" />
                  <div>
                    <h5>Time</h5>
                    <p>{selectedEvent.time}</p>
                  </div>
                </div>

                <div className="info-item">
                  <FaMapMarkerAlt className="info-icon" />
                  <div>
                    <h5>Location</h5>
                    <p>{selectedEvent.location}</p>
                  </div>
                </div>

                <div className="info-item">
                  <FaDollarSign className="info-icon" />
                  <div>
                    <h5>Price</h5>
                    <p>{selectedEvent.price}</p>
                  </div>
                </div>

                {selectedEvent.capacity && (
                  <div className="info-item">
                    <FaUsers className="info-icon" />
                    <div>
                      <h5>Capacity</h5>
                      <p>{selectedEvent.capacity} people</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="event-description-section mt-4">
                <h4>About the Event</h4>
                <p>{selectedEvent.description}</p>
              </div>

              <div className="additional-info mt-4">
                <h4>What to Expect</h4>
                <ul>
                  {selectedEvent.whatToExpect.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedEvent?.registrationRequired && (
            <Button 
              variant="primary" 
              className="event-button me-2"
              disabled={selectedEvent.capacity <= 0}
              onClick={() => {
                handleDetailsModalClose();
                handleRegisterClick(selectedEvent);
              }}
            >
              Register Now
            </Button>
          )}
          <Button 
            variant="secondary" 
            onClick={handleDetailsModalClose}
            className="modal-close-button"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Events;