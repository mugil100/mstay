/**
 * src/pages/RegisterPage.jsx - Registration page
 * User selects role (student / owner) during registration.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
    const [error, setError] = useState('');

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // TODO: Call authService.register(form) → store token → redirect to login
            await authService.register(form);
            navigate('/login');
        } catch (err) {
            setError(err?.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Create an Account</h1>

                {error && <p className="error-msg">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <label>Full Name</label>
                    <input name="name" value={form.name} onChange={handleChange} required />

                    <label>Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required />

                    <label>Password</label>
                    <input name="password" type="password" value={form.password} onChange={handleChange} required />

                    <label>I am a...</label>
                    <select name="role" value={form.role} onChange={handleChange}>
                        <option value="student">Student</option>
                        <option value="owner">PG / Hostel Owner</option>
                    </select>

                    <button type="submit">Register</button>
                </form>

                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default RegisterPage;
