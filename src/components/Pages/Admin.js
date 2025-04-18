import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Badge, Button, Form, Dropdown, Modal } from "react-bootstrap";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { FaTrash, FaCheck, FaTimes, FaDownload, FaEnvelope, FaExclamationTriangle } from "react-icons/fa";
import "../styling/custom.scss";

function Admin() {
  const [reservations, setReservations] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [eventRegistrations, setEventRegistrations] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(""); // 'reservation' or 'newsletter'
  const [cancellationMessage, setCancellationMessage] = useState("");

  // Fetching data from Firebase
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchReservations(),
      fetchEventRegistrations(),
      fetchContactMessages(),
      fetchNewsletterSubscriptions(),
    ]);
    setLoading(false);
  };

  // Fetching data functions
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
      toast.error("Failed to fetch reservations");
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
      toast.error("Failed to fetch contact messages");
    }
  };

  const fetchEventRegistrations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "eventRegistrations"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEventRegistrations(data);
    } catch (error) {
      console.error("Error fetching event registrations: ", error);
      toast.error("Failed to fetch event registrations");
    }
  };

  const fetchNewsletterSubscriptions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "newsletter"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewsletters(data);
    } catch (error) {
      console.error("Error fetching newsletter subscriptions: ", error);
      toast.error("Failed to fetch newsletter subscriptions");
    }
  };

  // Helper Functions
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };

  // Action Handlers
  const handleDeleteReservation = (id, reservationDetails) => {
    setItemToDelete({ id, details: reservationDetails });
    setDeleteType("reservation");
    setShowDeleteModal(true);
  };

  const handleUpdateEventRegistration = async (id, status) => {
    try {
      await updateDoc(doc(db, "eventRegistrations", id), { status });
      toast.success(`Registration ${status} successfully`);
      fetchEventRegistrations();
    } catch (error) {
      console.error("Error updating registration:", error);
      toast.error("Failed to update registration");
    }
  };

  const handleMarkMessageStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "contactMessages", id), { status });
      toast.success("Message status updated");
      fetchContactMessages();
    } catch (error) {
      console.error("Error updating message status:", error);
      toast.error("Failed to update message status");
    }
  };

  const handleUnsubscribe = (id) => {
    setItemToDelete({ id });
    setDeleteType("newsletter");
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (deleteType === "reservation") {
        if (!cancellationMessage.trim()) {
          toast.error("Please provide a cancellation message");
          return;
        }
        await deleteDoc(doc(db, "reservations", itemToDelete.id));
        toast.success("Reservation cancelled successfully");
        fetchReservations();
      } else {
        await deleteDoc(doc(db, "newsletter", itemToDelete.id));
        toast.success("Subscriber removed successfully");
        fetchNewsletterSubscriptions();
      }
      closeDeleteModal();
    } catch (error) {
      console.error("Error during deletion:", error);
      toast.error(
        `Failed to ${
          deleteType === "reservation"
            ? "cancel reservation"
            : "remove subscriber"
        }`
      );
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
    setDeleteType("");
    setCancellationMessage("");
  };

  return (
    <Container className="my-5 admin-container">
      <h1 className="admin-container-title">Admin Dashboard</h1>

      {/* Table Reservations Section */}
      <Row className="mt-4">
        <Col md={12}>
          <div className="section-title">
            <div className="line"></div>
            <h2 className="admin-container-subtitle">Reservations</h2>
            <div className="line"></div>
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
                <th className="admin-table-header">Actions</th>
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
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteReservation(res.id, res)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Event Registrations Section */}
      <Row className="mt-5">
        <Col md={12}>
          <div className="section-title">
            <div className="line"></div>
            <h2 className="admin-container-subtitle">Event Registrations</h2>
            <div className="line"></div>
          </div>
          <Table bordered responsive>
            <thead>
              <tr>
                <th className="admin-table-header">Name</th>
                <th className="admin-table-header">Email</th>
                <th className="admin-table-header">Event</th>
                <th className="admin-table-header">Event Date</th>
                <th className="admin-table-header">Event Time</th>
                <th className="admin-table-header">Price</th>
                <th className="admin-table-header">Status</th>
                <th className="admin-table-header">Registration Date</th>
                <th className="admin-table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {eventRegistrations.map((reg) => (
                <tr key={reg.id}>
                  <td>{reg.name}</td>
                  <td>{reg.email}</td>
                  <td>{reg.eventType}</td>
                  <td>{reg.eventDate}</td>
                  <td>{reg.eventTime}</td>
                  <td>{reg.price}</td>
                  <td>
                    <Badge 
                      bg={reg.status === "pending" 
                        ? "warning" 
                        : reg.status === "approved" 
                          ? "success" 
                          : "brand-red"}
                    >
                      {reg.status}
                    </Badge>
                  </td>
                  <td>{formatTimestamp(reg.registrationDate)}</td>
                  <td className="action-buttons">
                    {reg.status === "pending" && (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          className="action-btn"
                          onClick={() =>
                            handleUpdateEventRegistration(reg.id, "approved")
                          }
                          title="Approve Registration"
                        >
                          <FaCheck />
                        </Button>
                        <Button
                          variant="brand-red"
                          size="sm"
                          className="action-btn"
                          onClick={() =>
                            handleUpdateEventRegistration(reg.id, "rejected")
                          }
                          title="Reject Registration"
                        >
                          <FaTimes />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Contact Messages Section */}
      <Row className="mt-5">
        <Col md={12}>
          <div className="section-title">
            <div className="line"></div>
            <h2 className="admin-container-subtitle">Contact Messages</h2>
            <div className="line"></div>
          </div>
          <Table bordered responsive>
            <thead>
              <tr>
                <th className="admin-table-header">Name</th>
                <th className="admin-table-header">Email</th>
                <th className="admin-table-header">Subject</th>
                <th className="admin-table-header">Message</th>
                <th className="admin-table-header">Status</th>
                <th className="admin-table-header">Sent At</th>
                <th className="admin-table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contactMessages.map((msg) => (
                <tr key={msg.id}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.subject}</td>
                  <td>{msg.message}</td>
                  <td>
                    <Badge bg={msg.status === "unread" ? "warning" : "success"}>
                      {msg.status || "unread"}
                    </Badge>
                  </td>
                  <td>{formatTimestamp(msg.createdAt)}</td>
                  <td className="action-buttons">
                    <Button
                      variant="success"
                      size="sm"
                      className="action-btn"
                      onClick={() => handleMarkMessageStatus(msg.id, "read")}
                      title="Mark as Read"
                    >
                      <FaCheck />
                    </Button>
                    <Button
                      variant="brand-red"
                      size="sm"
                      className="action-btn"
                      href={`mailto:${msg.email}`}
                      title="Reply via Email"
                    >
                      <FaEnvelope />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Newsletter Subscriptions Section */}
      <Row className="mt-5">
        <Col md={12}>
          <div className="section-title">
            <div className="line"></div>
            <h2 className="admin-container-subtitle">
              Newsletter Subscriptions
            </h2>
            <div className="line"></div>
          </div>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th className="admin-table-header">Email</th>
                <th className="admin-table-header">Subscribed At</th>
                <th className="admin-table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsletters.map((sub) => (
                <tr key={sub.id}>
                  <td>{sub.email}</td>
                  <td>{formatTimestamp(sub.subscribedAt)}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleUnsubscribe(sub.id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={closeDeleteModal}
        centered
        className="delete-confirmation-modal"
      >
        <Modal.Header>
          <Modal.Title>
            <FaExclamationTriangle className="warning-icon me-2" />
            {deleteType === "reservation"
              ? "Cancel Reservation"
              : "Confirm Deletion"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteType === "reservation" ? (
            <>
              <p>Are you sure you want to cancel this reservation?</p>
              <p className="text-muted mb-3">
                Please provide a reason for cancellation:
              </p>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter cancellation message for the customer..."
                  value={cancellationMessage}
                  onChange={(e) => setCancellationMessage(e.target.value)}
                  className="cancellation-message"
                />
              </Form.Group>
              {itemToDelete && (
                <div className="reservation-details mt-3">
                  <h6>Reservation Details:</h6>
                  <p>Name: {itemToDelete.details.fullName}</p>
                  <p>Date: {itemToDelete.details.date}</p>
                  <p>Time: {itemToDelete.details.time}</p>
                  <p>Number of People: {itemToDelete.details.numPeople}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <p>Are you sure you want to remove this subscriber?</p>
              <p className="text-muted">This action cannot be undone.</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            {deleteType === "reservation" ? "Cancel Reservation" : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Admin;