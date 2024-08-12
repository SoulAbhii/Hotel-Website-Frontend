import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/admin/login', {
                username,
                password
            });

            Swal.fire({
                icon: 'success',
                title: 'Login successful',
                text: 'You are being redirected to the admin dashboard.',
                timer: 1500,
                showConfirmButton: false,
            });

            setError('');
            onLogin();
            navigate('/admin');
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            setError('Invalid credentials');

            Swal.fire({
                icon: 'error',
                title: 'Login failed',
                text: 'Invalid credentials. Please try again.',
            });
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
            <Typography variant="h4" gutterBottom>Admin Login</Typography>
            <form onSubmit={handleLogin} className="w-50">
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
            {error && <Typography color="error" variant="body2">{error}</Typography>}
        </Container>
    );
};

export default LoginPage;
