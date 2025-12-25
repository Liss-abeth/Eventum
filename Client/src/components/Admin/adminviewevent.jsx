import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs, Tab, Table, Button, Container, Card } from 'react-bootstrap';

import Contact from '../Admin/adminhome';

export default function ViewAdminEvents() {
  const [users, setUsers] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchCoordinators();
    fetchBookings();
    fetchEvents();
     fetchContacts();
    
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/admin/fetchUsers");
      const filteredUsers = res.data.filter(user => user.role === "user");
      setUsers(filteredUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchCoordinators = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/admin/fetchCoordinator");
      setCoordinators(res.data);
    } catch (err) {
      console.error("Error fetching coordinators:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/admin/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/coordinator/getAll"); // Assuming this is defined
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const deleteUser = async (id) => {
  try {
    await axios.delete(`http://localhost:9000/api/admin/admindeleteuser/${id}`);
    setUsers(prev => prev.filter(u => u._id !== id));
    fetchBookings();
  } catch (err) {
    console.error("Error deleting user:", err);
  }
};

  const deleteCoordinator = async (id) => {
  try {
    await axios.delete(`http://localhost:9000/api/admin/deleteCoordinator/${id}`);
    setCoordinators(prev => prev.filter(coord => coord._id !== id));
  } catch (err) {
    console.error("Error deleting coordinator:", err);
  }
};



const [contacts, setContacts] =React.useState([]);
  const [loadingContacts, setLoadingContacts] = React.useState(false);
  const [contactError, setContactError] = React.useState(null);



  const fetchContacts = async () => {
  setLoadingContacts(true);
  setContactError(null);

  try {
    const response = await axios.get("http://localhost:9000/contact"); // ✅ correct endpoint
    console.log("✅ Contacts fetched:", response.data); // helpful log
    setContacts(response.data); // store in state
  } catch (error) {
    console.error("❌ Fetch error:", error.message);
    setContactError("Failed to load contacts.");
  } finally {
    setLoadingContacts(false);
  }
};



  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Admin Views</h2>
      <Tabs defaultActiveKey="users" className="mb-3" fill>

        <Tab eventKey="users" title="Users">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <td>{idx + 1}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Button variant="danger" onClick={() => deleteUser(user._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="coordinators" title="Coordinators">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {coordinators.map((coord, idx) => (
                <tr key={coord._id}>
                  <td>{idx + 1}</td>
                  <td>{coord.fullname}</td>
                  <td>{coord.email}</td>
                  <td>{coord.phone}</td>
                  <td>
                    <Button variant="danger" onClick={() => deleteCoordinator(coord._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="bookings" title="Bookings">
          {bookings.length === 0 ? (
            <p className="text-center">No bookings available.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Event</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  {/* <th>Status</th> */}
                  <th>Payment</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, idx) => (
                  <tr key={b._id}>
                    <td>{idx + 1}</td>
                    <td>{b.userId?.fullname || "N/A"}</td>
                    <td>{b.userId?.email || "N/A"}</td>
                    <td>{b.eventId?.eventName || "N/A"}</td>
                    <td>{b.quantity}</td>
                    <td>₹{b.totalAmount}</td>
                    {/* <td>{b.status}</td> */}
                    <td>{b.paymentMethod}</td>
                    <td>{b.address}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>

        {/* <Tab eventKey="events" title="Events">
          {events.length === 0 ? (
            <p className="text-center">No events available.</p>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {events.map(event => (
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
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Tab> */}



{/* Contacts Tab */}
  <Tab eventKey="contacts" title="Contacts">
    {loadingContacts ? (
      <p>Loading contacts...</p>
    ) : contactError ? (
      <p className="text-danger">{contactError}</p>
    ) : contacts.length > 0 ? (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, idx) => (
            <tr key={contact._id || idx}>
              <td>{idx + 1}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.message}</td>
              <td>{new Date(contact.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ) : (
      <p className="text-center">No contact information available.</p>
    )}
  </Tab>





      </Tabs>


    </Container>
  );
}
