/**
 * src/routes/AppRouter.jsx - Central router with role-based protection
 * Uses React Router v6 layout routes.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Layouts
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Auth Pages
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

// Shared Pages
import ListingsPage from '../pages/ListingsPage';
import ListingDetailsPage from '../pages/ListingDetailsPage';
import ProfilePage from '../pages/ProfilePage';

// Role-specific dashboards
import StudentDashboard from '../pages/StudentDashboard';
import OwnerDashboard from '../pages/OwnerDashboard';
import AdminDashboard from '../pages/AdminDashboard';

// Owner Pages
import AddListingPage from '../pages/AddListingPage';

// Reports
import ReportsPage from '../pages/ReportsPage';

// Guards
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter = () => {
    const { user } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                {/* ─── Public Routes ──────────────────────────────────────── */}
                <Route element={<MainLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/listings" element={<ListingsPage />} />
                    <Route path="/listings/:id" element={<ListingDetailsPage />} />
                </Route>

                {/* ─── Protected Routes – Any authenticated user ──────────── */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                </Route>

                {/* ─── Protected Routes – Student ─────────────────────────── */}
                <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/student/dashboard" element={<StudentDashboard />} />
                        <Route path="/student/reports" element={<ReportsPage />} />
                    </Route>
                </Route>

                {/* ─── Protected Routes – Owner ───────────────────────────── */}
                <Route element={<ProtectedRoute allowedRoles={['owner']} />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
                        <Route path="/owner/listings/add" element={<AddListingPage />} />
                        <Route path="/owner/reports" element={<ReportsPage />} />
                    </Route>
                </Route>

                {/* ─── Protected Routes – Admin ───────────────────────────── */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/reports" element={<ReportsPage />} />
                    </Route>
                </Route>

                {/* ─── Default Redirect ───────────────────────────────────── */}
                <Route path="/" element={<Navigate to="/listings" replace />} />
                <Route path="*" element={<Navigate to="/listings" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
