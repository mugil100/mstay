import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PgListingPage from './pages/PgListingPage';
import RoomDetailsPage from './pages/RoomDetailsPage';
import AvailabilityUpdatesPage from './pages/AvailabilityUpdatesPage';
import VisualizationsPage from './pages/VisualizationsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PgListingPage />} />
          <Route path="rooms" element={<RoomDetailsPage />} />
          <Route path="availability" element={<AvailabilityUpdatesPage />} />
          <Route path="visualizations" element={<VisualizationsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
