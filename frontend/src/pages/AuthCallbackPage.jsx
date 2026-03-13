import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

/**
 * This page handles the redirect from the backend after Google OAuth.
 * URL format: /auth/callback?token=<JWT>&user=<encoded JSON>
 */
const AuthCallbackPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        const token = searchParams.get('token');
        const userParam = searchParams.get('user');

        if (token && userParam) {
            try {
                const user = JSON.parse(decodeURIComponent(userParam));
                login(user, token);
                navigate('/', { replace: true });
            } catch (err) {
                console.error('OAuth callback error:', err);
                navigate('/login?error=oauth_failed', { replace: true });
            }
        } else {
            navigate('/login?error=no_token', { replace: true });
        }
    }, []);

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            height: '100vh', gap: 2,
            background: 'linear-gradient(145deg, #1E40AF 0%, #2563EB 50%, #14B8A6 100%)',
        }}>
            <CircularProgress sx={{ color: '#fff' }} size={44} />
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>
                Signing you in with Google...
            </Typography>
        </Box>
    );
};

export default AuthCallbackPage;
