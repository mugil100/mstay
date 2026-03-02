/**
 * routes/listingRoutes.js - Listing CRUD + search routes
 * GET    /api/listings          - Search & filter all listings (public)
 * GET    /api/listings/:id      - Get single listing (public)
 * POST   /api/listings          - Create listing (owner only)
 * PUT    /api/listings/:id      - Update listing (owner only)
 * DELETE /api/listings/:id      - Delete listing (owner only)
 * GET    /api/listings/my       - Get owner's own listings
 */

const express = require('express');
const router = express.Router();
const {
    getAllListings,
    getListingById,
    createListing,
    updateListing,
    deleteListing,
    getMyListings,
} = require('../controllers/listingController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', getAllListings);
router.get('/my', protect, authorize('owner'), getMyListings);
router.get('/:id', getListingById);
router.post('/', protect, authorize('owner'), createListing);
router.put('/:id', protect, authorize('owner'), updateListing);
router.delete('/:id', protect, authorize('owner', 'admin'), deleteListing);

module.exports = router;
