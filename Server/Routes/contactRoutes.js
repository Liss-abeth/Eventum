const express = require('express');
const {
  createContact,
  getContacts,
} = require('../Controls/contactControl');

const contactRouter = express.Router();

contactRouter.route('/create').post(createContact);     // POST new contact
contactRouter.route('/').get(getContacts);              // GET all contacts


module.exports = contactRouter;