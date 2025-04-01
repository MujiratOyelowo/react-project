import React, { useState } from "react";
import { db } from "../../firebase"; 
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify"; //to display success or error message
import { Container, Form, Button, FloatingLabel } from "react-bootstrap";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaUsers,
  FaComment,
} from "react-icons/fa";
import "../styling/custom.scss";

function Reservation() {
  // Local state for each form field and validation
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [numPeople, setNumPeople] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [validated, setValidated] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    // If the form is invalid, stop propagation and display feedback
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    try {
      // Saving the data to Firestore
      await addDoc(collection(db, "reservations"), {
        fullName,
        phoneNumber,
        email,
        numPeople,
        date,
        time,
        specialRequests,
        createdAt: new Date(),
      });

      // Clearing the form
      setFullName("");
      setPhoneNumber("");
      setEmail("");
      setNumPeople("");
      setDate("");
      setTime("");
      setSpecialRequests("");
      setValidated(false);

      // Triggering a success toast
      toast.success("Your reservation has been submitted successfully!", {
        position: "top-center",
      });
    } catch (error) { //if an error occured
      console.error("Error saving reservation: ", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <Container
      className="text-center reservation-container"
      style={{ padding: "2rem", maxWidth: "500px" }}
    >
      <h2 className="reservation-heading">Reserve a Table</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="icon-floating-group mb-3">
          <FaUser className="floating-icon" />
          <FloatingLabel controlId="floatingFullName" label="Full Name">
            <Form.Control
              className="reservation-input icon-field"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide your full name.
            </Form.Control.Feedback>
          </FloatingLabel>
        </div>

        {/* Phone Number */}
        <div className="icon-floating-group mb-3">
          <FaPhone className="floating-icon" />
          <FloatingLabel controlId="floatingPhone" label="Phone Number">
            <Form.Control
              className="reservation-input icon-field"
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid phone number.
            </Form.Control.Feedback>
          </FloatingLabel>
        </div>

        {/* Email */}
        <div className="icon-floating-group mb-3">
          <FaEnvelope className="floating-icon" />
          <FloatingLabel controlId="floatingEmail" label="Email">
            <Form.Control
              className="reservation-input icon-field"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </FloatingLabel>
        </div>

        {/* Number of People */}
        <div className="icon-floating-group mb-3">
          <FaUsers className="floating-icon" />
          <FloatingLabel controlId="floatingPeople" label="Number of People">
            <Form.Control
              className="reservation-input icon-field"
              type="number"
              placeholder="Number of People"
              value={numPeople}
              onChange={(e) => setNumPeople(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please specify the number of people.
            </Form.Control.Feedback>
          </FloatingLabel>
        </div>

        {/* Date */}
        <div className="icon-floating-group mb-3">
          <FloatingLabel controlId="floatingDate" label="Date">
            <Form.Control
              className="reservation-input"
              type="date"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please select a date.
            </Form.Control.Feedback>
          </FloatingLabel>
        </div>

        {/* Time */}
        <div className="icon-floating-group mb-3">
          <FloatingLabel controlId="floatingTime" label="Time">
            <Form.Control
              className="reservation-input"
              type="time"
              placeholder="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please select a time.
            </Form.Control.Feedback>
          </FloatingLabel>
        </div>

        {/* Special Requests */}
        <div className="icon-floating-group mb-3">
          <FaComment className="floating-icon" />
          <FloatingLabel controlId="floatingRequests" label="Special Requests">
            <Form.Control
              className="reservation-input icon-field"
              as="textarea"
              placeholder="Special Requests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide any special requests (if applicable).
            </Form.Control.Feedback>
          </FloatingLabel>
        </div>

        <Button
          className="reservation-button"
          type="submit"
          style={{ backgroundColor: "#228B22", color: "#fff", padding: "0.5rem" }}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Reservation;