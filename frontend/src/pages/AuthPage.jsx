import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Tab,
    Tabs,
    Alert
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
        setError('');
        setFormData({ name: '', email: '', password: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (tabIndex === 0) {
                // Login
                const result = await login(formData.email, formData.password);
                if (result.success) {
                    navigate('/'); // Redirect to home on success
                } else {
                    setError(result.message);
                }
            } else {
                // Register
                const result = await register(formData.name, formData.email, formData.password);
                if (result.success) {
                    navigate('/'); // Redirect to home on success
                } else {
                    setError(result.message);
                }
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper elevation={3} sx={{ padding: 4, width: '100%', borderRadius: 2 }}>
                    <Typography component="h1" variant="h5" align="center" gutterBottom>
                        {tabIndex === 0 ? 'Owner Login' : 'Owner Registration'}
                    </Typography>

                    <Tabs
                        value={tabIndex}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        sx={{ mb: 3 }}
                    >
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        {tabIndex === 1 && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={formData.name}
                                onChange={handleChange}
                            />
                        )}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus={tabIndex === 0}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : (tabIndex === 0 ? 'Sign In' : 'Sign Up')}
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default AuthPage;
