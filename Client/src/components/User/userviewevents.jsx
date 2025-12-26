// ViewUserEvents.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ViewUserEvents() {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
      const response = await axios.get("https://eventum-w3x5.onrender.com/api/coordinator/getAll");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleQuantityChange = (eventId, value) => {
    setQuantities({
      ...quantities,
      [eventId]: parseInt(value) || 1,
    });
  };

  const handleAddToCart = (event) => {
    const quantity = quantities[event._id] || 1;
    const total = quantity * parseFloat(event.eventPrice);
    
    navigate('/book', {
      state: {
        event,
        quantity,
        total,
        userId,
      }
    });
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Available Events</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {events.map((event) => (
          <Col key={event._id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={`https://eventum-w3x5.onrender.com/uploads/${event.Image}`}
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
                <Form.Group controlId={`quantity-${event._id}`} className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={quantities[event._id] || 1}
                    onChange={(e) => handleQuantityChange(event._id, e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={() => handleAddToCart(event)}
                >
                  Book
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
