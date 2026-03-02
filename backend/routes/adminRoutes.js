/**
 * routes/adminRoutes.js - Admin moderation and management routes
 * All routes require role: admin
 * GET  /api/admin/users            - List all users
 * PUT  /api/admin/users/:id        - Update user status (ban/unban)
 * GET  /api/admin/listings/pending - Listings awaiting approval
 * PUT  /api/admin/listings/:id     - Approve or reject a listing
 * GET  /api/admin/reviews/flagged  - Flagged review list
 * TODO: Add admin analytics endpoints as analytics module is built
 */

const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    updateUserStatus,
    getPendingListings,
    moderateListing,
    getFlaggedReviews,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// All admin routes are protected and restricted to admin role
router.use(protect, authorize('admin'));

router.get('/users', getAllUsers);
router.put('/users/:id', updateUserStatus);
router.get('/listings/pending', getPendingListings);
router.put('/listings/:id', moderateListing);
router.get('/reviews/flagged', getFlaggedReviews);

module.exports = router;
