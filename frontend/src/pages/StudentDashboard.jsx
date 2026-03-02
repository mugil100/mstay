/**
 * src/pages/StudentDashboard.jsx - Student-specific dashboard
 * Shows recent enquiries, saved listings, and AI recommendations.
 *
 * TODO: Fetch data from:
 *   - GET /api/enquiries/my
 *   - GET /api/reports/student
 *   - GET /api/roommate/matches (AI) - once AI module is ready
 */

import RecommendationSection from '../components/RecommendationSection';
import ChatBox from '../components/ChatBox';

const StudentDashboard = () => {
    return (
        <div className="dashboard-page">
            <h1>Student Dashboard</h1>

            <section className="dashboard-section">
                <h2>AI Recommendations</h2>
                {/* TODO: Integrate with AI recommendation service */}
                <RecommendationSection />
            </section>

            <section className="dashboard-section">
                <h2>My Enquiries</h2>
                {/* TODO: Fetch and display enquiry list with status */}
                <p className="placeholder">Enquiries will appear here.</p>
            </section>

            <section className="dashboard-section">
                <h2>Roommate Matches</h2>
                {/* TODO: Display AI-matched roommates once AI module is active */}
                <p className="placeholder">Roommate suggestions will appear here.</p>
            </section>

            <section className="dashboard-section">
                <h2>Messages</h2>
                {/* TODO: Wire to real chat thread list */}
                <ChatBox />
            </section>
        </div>
    );
};

export default StudentDashboard;
