import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Myevent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const coordinatorEmail = localStorage.getItem('coordinatorEmail');

  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [updatedEvent, setUpdatedEvent] = useState({
    eventName: '',
    eventPrice: '',
    eventDate: '',
    eventTime: '',
    eventDescription: ''
  });

  useEffect(() => {
    fetchEvents();
  }, [coordinatorEmail]);

  const fetchEvents = async () => {
    try {
      if (!coordinatorEmail) {
        setError("Coordinator email not found in localStorage.");
        setLoading(false);
        return;
      }

      const response = await axios.post("http://localhost:9000/api/coordinator/myevent", {
        email: coordinatorEmail
      });

      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Error fetching events. Please try again.");
      setLoading(false);
    }
  };

  const handleEditClick = (event) => {
    setCurrentEvent(event);
    setUpdatedEvent({
      eventName: event.eventName,
      eventPrice: event.eventPrice,
      eventDate: event.eventDate,
      eventTime: event.eventTime,
      eventDescription: event.eventDescription
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setUpdatedEvent({ ...updatedEvent, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:9000/api/coordinator/editevent/${currentEvent._id}`, updatedEvent);
      setShowModal(false);
      fetchEvents();
    } catch (err) {
      console.error("Error updating event:", err);
      alert("Failed to update event.");
    }
  };




    const handleDelete = async (eventId) => {
  if (!window.confirm("Are you sure you want to delete this event?")) return;

  try {
    await axios.delete(`http://localhost:9000/api/coordinator/deleteevent/${eventId}`);
    fetchEvents(); // Refresh the event list
  } catch (err) {
    console.error("Error deleting event:", err);
    alert("Failed to delete event.");
  }
};







  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">My Created Events</h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}
      {!loading && events.length === 0 && !error && (
        <p className="text-center">No events created yet.</p>
      )}

      <Row xs={1} md={2} lg={3} className="g-4">
        {events.map((event) => (
          <Col key={event._id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={`http://localhost:9000/uploads/${event.Image}`}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{event.eventName}</Card.Title>
                <Card.Text>
                  <strong>Price:</strong> ₹{event.eventPrice}<br />
                  <strong>Date:</strong> {event.eventDate}<br />
                  <strong>Time:</strong> {event.eventTime}<br />
                  <strong>Description:</strong> {event.eventDescription}
                </Card.Text>
                <Button variant="primary" onClick={() => handleEditClick(event)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(event._id)} className="ms-2">
                   Delete
                </Button>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                name="eventName"
                value={updatedEvent.eventName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="eventPrice"
                value={updatedEvent.eventPrice}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="eventDate"
                value={updatedEvent.eventDate}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="eventTime"
                value={updatedEvent.eventTime}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="eventDescription"
                value={updatedEvent.eventDescription}
                onChange={handleInputChange}
              />
            </Form.Group>
            

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
