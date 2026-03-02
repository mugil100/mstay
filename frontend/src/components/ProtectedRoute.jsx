/**
 * src/components/ProtectedRoute.jsx - Role-based route guard
 *
 * Usage in router:
 *   <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
 *     <Route path="/admin" element={<AdminDashboard />} />
 *   </Route>
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * @param {string[]} allowedRoles - If empty, any authenticated user is allowed
 */
const ProtectedRoute = ({ allowedRoles = [] }) => {
    const { isAuthenticated, role, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        // Redirect unauthorized role to their own dashboard
        const dashboardMap = {
            student: '/student/dashboard',
            owner: '/owner/dashboard',
            admin: '/admin/dashboard',
        };
        return <Navigate to={dashboardMap[role] || '/listings'} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
