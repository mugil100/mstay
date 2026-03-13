import React, { useState } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, Alert, IconButton } from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import api from '../services/api';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }
        setLoading(true);
        setError('');
        try {
            await api.put(`/auth/reset-password/${token}`, { password });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
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
                    Set New Password
                </Typography>
                <Typography sx={{ color: '#2563EB', fontSize: '0.7rem', fontWeight: 800, textAlign: 'center', mb: 4, letterSpacing: '0.1em' }}>
                    MATCH • OPTIMIZE • VERIFY
                </Typography>

                {success && <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>Password reset successful. Redirecting to login...</Alert>}
                {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box>
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>New Password</Typography>
                        <TextField
                            fullWidth type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                            value={password} onChange={(e) => setPassword(e.target.value)} required
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><LockRoundedIcon sx={{ color: '#9CA3AF', fontSize: '1.1rem' }} /></InputAdornment>,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                                            {showPassword ? <VisibilityOffRoundedIcon sx={{ fontSize: '1.1rem', color: '#9CA3AF' }} /> : <VisibilityRoundedIcon sx={{ fontSize: '1.1rem', color: '#9CA3AF' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', backgroundColor: '#F9FAFB' } }}
                        />
                    </Box>

                    <Box>
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Confirm New Password</Typography>
                        <TextField
                            fullWidth type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><LockRoundedIcon sx={{ color: '#9CA3AF', fontSize: '1.1rem' }} /></InputAdornment>,
                            }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', backgroundColor: '#F9FAFB' } }}
                        />
                    </Box>

                    <Button type="submit" fullWidth variant="contained" size="large" disabled={loading || success}
                        sx={{ py: 1.5, borderRadius: '12px', fontSize: '0.95rem', fontWeight: 700 }}>
                        {loading ? 'Updating...' : 'Set New Password'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ResetPassword;
