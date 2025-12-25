import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Link,
  Paper,
} from '@mui/material';

export default function Login() {
  const [record, setRecord] = useState({ email: '', password: '' });
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailTrimmed = record.email.trim();
    const passwordTrimmed = record.password.trim();

    if (!emailTrimmed || !passwordTrimmed) {
      alert('Please fill in all fields.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      alert('Invalid email format.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await axios.post('http://localhost:9000/api/user/login', {
        ...record,
        email: record.email.trim(),
        password: record.password.trim(),
        role,
      });

      if (res.data.status === 200) {
        alert('Login Successful');
        localStorage.setItem('token', res.data.token);

        if (role === 'coordinator') {
        localStorage.setItem('coordinatorEmail', record.email.trim());
      }


        switch (role) {
          case 'admin':
            navigate('/adminhome');
            break;
          case 'coordinator':
            navigate('/coordinatorhome');
            break;
          default:
            navigate('/userhome');
        }
      } else {
        alert(res.data.msg || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMsg = err.response?.data?.msg || 'Something went wrong. Please try again.';
      alert(errorMsg);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, width: '100%', boxSizing: 'border-box' }}
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5" align="center" mb={3}>
          Login
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={role}
            label="Role"
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="coordinator">Coordinator</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Email"
          name="email"
          type="email"
          value={record.email}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
          autoComplete="email"
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={record.password}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
          autoComplete="current-password"
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>

        <Typography align="center">
          Don't have an account?{' '}
          <Link href="/register" underline="hover">
            Register here
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
