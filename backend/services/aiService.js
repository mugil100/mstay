/**
 * services/aiService.js - AI Recommendation & Roommate Matching Service
 *
 * =====================================================================
 * TODO: AI INTEGRATION POINT
 * This service will be the bridge between MOV Stay and AI/ML models.
 *
 * Planned integrations:
 *  - Listing Recommendations: collaborative filtering or content-based ML model
 *  - Roommate Matching: compatibility scoring using lifestyle preference vectors
 *  - Smart Search Ranking: NLP-based query understanding
 *  - Content Moderation: AI-assisted review/image flagging
 *
 * Suggested tech:
 *  - OpenAI API / Google Gemini for NLP tasks
 *  - Custom Python microservice (FastAPI) for ML models
 *  - Pinecone / Weaviate for vector similarity search
 * =====================================================================
 */

/**
 * getRecommendedListings - Returns AI-ranked listings for a student
 * @param {Object} studentProfile - Student preferences and history
 * @returns {Array} Ranked listing IDs
 * TODO: Implement when AI module is ready
 */
const getRecommendedListings = async (studentProfile) => {
    // PLACEHOLDER
    throw new Error('AI recommendation service not yet implemented');
};

/**
 * getRoommateMatches - Returns compatible roommate profiles
 * @param {Object} roommateProfile - Student's RoommateProfile document
 * @returns {Array} Ranked student IDs by compatibility score
 * TODO: Use cosine similarity on preference vectors
 */
const getRoommateMatches = async (roommateProfile) => {
    // PLACEHOLDER
    throw new Error('Roommate matching AI service not yet implemented');
};

module.exports = { getRecommendedListings, getRoommateMatches };
