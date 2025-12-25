const Testimonial = require('../Models/reviewModel');


const addTestimonial = async (req, res) => {
  try {
    const { name, review } = req.body;

    if (!name || !review) {
      return res.status(400).json({ message: "Name and review are required" });
    }

    const newTestimonial = new Testimonial({ name, review });
    await newTestimonial.save();

    res.status(201).json({ message: "Testimonial added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Get all testimonials
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching testimonials", error });
  }
};

module.exports = {getTestimonials ,addTestimonial}