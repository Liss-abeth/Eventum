const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventPrice: { type: String },
  eventDate: { type: String, required: true },
  eventTime: { type: String, required: true },
  eventDescription: { type: String },
  Image: { type: String }, // add image field
  coordinatorEmail: { type: String, required: true },
});

const eventModel = mongoose.model('Event', eventSchema);
module.exports = eventModel;
