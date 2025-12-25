import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";



const ReviewPage = () => {
  const [testimonials, setTestimonials] = useState([
    { name: "John Doe", review: "Amazing platform! Love the artworks." },
    { name: "Emma Smith", review: "A great place to find unique art pieces!" }
  ]);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send JSON instead of FormData
      const response = await axios.post("http://localhost:9000/reviews/add", { name, review });

  
      if (response.status === 201) {
        alert("Testimonial submitted successfully!");
        setTestimonials([...testimonials, { name, review }]);
        setName("");
        setReview("");
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      alert(error.response?.data?.message || "Failed to submit review. Try again.");
    }
  };
  
  return (
    <>
      
      <Box sx={{ textAlign: "center", p: 3, backgroundColor: "white", minHeight: "100vh" }}>
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ color: "black", fontSize: "2rem", marginBottom: "20px" }} // Gold Heading
        >
          Testimonials
        </motion.h1>

        {/* Review Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: "30px" }}
        >
          <Card sx={{ maxWidth: 500, margin: "auto", p: 3, backgroundColor: "#0355cc", border: "2px solid black",boxShadow: "0px 4px 10px black" }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "black", color: "black" }}>Leave a Review</Typography> {/* Gold Heading */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  mb: 2,
                  backgroundColor: "white",
                  borderRadius: "5px",
                  border: "2px solid black",
                  "& .MuiInputBase-input": { color: "black" }, // White input text
                  "& .MuiInputLabel-root": { color: "black" }, // White placeholder
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "black" }, // Gold border
                    "&:hover fieldset": { borderColor: "blakc" },
                    "&.Mui-focused fieldset": { borderColor: "black" }
                  }
                }}
              />
              <TextField
                fullWidth
                label="Your Review"
                variant="outlined"
                multiline
                rows={3}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                sx={{
                  mb: 2,
                  backgroundColor: "white",
                  borderRadius: "5px",
                  border: "2px solid black",
                  "& .MuiInputBase-input": { color: "black" }, // White input text
                  "& .MuiInputLabel-root": { color: "black" }, // White placeholder
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "black" }, // Gold border
                    "&:hover fieldset": { borderColor: "black" },
                    "&.Mui-focused fieldset": { borderColor: "black" }
                  }
                }}
              />
              <Button type="submit" variant="contained" sx={{ backgroundColor: "white", color: "#06192c", fontWeight: "bold" }}>
                Submit
              </Button>
            </form>
          </Card>
        </motion.div>

        {/* Testimonials Section */}
        
      </Box>
    
    </>
  );
};

export default ReviewPage;