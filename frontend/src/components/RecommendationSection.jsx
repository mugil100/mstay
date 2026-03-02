/**
 * src/components/RecommendationSection.jsx - AI listing recommendation panel
 *
 * TODO: AI Integration Point
 *   - Call GET /api/roommate/matches (or a dedicated /api/recommendations endpoint)
 *   - Backend aiService.getRecommendedListings(studentProfile) returns ranked IDs
 *   - Display top N recommended ListingCards in a horizontal scroll or grid
 *   - Log user interactions (clicks, saves) to improve the ML model over time
 *   - Show a "Why this listing?" explanation chip (XAI – explainable AI)
 */

import ListingCard from './ListingCard';

const RecommendationSection = () => {
    // TODO: Replace with real recommendations from AI service
    const recommendations = []; // Will be populated once AI module is active

    return (
        <section className="recommendation-section">
            <h2>✨ Recommended For You</h2>
            {recommendations.length === 0 ? (
                <p className="placeholder-text">
                    AI-powered recommendations will appear here once your profile is complete.
                </p>
            ) : (
                <div className="recommendation-grid">
                    {recommendations.map((listing) => (
                        <ListingCard key={listing._id} listing={listing} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default RecommendationSection;
