/**
 * src/pages/AdminDashboard.jsx - Admin moderation and platform overview
 *
 * TODO: Fetch data from:
 *   - GET /api/admin/listings/pending
 *   - GET /api/admin/reviews/flagged
 *   - GET /api/reports/platform
 *   - GET /api/admin/users
 *
 * TODO: Analytics module: charts for signups, listings, enquiries over time
 */

const AdminDashboard = () => {
    return (
        <div className="dashboard-page">
            <h1>Admin Dashboard</h1>

            <div className="dashboard-stats-row">
                {/* TODO: Pull from reportService.getPlatformReport() */}
                <div className="stat-card"><h3>Total Users</h3><p className="stat-value">—</p></div>
                <div className="stat-card"><h3>Active Listings</h3><p className="stat-value">—</p></div>
                <div className="stat-card"><h3>Pending Listings</h3><p className="stat-value">—</p></div>
                <div className="stat-card"><h3>Flagged Reviews</h3><p className="stat-value">—</p></div>
            </div>

            <section className="dashboard-section">
                <h2>Listings Awaiting Approval</h2>
                {/* TODO: Render pending listings with approve/reject actions */}
                {/* TODO: Admin moderation logic integrates here */}
                <p className="placeholder">Pending listings will appear here.</p>
            </section>

            <section className="dashboard-section">
                <h2>Flagged Reviews</h2>
                {/* TODO: Display flagged reviews with moderate/delete actions */}
                <p className="placeholder">Flagged reviews will appear here.</p>
            </section>

            <section className="dashboard-section">
                <h2>User Management</h2>
                {/* TODO: Table of users with ban/unban controls */}
                <p className="placeholder">User list will appear here.</p>
            </section>

            {/* TODO: Analytics charts section – integrate Chart.js or Recharts */}
        </div>
    );
};

export default AdminDashboard;
