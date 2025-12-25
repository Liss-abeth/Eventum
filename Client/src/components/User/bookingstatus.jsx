import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Spinner, Row, Col } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box'; // Import Box for the message container
import IconButton from '@mui/material/IconButton'; // Import IconButton for the close button
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon

export default function BookingStatus() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState({}); // State to manage confirmation visibility per booking
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found");
      setLoading(false);
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (err) {
      console.error("Invalid token", err);
      setLoading(false);
      return;
    }

    const userId = decoded.id || decoded._id;

    if (!userId) {
      console.error("User ID not found in token");
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:9000/api/user/bookings/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setBookings(response.data);
      // Initialize showConfirmation state for each booking
      const initialConfirmationState = {};
      response.data.forEach(booking => {
        initialConfirmationState[booking._id] = false; // By default, don't show confirmation
      });
      setShowConfirmation(initialConfirmationState);
      setLoading(false);
    })
    .catch((error) => {
      if (error.response) {
        console.error("Server responded with error:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
      setLoading(false);
    });

  }, []);

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );

  const handleShowConfirmation = (bookingId) => {
    setShowConfirmation(prevState => ({
      ...prevState,
      [bookingId]: true // Show confirmation for the specific booking
    }));
  };

  const handleCloseConfirmation = (bookingId) => {
    setShowConfirmation(prevState => ({
      ...prevState,
      [bookingId]: false // Hide confirmation for the specific booking
    }));
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Your Booking Status</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <Row>
          {bookings.map((booking) => (
            <Col key={booking._id} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{booking.eventName}</Card.Title>
                  <Card.Text>
                    <strong>Quantity:</strong> {booking.quantity} <br />
                    <strong>Total:</strong> ₹{booking.totalAmount} <br />
                    <strong>Payment:</strong> {booking.paymentMethod} <br />
                    <strong>Address:</strong> {booking.address}
                  </Card.Text>

                  {/* Display all status messages */}
                  {booking.messages && booking.messages.length > 0 && (
                    <>
                      <hr />
                      {booking.messages.map((msg, idx) => (
                        <Card.Text key={idx}>
                          <em>{msg.text}</em>{' '}
                          <small>({new Date(msg.date).toLocaleString()})</small>
                        </Card.Text>
                      ))}
                    </>
                  )}

                  <div className="mt-3">
                    {/* Button to show the confirmation message */}
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => handleShowConfirmation(booking._id)}
                      className="me-2" // Add some margin to the right
                    >
                      Confirmation
                    </Button>

                    {/* Original OK button */}
                    <Button
                      variant="outlined" // Use outlined variant to differentiate
                      disableElevation
                      onClick={() => navigate('/userhome')}
                    >
                      OK
                    </Button>
                  </div>

                  {/* Confirmation message box, conditionally rendered */}
                  {showConfirmation[booking._id] && (
                    <Box
                      sx={{
                        mt: 3,
                        p: 2,
                        border: '1px solid #28a745',
                        borderRadius: '4px',
                        backgroundColor: '#d4edda',
                        color: '#155724',
                        position: 'relative',
                      }}
                    >
                      <IconButton
                        aria-label="close"
                        onClick={() => handleCloseConfirmation(booking._id)}
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: 8,
                          color: '#155724',
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                      <Card.Text className="mb-0">
                        <strong>Your booking for Event is confirmed! You can now get your ticket.</strong>
                      </Card.Text>
                    </Box>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}