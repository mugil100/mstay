/**
 * routes/roommateRoutes.js - Roommate matching routes
 * POST /api/roommate/profile    - Create/update roommate profile
 * GET  /api/roommate/profile    - Get own profile
 * GET  /api/roommate/matches    - Get AI-suggested roommate matches (AI placeholder)
 * GET  /api/roommate/browse     - Browse all visible profiles
 */

const express = require('express');
const router = express.Router();
const {
    createOrUpdateProfile,
    getMyProfile,
    getRoommateMatches,
    browseProfiles,
} = require('../controllers/roommateController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post('/profile', protect, authorize('student'), createOrUpdateProfile);
router.get('/profile', protect, authorize('student'), getMyProfile);
// TODO: /matches will call aiService.getRoommateMatches() once AI module is ready
router.get('/matches', protect, authorize('student'), getRoommateMatches);
router.get('/browse', protect, browseProfiles);

module.exports = router;
