import React, { useState, useContext } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, IconButton, Alert, Divider } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
        <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
);

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'owner' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await api.post('/auth/register', formData);
            login(response.data.user, response.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`;
    };

    const benefits = [
        'List unlimited PG properties',
        'Manage rooms & availability in real-time',
        'Get analytics and occupancy insights',
        'Free to get started — no hidden charges',
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
            {/* Left Panel */}
            <Box sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '45%',
                background: 'linear-gradient(145deg, #1E40AF 0%, #2563EB 55%, #14B8A6 100%)',
                p: 5,
                position: 'relative',
                overflow: 'hidden',
            }}>
                <Box sx={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                <Box sx={{ position: 'absolute', bottom: -80, left: -40, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

                {/* Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, position: 'relative', zIndex: 1 }}>
                    <Box sx={{
                        width: 52, height: 52, borderRadius: '14px',
                        backgroundColor: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        p: 0.5, overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                        <img src="/logo.jpeg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </Box>
                    <Box>
                        <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.4rem', lineHeight: 1.1 }}>MOV Stay</Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                            MATCH • OPTIMIZE • VERIFY
                        </Typography>
                    </Box>
                </Box>

                {/* Center illustration */}
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                        <svg width="220" height="160" viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Dashboard card mockup */}
                            <rect x="20" y="20" width="180" height="120" rx="12" fill="rgba(255,255,255,0.15)" />
                            <rect x="32" y="34" width="70" height="40" rx="8" fill="rgba(255,255,255,0.25)" />
                            <rect x="32" y="42" width="30" height="6" rx="3" fill="rgba(255,255,255,0.5)" />
                            <rect x="32" y="52" width="50" height="14" rx="4" fill="rgba(255,255,255,0.7)" />
                            <rect x="110" y="34" width="70" height="40" rx="8" fill="rgba(255,255,255,0.2)" />
                            <rect x="110" y="42" width="30" height="6" rx="3" fill="rgba(255,255,255,0.4)" />
                            <rect x="110" y="52" width="50" height="14" rx="4" fill="rgba(255,255,255,0.6)" />
                            {/* Occupancy bar */}
                            <rect x="32" y="86" width="156" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
                            <rect x="32" y="86" width="110" height="6" rx="3" fill="rgba(255,255,255,0.75)" />
                            {/* Rows */}
                            <rect x="32" y="104" width="80" height="5" rx="2.5" fill="rgba(255,255,255,0.25)" />
                            <rect x="32" y="116" width="60" height="5" rx="2.5" fill="rgba(255,255,255,0.2)" />
                            <rect x="32" y="128" width="90" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />
                            {/* Green dot */}
                            <circle cx="180" cy="104" r="5" fill="#34D399" />
                            <circle cx="180" cy="116" r="5" fill="#FBBF24" />
                            <circle cx="180" cy="128" r="5" fill="#F87171" />
                        </svg>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                        <Box sx={{ width: 36, height: 36, borderRadius: '10px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <BusinessCenterRoundedIcon sx={{ color: '#fff', fontSize: 20 }} />
                        </Box>
                        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>For PG Owners Only</Typography>
                    </Box>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.9rem', lineHeight: 1.2, mb: 1.5 }}>
                        Start Managing<br />Your PGs Today
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                        Join 2,400+ property owners using MOV Stay to manage their business.
                    </Typography>
                </Box>

                {/* Benefits */}
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    {benefits.map((f) => (
                        <Box key={f} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.25 }}>
                            <CheckCircleRoundedIcon sx={{ fontSize: 18, color: '#34D399', flexShrink: 0 }} />
                            <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: 500 }}>{f}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Right Panel — Form */}
            <Box sx={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                flex: 1, p: { xs: 3, md: 6 }, backgroundColor: '#fff', overflowY: 'auto',
            }}>
                <Box sx={{ maxWidth: 400, mx: 'auto', width: '100%' }}>
                    {/* Mobile logo */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1.5, mb: 4 }}>
                        <Box sx={{ 
                            width: 48, height: 48, borderRadius: '12px', 
                            backgroundColor: '#fff', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            p: 0.5, overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                        }}>
                            <img src="/logo.jpeg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </Box>
                        <Box>
                            <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', color: '#111827', lineHeight: 1.1 }}>MOV Stay</Typography>
                            <Typography sx={{ fontWeight: 700, fontSize: '0.62rem', color: '#2563EB', letterSpacing: '0.05em' }}>MATCH • OPTIMIZE • VERIFY</Typography>
                        </Box>
                    </Box>

                    <Typography sx={{ fontWeight: 800, fontSize: '1.75rem', color: '#111827', mb: 0.75 }}>
                        Create your account ✨
                    </Typography>
                    <Typography sx={{ color: '#6B7280', fontSize: '0.9rem', mb: 4 }}>
                        Register as a PG owner and start listing your properties
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }}>{error}</Alert>}

                    {/* Google Sign-Up */}
                    <Button
                        fullWidth variant="outlined"
                        onClick={handleGoogleLogin}
                        startIcon={<GoogleIcon />}
                        sx={{
                            mb: 3, py: 1.4, borderRadius: '12px',
                            borderColor: '#E5E7EB', color: '#374151',
                            backgroundColor: '#fff', fontWeight: 600, fontSize: '0.9rem',
                            textTransform: 'none',
                            '&:hover': { borderColor: '#D1D5DB', backgroundColor: '#F9FAFB' },
                        }}
                    >
                        Sign up with Google
                    </Button>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Divider sx={{ flex: 1, borderColor: '#E5E7EB' }} />
                        <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 500 }}>or register with email</Typography>
                        <Divider sx={{ flex: 1, borderColor: '#E5E7EB' }} />
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <Box>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Full Name</Typography>
                            <TextField
                                fullWidth name="name" placeholder="Your full name"
                                value={formData.name} onChange={handleChange} required size="medium"
                                InputProps={{ startAdornment: <InputAdornment position="start"><PersonRoundedIcon sx={{ color: '#9CA3AF', fontSize: '1.1rem' }} /></InputAdornment> }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', backgroundColor: '#F9FAFB' } }}
                            />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Email Address</Typography>
                            <TextField
                                fullWidth name="email" type="email" placeholder="you@example.com"
                                value={formData.email} onChange={handleChange} required size="medium"
                                InputProps={{ startAdornment: <InputAdornment position="start"><EmailRoundedIcon sx={{ color: '#9CA3AF', fontSize: '1.1rem' }} /></InputAdornment> }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', backgroundColor: '#F9FAFB' } }}
                            />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Password</Typography>
                            <TextField
                                fullWidth name="password" type={showPassword ? 'text' : 'password'}
                                placeholder="Create a strong password"
                                value={formData.password} onChange={handleChange} required size="medium"
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

                        <Button type="submit" fullWidth variant="contained" size="large" disabled={loading}
                            sx={{ mt: 1, py: 1.5, borderRadius: '12px', fontSize: '0.95rem', fontWeight: 700 }}>
                            {loading ? 'Creating account...' : 'Create Account'}
                        </Button>
                    </Box>

                    <Box sx={{ mt: 3, p: 2.5, borderRadius: '12px', background: '#F9FAFB', border: '1px solid #E5E7EB', textAlign: 'center' }}>
                        <Typography sx={{ fontSize: '0.875rem', color: '#6B7280' }}>
                            Already have an account?{' '}
                            <Link to="/login" style={{ color: '#2563EB', fontWeight: 700, textDecoration: 'none' }}>
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default RegisterPage;
