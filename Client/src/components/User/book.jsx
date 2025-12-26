import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { Modal, Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';

export default function Book() {
  const location = useLocation();
  const navigate = useNavigate(); 

  const { event, quantity, total, userId } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');
  const [showModal, setShowModal] = useState(true); 

  if (!event || !userId) {
    return <div className="text-center mt-5 text-danger">Invalid booking request.</div>;
  }

  const handleBookingSubmit = () => {
    const bookingData = {
      userId,
      eventId: event._id,
      quantity,
      totalAmount: total,
      paymentMethod,
      address,
      status: 'pending'
    };

    axios.post('https://eventum-w3x5.onrender.com/api/user/book', bookingData)
      .then((res) => {
        alert('Booking successful!');
        setShowModal(false);
        navigate('/booking-status');
      })
      .catch((err) => {
        console.error("Booking error:", err);
        alert("Booking failed. Please try again.");
      });
  };

  return (
    <Container className="my-5">
      <Card className="p-4 shadow">
        <h4>Booking Details</h4>
        <p><strong>Event:</strong> {event.eventName}</p>
        <p><strong>Price:</strong> ₹{event.eventPrice}</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Total:</strong> ₹{total}</p>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Check
              type="radio"
              label="Online Payment"
              name="paymentMethod"
              value="Online"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button
            variant="success"
            disabled={!paymentMethod || !address}
            onClick={handleBookingSubmit}
          >
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
