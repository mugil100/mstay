import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PgListingPage from './pages/PgListingPage';
import RoomDetailsPage from './pages/RoomDetailsPage';
import AvailabilityUpdatesPage from './pages/AvailabilityUpdatesPage';
import VisualizationsPage from './pages/VisualizationsPage';
import OwnerDashboard from './pages/OwnerDashboard';
import AddPgPage from './pages/AddPgPage';
import ManagePgsPage from './pages/ManagePgsPage';
import EditPgPage from './pages/EditPgPage';

// A simple component to redirect users based on their role
const RoleBasedRedirect = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === 'student') return <Navigate to="/student/dashboard" replace />;
  if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  // Default to owner dashboard for 'owner' or unknown roles
  return <Navigate to="/owner/dashboard" replace />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<RoleBasedRedirect />} />
            
            {/* Owner Routes */}
            <Route path="owner/dashboard" element={<OwnerDashboard />} />
            <Route path="rooms" element={<RoomDetailsPage />} />
            <Route path="availability" element={<AvailabilityUpdatesPage />} />
            <Route path="visualizations" element={<VisualizationsPage />} />
            <Route path="owner/add-pg" element={<AddPgPage />} />
            <Route path="owner/manage-pgs" element={<ManagePgsPage />} />
            <Route path="owner/edit-pg/:id" element={<EditPgPage />} />

            {/* Placeholder for Student Dashboard */}
            <Route path="student/dashboard" element={<div>Student Dashboard (Coming Soon)</div>} />
            
            {/* Placeholder for Admin Dashboard */}
            <Route path="admin/dashboard" element={<div>Admin Dashboard (Coming Soon)</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
