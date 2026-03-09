import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PgListingPage />} />
          <Route path="rooms" element={<RoomDetailsPage />} />
          <Route path="availability" element={<AvailabilityUpdatesPage />} />
          <Route path="visualizations" element={<VisualizationsPage />} />
          <Route path="owner/dashboard" element={<OwnerDashboard />} />
          <Route path="owner/add-pg" element={<AddPgPage />} />
          <Route path="owner/manage-pgs" element={<ManagePgsPage />} />
          <Route path="owner/edit-pg/:id" element={<EditPgPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
