/**
 * src/layouts/MainLayout.jsx - Public-facing layout (Navbar + Outlet)
 */

import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => (
    <div className="main-layout">
        <Navbar />
        <main className="main-content">
            <Outlet />
        </main>
    </div>
);

export default MainLayout;
