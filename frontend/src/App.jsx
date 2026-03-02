import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PgListingPage from './pages/PgListingPage';
import RoomDetailsPage from './pages/RoomDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PgListingPage />} />
          <Route path="rooms" element={<RoomDetailsPage />} />
          <Route path="availability" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
