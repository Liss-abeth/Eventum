const Contact = require('../Models/contactModel');

//  all contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error("❌ Error fetching contacts:", err.message);
    res.status(500).json({ message: "Error fetching contacts", error: err.message });
  }
};

// Create  contact
const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required!" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json(newContact);
  } catch (err) {
    console.error("❌ Error creating contact:", err.message);
    res.status(500).json({ message: "Error creating contact", error: err.message });
  }
};
module.exports = {
  getContacts,
  createContact,
  
};