import React, { useState, useContext } from 'react';
import { Box, Button, TextField, Typography, Paper, Alert, Divider } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedRole === 'student' && formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const endpoint = selectedRole === 'student' ? '/auth/register-student' : '/auth/register';
            const response = await api.post(endpoint, formData);
            login(response.data.user, response.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await api.post('/auth/google', {
                credential: credentialResponse.credential,
            });
            login(response.data.user, response.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Google sign-up failed');
        }
    };

    const handleGoogleError = () => {
        setError('Google sign-up was cancelled or failed. Please try again.');
    };

    const [selectedRole, setSelectedRole] = useState('');

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                width: '100%',
                backgroundColor: '#f4f6f8',
                py: 4
            }}
        >
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: selectedRole === 'student' ? 600 : 400 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                    <Box
                        component="img"
                        src="/MOV Stay Logo.png"
                        alt="MOV Stay Logo"
                        sx={{ height: 60, objectFit: 'contain' }}
                    />
                </Box>
                <Typography variant="h6" gutterBottom textAlign="center" mb={3}>
                    {selectedRole === 'owner' ? 'Owner Registration' : selectedRole === 'student' ? 'Student Registration' : 'Register'}
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                {!selectedRole ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography textAlign="center" mb={2}>Select Account Type</Typography>
                        <Button variant="contained" color="primary" onClick={() => setSelectedRole('student')}>
                            Register as Student
                        </Button>
                        <Button variant="outlined" color="primary" onClick={() => setSelectedRole('owner')}>
                            Register as Owner
                        </Button>
                        <Divider sx={{ my: 2 }}>OR</Divider>
                        <Typography textAlign="center" mt={2}>
                            Already have an account?{' '}
                            <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
                                Login
                            </Link>
                        </Typography>
                    </Box>
                ) : (
                    <Box>
                        <form onSubmit={handleSubmit}>
                            {/* Common Fields */}
                            <TextField
                                fullWidth
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            {selectedRole === 'student' && (
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    value={formData.phone || ''}
                                    onChange={handleChange}
                                    margin="normal"
                                    required
                                />
                            )}
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            {selectedRole === 'student' && (
                                <TextField
                                    fullWidth
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword || ''}
                                    onChange={handleChange}
                                    margin="normal"
                                    required
                                />
                            )}

                            {/* Initial Details Only */}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                sx={{ mt: 3, mb: 2, py: 1.5 }}
                            >
                                Register
                            </Button>
                        </form>

                        {selectedRole === 'owner' && (
                            <>
                                <Divider sx={{ my: 2 }}>OR</Divider>

                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={handleGoogleError}
                                        text="signup_with"
                                        shape="rectangular"
                                        width="100%"
                                    />
                                </Box>
                            </>
                        )}
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                            <Button variant="text" onClick={() => setSelectedRole('')}>
                                Back
                            </Button>
                            <Typography textAlign="center" mt={1}>
                                Already have an account?{' '}
                                <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
                                    Login
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default RegisterPage;
