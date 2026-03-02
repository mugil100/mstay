/**
 * controllers/enquiryController.js - Enquiry controller
 */

const Enquiry = require('../models/Enquiry');

/**
 * @desc   Student submits an enquiry for a listing
 * @route  POST /api/enquiries
 * @access Private (student)
 */
const createEnquiry = async (req, res) => {
    // TODO: Validate listing exists and is available
    // TODO: Create Enquiry with student = req.user._id
    // TODO: Notify listing owner via Notification model / emailService
    // TODO: Optionally create a Chat thread (chatThreadId)
    res.status(201).json({ message: 'createEnquiry – not yet implemented' });
};

/**
 * @desc   Student views their own enquiries
 * @route  GET /api/enquiries/my
 * @access Private (student)
 */
const getMyEnquiries = async (req, res) => {
    // TODO: Find all enquiries where student === req.user._id, populate listing
    res.status(200).json({ message: 'getMyEnquiries – not yet implemented' });
};

/**
 * @desc   Owner views enquiries received on their listings
 * @route  GET /api/enquiries/received
 * @access Private (owner)
 */
const getReceivedEnquiries = async (req, res) => {
    // TODO: Find enquiries where listing.owner === req.user._id
    res.status(200).json({ message: 'getReceivedEnquiries – not yet implemented' });
};

/**
 * @desc   Owner responds to an enquiry (updates status)
 * @route  PUT /api/enquiries/:id
 * @access Private (owner)
 */
const respondToEnquiry = async (req, res) => {
    // TODO: Update enquiry status to 'responded'
    // TODO: Notify student via Notification model
    res.status(200).json({ message: 'respondToEnquiry – not yet implemented' });
};

module.exports = { createEnquiry, getMyEnquiries, getReceivedEnquiries, respondToEnquiry };
