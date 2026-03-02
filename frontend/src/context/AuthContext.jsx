/**
 * src/context/AuthContext.jsx - Global authentication state
 * Provides user, login, logout, and role information across the app.
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // On mount, restore session from localStorage if token exists
    useEffect(() => {
        const token = localStorage.getItem('movstay_token');
        if (token) {
            // TODO: Validate token with GET /api/auth/me, set user
            // authService.getMe().then(setUser).finally(() => setLoading(false));
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        // TODO: Call authService.login(credentials), store token, set user
        throw new Error('login – not yet implemented');
    };

    const logout = () => {
        localStorage.removeItem('movstay_token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        role: user?.role || null, // 'student' | 'owner' | 'admin'
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/** useAuth - Custom hook to consume auth context */
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
};
