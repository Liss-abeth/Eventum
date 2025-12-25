import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  Box,
} from '@mui/material';

// Replace with actual dynamic login data in production
const CURRENT_COORDINATOR_EMAIL = 'coordinator1@example.com';

const ConfirmBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/coordinator/bookings");
      const allBookings = res.data;

      // Filter bookings based on coordinator email
      const filtered = allBookings.filter(
        (b) => b.eventId?.coordinatorId?.email === CURRENT_COORDINATOR_EMAIL
      );

      setBookings(filtered);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings. Please check the backend or route.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading bookings...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 10 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Event Bookings
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Logged in as: <strong>{CURRENT_COORDINATOR_EMAIL}</strong>
        </Typography>
      </Box>

      {bookings.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6">No bookings found for your events.</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Event</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((b, idx) => (
                <TableRow key={b._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{b.userId?.fullname || "N/A"}</TableCell>
                  <TableCell>{b.userId?.email || "N/A"}</TableCell>
                  <TableCell>{b.eventId?.eventName || "N/A"}</TableCell>
                  <TableCell>{b.quantity}</TableCell>
                  <TableCell>₹{b.totalAmount}</TableCell>
                  <TableCell>{b.paymentMethod}</TableCell>
                  <TableCell>{b.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ConfirmBooking;
