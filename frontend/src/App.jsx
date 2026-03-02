import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PgListingPage from './pages/PgListingPage';
import RoomDetailsPage from './pages/RoomDetailsPage';
import AvailabilityUpdatesPage from './pages/AvailabilityUpdatesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PgListingPage />} />
          <Route path="rooms" element={<RoomDetailsPage />} />
          <Route path="availability" element={<AvailabilityUpdatesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
