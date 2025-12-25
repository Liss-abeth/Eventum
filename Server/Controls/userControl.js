const userModel = require('../Models/userModels');
const bookModel = require('../Models/bookModel');
// const eventModel = require('../Models/eventModel');
const jwt = require('jsonwebtoken');

// Fetch users
const fetchUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};





// Login
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ msg: "User not found", status: 404 });
    }

    if (user.role !== role) {
      return res.json({ msg: "Role mismatch", status: 403 });
    }

    if (user.password !== password) {
      return res.json({ msg: "Invalid credentials", status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ msg: "Login successful", status: 200, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error", status: 500 });
  }
};

// Register
const register = async (req, res) => {
  try {
    console.log(req.body);
    const { fullname, email, password, phone, role } = req.body;

    // Check if role is admin and if an admin already exists
    if (role === 'admin') {
      const existingAdmin = await userModel.findOne({ role: 'admin' });
      if (existingAdmin) {
        return res.status(400).json({ msg: "An admin account already exists." });
      }
    }

    // Optional: prevent duplicate emails
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered." });
    }

    const user = new userModel({
      fullname,
      email,
      password,
      phone,
      role: role || 'user'
    });

    await user.save();
    res.status(200).json({ msg: "Registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong" });
  }
};


// Book
const book = async (req, res) => {
  try {
    const { userId, eventId, quantity, totalAmount, paymentMethod, address } = req.body;

    if (!userId || !eventId || !quantity || !totalAmount || !paymentMethod || !address) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newBooking = new bookModel({
      userId,
      eventId,
      quantity,
      totalAmount,
      paymentMethod,
      address,
      
    });

    await newBooking.save();
    res.status(201).json("Booking placed successfully");
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ error: "Server error while placing booking" });
  }
};


const bookingStatus = async (req, res) => {
  try {
    const bookings = await bookModel.find({ userId: req.params.userId }).populate('eventId');
    const formatted = bookings.map(b => ({
      _id: b._id,
      quantity: b.quantity,
      totalAmount: b.totalAmount,
      status: b.status,
      paymentMethod: b.paymentMethod,
      address: b.address,
      eventName: b.eventId.eventName,
    }));
    res.json(formatted);
  } catch (err) {
    console.error("BookingStatus Error:", err);  // Add this line
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};


// const myevent = async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }

//   try {
//     console.log("Searching events for:", email);
//     const events = await eventModel.find({ coordinatorEmail: email });

//     res.json(events);
//   } catch (error) {
//     console.error('Error fetching coordinator events:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



const fetchBookings = async (req, res) => {
  try {
    const bookings = await bookModel.find({ coordinatorId: req.user.id });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};








module.exports = {login,register,fetchUsers,book,bookingStatus,fetchBookings};
