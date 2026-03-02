/**
 * controllers/adminController.js - Admin moderation controller
 * TODO: All actions here should be logged to an AuditLog model (future)
 */

const User = require('../models/User');
const Listing = require('../models/Listing');
const Review = require('../models/Review');

/**
 * @desc   Get all users (paginated, filterable by role)
 * @route  GET /api/admin/users
 * @access Private (admin)
 * TODO: Add analytics summary per user (listing count, enquiry count)
 */
const getAllUsers = async (req, res) => {
    res.status(200).json({ message: 'getAllUsers – not yet implemented' });
};

/**
 * @desc   Ban or unban a user (update isActive flag)
 * @route  PUT /api/admin/users/:id
 * @access Private (admin)
 * TODO: Send automated email notification on ban via emailService
 */
const updateUserStatus = async (req, res) => {
    // TODO: Find user by id, toggle isActive
    res.status(200).json({ message: 'updateUserStatus – not yet implemented' });
};

/**
 * @desc   Get listings pending approval
 * @route  GET /api/admin/listings/pending
 * @access Private (admin)
 * TODO: Analytics: track average time-to-review per admin
 */
const getPendingListings = async (req, res) => {
    // TODO: Find listings where status === 'pending'
    res.status(200).json({ message: 'getPendingListings – not yet implemented' });
};

/**
 * @desc   Approve or reject a listing
 * @route  PUT /api/admin/listings/:id
 * @access Private (admin)
 * TODO: Notify owner via Notification model on status change
 */
const moderateListing = async (req, res) => {
    // TODO: Update listing status to 'approved' or 'rejected'
    // TODO: Create notification for listing owner
    res.status(200).json({ message: 'moderateListing – not yet implemented' });
};

/**
 * @desc   Get flagged reviews for moderation
 * @route  GET /api/admin/reviews/flagged
 * @access Private (admin)
 * TODO: AI content moderation may auto-flag reviews; admin confirms here
 */
const getFlaggedReviews = async (req, res) => {
    // TODO: Find reviews where isFlagged: true
    res.status(200).json({ message: 'getFlaggedReviews – not yet implemented' });
};

module.exports = { getAllUsers, updateUserStatus, getPendingListings, moderateListing, getFlaggedReviews };
