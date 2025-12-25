const eventModel = require('../Models/eventModel');

const addEvent = async (req, res) => {
  try {
    const { eventName, eventPrice, eventDate, eventTime, eventDescription,coordinatorEmail } = req.body;
    const image = req.file?.filename;

    const program = new eventModel({
      eventName,
      eventPrice,
      eventDate,
      eventTime,
      eventDescription,
      coordinatorEmail,
      Image: image,
    });

    await program.save();
    res.json("Program added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};

// const updateEvent = async (req, res) => {
//   try {
//     const { eventName, eventPrice, eventDate, eventTime, eventDescription } = req.body;
//     const id = req.params.id;
//     const image = req.file?.filename;

//     const updateData = {
//       eventName,
//       eventPrice,
//       eventDate,
//       eventTime,
//       eventDescription,
//     };

//     if (image) updateData.Image = image;

//     const updated = await eventModel.findByIdAndUpdate(id, updateData, { new: true });
//     res.json({ msg: "Program Updated successfully", status: 200, updated });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json("Error updating event");
//   }
// };

// const searchEventsByDate = async (req, res) => {
//   try {
//     const { date } = req.query;
//     const events = await eventModel.find({ eventDate: date });
//     res.status(200).json(events);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Error searching events' });
//   }
// };

const myevent = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    console.log("Searching events for:", email);
    const events = await eventModel.find({ coordinatorEmail: email });

    res.json(events);
  } catch (error) {
    console.error('Error fetching coordinator events:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



const editEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updateData = req.body;

    const updatedEvent = await eventModel.findByIdAndUpdate(eventId, updateData, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};



const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const deleted = await eventModel.findByIdAndDelete(eventId);

    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Failed to delete event" });
  }
};









module.exports = {
  addEvent,
  myevent,editEvent,deleteEvent
};
