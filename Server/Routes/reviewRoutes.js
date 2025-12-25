const express = require('express');
const {
  addTestimonial,
  getTestimonials,
} = require('../Controls/reviewControl');

const reviewRouter = express.Router();

reviewRouter.route("/add").post(addTestimonial);
reviewRouter.route("/all").get(getTestimonials);


module.exports = reviewRouter;