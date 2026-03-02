/**
 * src/components/Sidebar.jsx - Dashboard sidebar navigation
 * Links change depending on user role.
 */

import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const studentLinks = [
    { label: 'Dashboard', to: '/student/dashboard' },
    { label: 'Browse Listings', to: '/listings' },
    { label: 'Roommate Finder', to: '/student/roommate' },
    { label: 'My Enquiries', to: '/student/enquiries' },
    { label: 'Reports', to: '/student/reports' },
];

const ownerLinks = [
    { label: 'Dashboard', to: '/owner/dashboard' },
    { label: 'My Listings', to: '/owner/listings' },
    { label: 'Add Listing', to: '/owner/listings/add' },
    { label: 'Enquiries', to: '/owner/enquiries' },
    { label: 'Reports', to: '/owner/reports' },
];

const adminLinks = [
    { label: 'Dashboard', to: '/admin/dashboard' },
    { label: 'Users', to: '/admin/users' },
    { label: 'Listings', to: '/admin/listings' },
    { label: 'Reviews', to: '/admin/reviews' },
    { label: 'Reports', to: '/admin/reports' },
];

const linkMap = { student: studentLinks, owner: ownerLinks, admin: adminLinks };

const Sidebar = () => {
    const { role } = useAuth();
    const links = linkMap[role] || [];

    return (
        <aside className="sidebar">
            <ul>
                {links.map((link) => (
                    <li key={link.to}>
                        <NavLink to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
