/**
 * controllers/listingController.js - Listing CRUD controller
 */

const Listing = require('../models/Listing');

/**
 * @desc   Get all listings with search & filter
 * @route  GET /api/listings
 * @access Public
 * TODO: Parse query params: city, type, rent range, amenities, genderAllowed
 * TODO: Implement pagination (page, limit)
 * TODO: Add full-text search on title/description
 * TODO: AI recommendation service will inject personalised scores here
 */
const getAllListings = async (req, res) => {
    res.status(200).json({ message: 'getAllListings – not yet implemented' });
};

/**
 * @desc   Get single listing by ID  (increments view count)
 * @route  GET /api/listings/:id
 * @access Public
 */
const getListingById = async (req, res) => {
    // TODO: Find listing by req.params.id, populate owner name/phone
    // TODO: Increment listing.views
    res.status(200).json({ message: 'getListingById – not yet implemented' });
};

/**
 * @desc   Create new listing (owner only)
 * @route  POST /api/listings
 * @access Private (owner)
 */
const createListing = async (req, res) => {
    // TODO: Validate body with validator utility
    // TODO: Set listing.owner = req.user._id
    // TODO: Set status = 'pending' (awaits admin approval)
    // TODO: Save and return new listing
    res.status(201).json({ message: 'createListing – not yet implemented' });
};

/**
 * @desc   Update listing (owner only – must own the listing)
 * @route  PUT /api/listings/:id
 * @access Private (owner)
 */
const updateListing = async (req, res) => {
    // TODO: Verify req.user._id === listing.owner
    // TODO: Apply allowed field updates
    // TODO: Reset status to 'pending' if key fields changed (admin re-approval)
    res.status(200).json({ message: 'updateListing – not yet implemented' });
};

/**
 * @desc   Delete listing (owner or admin)
 * @route  DELETE /api/listings/:id
 * @access Private (owner | admin)
 */
const deleteListing = async (req, res) => {
    // TODO: Verify ownership or admin role
    // TODO: Soft delete preferred (set isActive: false)
    res.status(200).json({ message: 'deleteListing – not yet implemented' });
};

/**
 * @desc   Get owner's own listings
 * @route  GET /api/listings/my
 * @access Private (owner)
 */
const getMyListings = async (req, res) => {
    // TODO: Find listings where owner === req.user._id
    res.status(200).json({ message: 'getMyListings – not yet implemented' });
};

module.exports = { getAllListings, getListingById, createListing, updateListing, deleteListing, getMyListings };
