import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PgListingPage from './pages/PgListingPage';
import RoomDetailsPage from './pages/RoomDetailsPage';
import AvailabilityUpdatesPage from './pages/AvailabilityUpdatesPage';
import VisualizationsPage from './pages/VisualizationsPage';
import OwnerDashboard from './pages/OwnerDashboard';
import AddPgPage from './pages/AddPgPage';
import ManagePgsPage from './pages/ManagePgsPage';
import EditPgPage from './pages/EditPgPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<OwnerDashboard />} />
            <Route path="rooms" element={<RoomDetailsPage />} />
            <Route path="availability" element={<AvailabilityUpdatesPage />} />
            <Route path="visualizations" element={<VisualizationsPage />} />
            <Route path="owner/add-pg" element={<AddPgPage />} />
            <Route path="owner/manage-pgs" element={<ManagePgsPage />} />
            <Route path="owner/edit-pg/:id" element={<EditPgPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
