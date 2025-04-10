import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "../styling/custom.scss";

function Admin() {
  const [reservations, setReservations] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);

  // Fetching reservations and messages from Firestore
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reservations"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservations(data);
      } catch (error) {
        console.error("Error fetching reservations: ", error);
      }
    };

    const fetchContactMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contactMessages"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContactMessages(data);
      } catch (error) {
        console.error("Error fetching contact messages: ", error);
      }
    };

    fetchReservations();
    fetchContactMessages();
  }, []);

  // Helper to format Firestore timestamp to a readable string.
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };

  return (
    <Container className="my-5 admin-container">
      <h1 className="admin-container-title">Admin Dashboard</h1>

      <Row className="mt-4">
        <Col md={12}>
        <div className="heading-line">
          <h2 className="admin-container-subtitle">Reservations</h2>
        </div>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th className="admin-table-header">Full Name</th>
                <th className="admin-table-header">Phone</th>
                <th className="admin-table-header">Email</th>
                <th className="admin-table-header">Number of People</th>
                <th className="admin-table-header">Date</th>
                <th className="admin-table-header">Time</th>
                <th className="admin-table-header">Special Requests</th>
                <th className="admin-table-header">Reserved At</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res.id}>
                  <td>{res.fullName}</td>
                  <td>{res.phoneNumber}</td>
                  <td>{res.email}</td>
                  <td>{res.numPeople}</td>
                  <td>{res.date}</td>
                  <td>{res.time}</td>
                  <td>{res.specialRequests}</td>
                  <td>{formatTimestamp(res.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={12}>
        <div className="heading-line">
          <h2 className="admin-container-subtitle">Contact Messages</h2>
        </div>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th className="admin-table-header">Name</th>
                <th className="admin-table-header">Email</th>
                <th className="admin-table-header">Subject</th>
                <th className="admin-table-header">Message</th>
                <th className="admin-table-header">Sent At</th>
              </tr>
            </thead>
            <tbody>
              {contactMessages.map((msg) => (
                <tr key={msg.id}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.subject}</td>
                  <td>{msg.message}</td>
                  <td>{formatTimestamp(msg.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Admin;