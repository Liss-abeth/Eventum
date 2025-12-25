import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box,
    Paper
} from '@mui/material';

export default function Registration() {
    const [record, setRecord] = useState({
        fullname: '',
        email: '',
        password: '',
        phone: '',
        role: 'user'
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setRecord({ ...record, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { fullname, email, password, phone } = record;

        if (!fullname.trim() || !email.trim() || !password.trim() || !phone.trim()) {
            alert("All fields are required.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Invalid email format.");
            return false;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return false;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            alert("Phone number must be 10 digits.");
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const trimmedRecord = {
            ...record,
            fullname: record.fullname.trim(),
            email: record.email.trim(),
            password: record.password.trim(),
            phone: record.phone.trim()
        };

        axios.post('http://localhost:9000/api/user/register', trimmedRecord)
            .then((res) => {
                alert(res.data.msg || "Registered successfully");
                if (res.status === 200) {
                    navigate('/');
                }
            })
            .catch((err) => {
                console.error(err);
                alert(err.response?.data?.msg || "Registration failed");
            });
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f4f4f4',
                p: 2
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: 400,
                    borderRadius: 3,
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Full Name"
                        name="fullname"
                        value={record.fullname}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={record.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={record.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={record.phone}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            name="role"
                            value={record.role}
                            onChange={handleChange}
                        >
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="coordinator">Coordinator</MenuItem>
                        </Select>
                    </FormControl>
                    <Box textAlign="center" mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Register
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}
