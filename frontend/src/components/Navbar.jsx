/**
 * src/components/Navbar.jsx - Top navigation bar
 * Shows different links based on user role.
 * TODO: Add mobile hamburger menu for responsive design.
 */

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, role, logout, user } = useAuth();

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                MOV Stay
            </Link>

            <div className="navbar-links">
                <Link to="/listings">Browse</Link>

                {!isAuthenticated && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}

                {isAuthenticated && role === 'student' && (
                    <Link to="/student/dashboard">Dashboard</Link>
                )}
                {isAuthenticated && role === 'owner' && (
                    <Link to="/owner/dashboard">Dashboard</Link>
                )}
                {isAuthenticated && role === 'admin' && (
                    <Link to="/admin/dashboard">Dashboard</Link>
                )}

                {isAuthenticated && (
                    <>
                        <Link to="/profile">Profile</Link>
                        <button onClick={logout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
