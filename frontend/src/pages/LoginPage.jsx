import React, { useState, useContext } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, IconButton, Alert, Divider } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const stats = [
    { icon: <HomeWorkRoundedIcon sx={{ fontSize: 20 }} />, label: 'PGs Listed', value: '2,400+' },
    { icon: <PeopleRoundedIcon sx={{ fontSize: 20 }} />, label: 'Happy Tenants', value: '18,000+' },
    { icon: <LocationOnRoundedIcon sx={{ fontSize: 20 }} />, label: 'Cities', value: '12' },
    { icon: <StarRoundedIcon sx={{ fontSize: 20 }} />, label: 'Avg Rating', value: '4.8★' },
];

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
        <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
);

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await api.post('/auth/login', credentials);
            login(response.data.user, response.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Redirect to backend Google OAuth endpoint
        window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`;
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
            {/* Left Panel — Brand */}
            <Box sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '55%',
                background: 'linear-gradient(145deg, #1E40AF 0%, #2563EB 40%, #14B8A6 100%)',
                p: 5,
                position: 'relative',
                overflow: 'hidden',
            }}>
                <Box sx={{ position: 'absolute', top: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                <Box sx={{ position: 'absolute', bottom: -100, right: -60, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                <Box sx={{ position: 'absolute', top: '40%', right: 60, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

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
                        <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                            MOV Stay
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                            MATCH • OPTIMIZE • VERIFY
                        </Typography>
                    </Box>
                </Box>

                {/* Center content */}
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ mb: 5, display: 'flex', justifyContent: 'center' }}>
                        <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0" y="170" width="280" height="6" rx="3" fill="rgba(255,255,255,0.2)" />
                            <rect x="100" y="60" width="80" height="112" rx="6" fill="rgba(255,255,255,0.18)" />
                            <rect x="112" y="74" width="14" height="14" rx="3" fill="rgba(255,255,255,0.4)" />
                            <rect x="134" y="74" width="14" height="14" rx="3" fill="rgba(255,255,255,0.4)" />
                            <rect x="154" y="74" width="14" height="14" rx="3" fill="rgba(255,255,255,0.25)" />
                            <rect x="112" y="98" width="14" height="14" rx="3" fill="rgba(255,255,255,0.25)" />
                            <rect x="134" y="98" width="14" height="14" rx="3" fill="rgba(255,255,255,0.4)" />
                            <rect x="154" y="98" width="14" height="14" rx="3" fill="rgba(255,255,255,0.4)" />
                            <rect x="112" y="122" width="14" height="14" rx="3" fill="rgba(255,255,255,0.4)" />
                            <rect x="134" y="122" width="14" height="14" rx="3" fill="rgba(255,255,255,0.25)" />
                            <rect x="154" y="122" width="14" height="14" rx="3" fill="rgba(255,255,255,0.4)" />
                            <polygon points="98,62 140,30 182,62" fill="rgba(255,255,255,0.3)" />
                            <rect x="30" y="100" width="56" height="72" rx="5" fill="rgba(255,255,255,0.12)" />
                            <rect x="42" y="112" width="10" height="10" rx="2" fill="rgba(255,255,255,0.3)" />
                            <rect x="58" y="112" width="10" height="10" rx="2" fill="rgba(255,255,255,0.3)" />
                            <rect x="42" y="130" width="10" height="10" rx="2" fill="rgba(255,255,255,0.2)" />
                            <rect x="58" y="130" width="10" height="10" rx="2" fill="rgba(255,255,255,0.3)" />
                            <rect x="194" y="90" width="56" height="82" rx="5" fill="rgba(255,255,255,0.13)" />
                            <rect x="206" y="104" width="10" height="10" rx="2" fill="rgba(255,255,255,0.3)" />
                            <rect x="222" y="104" width="10" height="10" rx="2" fill="rgba(255,255,255,0.2)" />
                            <rect x="206" y="122" width="10" height="10" rx="2" fill="rgba(255,255,255,0.3)" />
                            <rect x="222" y="122" width="10" height="10" rx="2" fill="rgba(255,255,255,0.3)" />
                            <circle cx="60" cy="30" r="2" fill="rgba(255,255,255,0.5)" />
                            <circle cx="220" cy="20" r="3" fill="rgba(255,255,255,0.4)" />
                        </svg>
                    </Box>

                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '2.2rem', lineHeight: 1.2, mb: 1.5 }}>
                        Manage Your PGs<br />Like a Pro
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: 380 }}>
                        Your all-in-one platform for PG & hostel management. Track occupancy, manage rooms, and grow your portfolio effortlessly.
                    </Typography>
                </Box>

                {/* Stats */}
                <Box sx={{ display: 'flex', gap: 3, position: 'relative', zIndex: 1 }}>
                    {stats.map((s) => (
                        <Box key={s.label} sx={{
                            flex: 1, p: 1.5, borderRadius: '12px',
                            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,255,255,0.18)', textAlign: 'center'
                        }}>
                            <Box sx={{ color: 'rgba(255,255,255,0.8)', mb: 0.5 }}>{s.icon}</Box>
                            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem' }}>{s.value}</Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.68rem', fontWeight: 500 }}>{s.label}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Right Panel — Form */}
            <Box sx={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                flex: 1, p: { xs: 3, md: 6 }, backgroundColor: '#fff',
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
                        Welcome back 👋
                    </Typography>
                    <Typography sx={{ color: '#6B7280', fontSize: '0.9rem', mb: 4 }}>
                        Sign in to your PG owner dashboard
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }}>{error}</Alert>}

                    {/* Google Sign-In Button */}
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleGoogleLogin}
                        startIcon={<GoogleIcon />}
                        sx={{
                            mb: 3, py: 1.4, borderRadius: '12px',
                            borderColor: '#E5E7EB', color: '#374151',
                            backgroundColor: '#fff', fontWeight: 600, fontSize: '0.9rem',
                            textTransform: 'none',
                            '&:hover': { borderColor: '#D1D5DB', backgroundColor: '#F9FAFB' },
                            gap: 1,
                        }}
                    >
                        Continue with Google
                    </Button>

                    {/* Divider */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Divider sx={{ flex: 1, borderColor: '#E5E7EB' }} />
                        <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF', fontWeight: 500 }}>or sign in with email</Typography>
                        <Divider sx={{ flex: 1, borderColor: '#E5E7EB' }} />
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <Box>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Email Address</Typography>
                            <TextField
                                fullWidth name="email" type="email" placeholder="you@example.com"
                                value={credentials.email} onChange={handleChange} required size="medium"
                                InputProps={{ startAdornment: <InputAdornment position="start"><EmailRoundedIcon sx={{ color: '#9CA3AF', fontSize: '1.1rem' }} /></InputAdornment> }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', backgroundColor: '#F9FAFB' } }}
                            />
                        </Box>

                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>Password</Typography>
                                <Link to="/forgot-password" style={{ color: '#2563EB', fontWeight: 700, textDecoration: 'none', fontSize: '0.75rem' }}>
                                    Forgot password?
                                </Link>
                            </Box>
                            <TextField
                                fullWidth name="password" type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password" value={credentials.password}
                                onChange={handleChange} required size="medium"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><LockRoundedIcon sx={{ color: '#9CA3AF', fontSize: '1.1rem' }} /></InputAdornment>,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                                                {showPassword
                                                    ? <VisibilityOffRoundedIcon sx={{ fontSize: '1.1rem', color: '#9CA3AF' }} />
                                                    : <VisibilityRoundedIcon sx={{ fontSize: '1.1rem', color: '#9CA3AF' }} />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', backgroundColor: '#F9FAFB' } }}
                            />
                        </Box>

                        <Button type="submit" fullWidth variant="contained" size="large" disabled={loading}
                            sx={{ mt: 1, py: 1.5, borderRadius: '12px', fontSize: '0.95rem', fontWeight: 700 }}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </Box>

                    <Box sx={{ mt: 3, p: 2.5, borderRadius: '12px', background: '#F9FAFB', border: '1px solid #E5E7EB', textAlign: 'center' }}>
                        <Typography sx={{ fontSize: '0.875rem', color: '#6B7280' }}>
                            Don't have an account?{' '}
                            <Link to="/register" style={{ color: '#2563EB', fontWeight: 700, textDecoration: 'none' }}>
                                Create account
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPage;
