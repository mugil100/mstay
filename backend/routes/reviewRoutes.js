/**
 * routes/reviewRoutes.js - Review routes
 * POST   /api/reviews          - Student adds review
 * GET    /api/reviews/:listing - Get all reviews for a listing
 * DELETE /api/reviews/:id      - Student/admin deletes review
 */

const express = require('express');
const router = express.Router();
const {
    createReview,
    getReviewsByListing,
    deleteReview,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post('/', protect, authorize('student'), createReview);
router.get('/:listingId', getReviewsByListing);
router.delete('/:id', protect, authorize('student', 'admin'), deleteReview);

module.exports = router;
