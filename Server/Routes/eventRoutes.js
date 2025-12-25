const express = require('express');
const multer = require('multer');
const path = require('path');
const Event = require('../Models/eventModel'); 

const { addEvent, myevent, editEvent,deleteEvent } = require('../Controls/eventControl');


const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post("/addEvent", upload.single("Image"), addEvent);
// router.put("/updateEvent/:id", upload.single("Image"), updateEvent);
// router.get("/searchByDate", searchEventsByDate);
router.post('/myevent',myevent)
router.put('/editevent/:id', editEvent);
router.delete('/deleteevent/:id', deleteEvent);

// GET all events
router.get('/getAll', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;








