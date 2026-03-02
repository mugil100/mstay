/**
 * src/layouts/DashboardLayout.jsx - Authenticated dashboard layout (Sidebar + Outlet)
 */

import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => (
    <div className="dashboard-layout">
        <Navbar />
        <div className="dashboard-body">
            <Sidebar />
            <main className="dashboard-content">
                <Outlet />
            </main>
        </div>
    </div>
);

export default DashboardLayout;
