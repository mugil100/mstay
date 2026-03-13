import React, { useState } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, Alert, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import api from '../services/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await api.post('/auth/forgot-password', { email });
            setMessage('A password reset link has been sent to your email.');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB', p: 3 }}>
            <Box sx={{ maxWidth: 400, width: '100%', p: 4, borderRadius: '24px', backgroundColor: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Box sx={{
                        width: 80, height: 80, borderRadius: '24px',
                        backgroundColor: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        p: 1, overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                    }}>
                        <img src="/logo.jpeg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </Box>
                </Box>

                <Typography sx={{ fontWeight: 800, fontSize: '1.75rem', color: '#111827', textAlign: 'center', mb: 1 }}>
                    Forgot Password?
                </Typography>
                <Typography sx={{ color: '#2563EB', fontSize: '0.7rem', fontWeight: 800, textAlign: 'center', mb: 4, letterSpacing: '0.1em' }}>
                    MATCH • OPTIMIZE • VERIFY
                </Typography>

                {message && <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>{message}</Alert>}
                {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box>
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Email Address</Typography>
                        <TextField
                            fullWidth type="email" placeholder="Enter your email"
                            value={email} onChange={(e) => setEmail(e.target.value)} required
                            InputProps={{ startAdornment: <InputAdornment position="start"><EmailRoundedIcon sx={{ color: '#9CA3AF', fontSize: '1.1rem' }} /></InputAdornment> }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', backgroundColor: '#F9FAFB' } }}
                        />
                    </Box>

                    <Button type="submit" fullWidth variant="contained" size="large" disabled={loading}
                        sx={{ py: 1.5, borderRadius: '12px', fontSize: '0.95rem', fontWeight: 700 }}>
                        {loading ? 'Sending link...' : 'Reset Password'}
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                        <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#6B7280', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
                            <ArrowBackRoundedIcon sx={{ fontSize: 18 }} />
                            Back to login
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ForgotPassword;
