/**
 * src/pages/OwnerDashboard.jsx - Owner-specific dashboard
 * Shows listing stats, pending enquiries, and occupancy overview.
 *
 * TODO: Fetch data from:
 *   - GET /api/listings/my
 *   - GET /api/enquiries/received
 *   - GET /api/reports/owner
 */

import { Link } from 'react-router-dom';

const OwnerDashboard = () => {
    return (
        <div className="dashboard-page">
            <h1>Owner Dashboard</h1>

            <div className="dashboard-stats-row">
                {/* TODO: Replace with real data from reportService.getOwnerReport() */}
                <div className="stat-card">
                    <h3>Total Listings</h3>
                    <p className="stat-value">—</p>
                </div>
                <div className="stat-card">
                    <h3>Pending Enquiries</h3>
                    <p className="stat-value">—</p>
                </div>
                <div className="stat-card">
                    <h3>Avg. Occupancy</h3>
                    <p className="stat-value">—</p>
                </div>
                <div className="stat-card">
                    <h3>Avg. Rating</h3>
                    <p className="stat-value">—</p>
                </div>
            </div>

            <section className="dashboard-section">
                <div className="section-header">
                    <h2>My Listings</h2>
                    <Link to="/owner/listings/add" className="btn-primary">+ Add Listing</Link>
                </div>
                {/* TODO: Render listing cards with edit/delete actions */}
                <p className="placeholder">Your listings will appear here.</p>
            </section>

            <section className="dashboard-section">
                <h2>Recent Enquiries</h2>
                {/* TODO: Render enquiry items with respond action */}
                <p className="placeholder">Enquiries will appear here.</p>
            </section>
        </div>
    );
};

export default OwnerDashboard;
