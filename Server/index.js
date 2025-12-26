const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const dbConnect = require('./Models/dbconnect');
dbConnect();

// Root health check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Eventum API is running"
  });
});

const adminRouter = require("./Routes/adminRoutes");
const userRouter = require('./Routes/userRoutes');
const eventRouter = require('./Routes/eventRoutes');
const contactRouter = require('./Routes/contactRoutes');
const reviewRouter = require('./Routes/reviewRoutes');

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/coordinator", eventRouter);
app.use("/reviews", reviewRouter);
app.use("/uploads", express.static('uploads'));
app.use("/contact", contactRouter);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server running successfully @ ${PORT}`);
});
