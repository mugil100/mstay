/**
 * src/pages/ReportsPage.jsx - Analytics & reports page (role-aware)
 * Fetches different report data based on user role.
 *
 * TODO: Replace placeholder stats with real charts (Recharts / Chart.js)
 * TODO: Analytics module integration point
 */

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { reportService } from '../services/reportService';

const ReportsPage = () => {
    const { role } = useAuth();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                // TODO: Call the appropriate report endpoint by role
                let res;
                if (role === 'admin') res = await reportService.getPlatformReport();
                else if (role === 'owner') res = await reportService.getOwnerReport();
                else res = await reportService.getStudentReport();
                setReport(res.data);
            } catch (err) {
                console.error('Report fetch failed', err);
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [role]);

    return (
        <div className="reports-page">
            <h1>Reports & Analytics</h1>
            {loading && <p>Loading report data...</p>}

            {/* TODO: Render charts and stat grids based on report data */}
            {/* Suggested charts:
            - Platform: Line chart (signups over time), Bar chart (listings by city)
            - Owner: Occupancy rate, Views vs Enquiries funnel
            - Student: Listings viewed, Enquiry status pie chart        */}

            <p className="placeholder">
                [Report charts and data will render here for role: <strong>{role}</strong>]
            </p>
        </div>
    );
};

export default ReportsPage;
