/**
 * src/pages/LoginPage.jsx - Login page for all roles (student / owner / admin)
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // TODO: Call login() from AuthContext → triggers authService.login()
            // After login, redirect based on user.role
            await login(form);
            navigate('/listings');
        } catch (err) {
            setError(err?.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Welcome to MOV Stay</h1>
                <p>Match · Optimize · Verify</p>

                {error && <p className="error-msg">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required />

                    <label>Password</label>
                    <input name="password" type="password" value={form.password} onChange={handleChange} required />

                    <button type="submit">Login</button>
                </form>

                <p>New here? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};

export default LoginPage;
