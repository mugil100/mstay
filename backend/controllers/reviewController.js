/**
 * controllers/reviewController.js - Review controller
 */

const Review = require('../models/Review');
const Listing = require('../models/Listing');

/**
 * @desc   Student creates a review for a listing
 * @route  POST /api/reviews
 * @access Private (student)
 * TODO: Verify student has an accepted/completed booking for this listing
 */
const createReview = async (req, res) => {
    // TODO: Create Review document
    // TODO: Recompute listing.averageRating and listing.reviewCount (aggregation)
    res.status(201).json({ message: 'createReview – not yet implemented' });
};

/**
 * @desc   Get all reviews for a specific listing (paginated)
 * @route  GET /api/reviews/:listingId
 * @access Public
 * TODO: Analytics module will read this data to compute trust scores
 */
const getReviewsByListing = async (req, res) => {
    // TODO: Find reviews by listing, sort by createdAt desc, paginate
    res.status(200).json({ message: 'getReviewsByListing – not yet implemented' });
};

/**
 * @desc   Delete a review (owner of review or admin)
 * @route  DELETE /api/reviews/:id
 * @access Private (student | admin)
 * TODO: Admin moderation: admins can delete any flagged review
 */
const deleteReview = async (req, res) => {
    // TODO: Verify ownership or admin role
    // TODO: Recompute listing.averageRating after deletion
    res.status(200).json({ message: 'deleteReview – not yet implemented' });
};

module.exports = { createReview, getReviewsByListing, deleteReview };
