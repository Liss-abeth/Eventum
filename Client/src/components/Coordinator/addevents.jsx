import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Alert, LinearProgress
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from 'axios';

export default function AddEventsMui() {
  const [program, setProgram] = useState({
    eventName: '',
    eventPrice: '',
    eventDate: '',
    eventTime: '',
    eventDescription: '',
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const coordinatorEmail = localStorage.getItem('coordinatorEmail');

  const isNumeric = value => !isNaN(value) && value.trim() !== '';

  const handleChange = e =>
    setProgram({ ...program, [e.target.name]: e.target.value });

  const handleImageChange = e => {
    const file = e.target.files[0];
    setImage(file);
  };

  const validate = () => {
    if (
      !program.eventName ||
      !isNumeric(program.eventPrice) ||
      !program.eventDate ||
      !program.eventTime ||
      !program.eventDescription ||
      !image ||
      !coordinatorEmail
    ) {
      setError(
        'Please fill all fields correctly (numeric price) and upload a poster.'
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setUploadProgress(0);

    if (!validate()) return;

    const formData = new FormData();
    Object.entries(program).forEach(([k, v]) => formData.append(k, v));
    formData.append('coordinatorEmail', coordinatorEmail);
    formData.append('Image', image);

    try {
      await axios.post(
        'https://eventum-w3x5.onrender.com/api/coordinator/addEvent',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: p => {
            const percent = Math.round((p.loaded * 100) / p.total);
            setUploadProgress(percent);
          },
        }
      );
      setSuccess('Event added successfully!');
      setProgram({
        eventName: '',
        eventPrice: '',
        eventDate: '',
        eventTime: '',
        eventDescription: '',
      });
      setImage(null);
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      console.error(err);
      setError('Failed to add event. Try again.');
    }
  };

  return (
    <Box maxWidth="md" mx="auto" p={2}>
      <Typography variant="h4" mb={2}>
        Add Events
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          required
          name="eventName"
          label="Event Name"
          value={program.eventName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          required
          name="eventPrice"
          label="Event Price"
          value={program.eventPrice}
          onChange={handleChange}
          error={!!program.eventPrice && !isNumeric(program.eventPrice)}
          helperText={
            !!program.eventPrice && !isNumeric(program.eventPrice)
              ? 'Price must be numeric'
              : ''
          }
          margin="normal"
        />
        <Box display="flex" gap={2} mt={2}>
          <TextField
            required
            name="eventDate"
            label="Event Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={program.eventDate}
            onChange={handleChange}
          />
          <TextField
            required
            name="eventTime"
            label="Event Time"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={program.eventTime}
            onChange={handleChange}
          />
        </Box>
        <TextField
          fullWidth
          required
          multiline
          rows={4}
          name="eventDescription"
          label="Event Description"
          value={program.eventDescription}
          onChange={handleChange}
          margin="normal"
        />
        <Button
          variant="contained"
          component="label"
          startIcon={<UploadFileIcon />}
          sx={{ mt: 2 }}
        >
          {image ? image.name : 'Upload Poster'}
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>

        {(uploadProgress > 0 && uploadProgress < 100) && (
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            sx={{ mt: 2 }}
          />
        )}

        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 3 }}
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
