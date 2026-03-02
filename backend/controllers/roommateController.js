/**
 * controllers/roommateController.js - Roommate matching controller
 * TODO: AI roommate compatibility scoring will be integrated via aiService
 */

const RoommateProfile = require('../models/RoommateProfile');

/**
 * @desc   Create or update student's roommate profile
 * @route  POST /api/roommate/profile
 * @access Private (student)
 */
const createOrUpdateProfile = async (req, res) => {
    // TODO: Upsert RoommateProfile for req.user._id
    res.status(200).json({ message: 'createOrUpdateProfile – not yet implemented' });
};

/**
 * @desc   Get own roommate profile
 * @route  GET /api/roommate/profile
 * @access Private (student)
 */
const getMyProfile = async (req, res) => {
    // TODO: Find RoommateProfile by student === req.user._id
    res.status(200).json({ message: 'getMyProfile – not yet implemented' });
};

/**
 * @desc   Get AI-powered roommate matches for current student
 * @route  GET /api/roommate/matches
 * @access Private (student)
 *
 * TODO: Integration point for AI service:
 *   1. Load current student's RoommateProfile
 *   2. Call aiService.getRoommateMatches(profile) → returns ranked student IDs
 *   3. Fetch and return those profiles
 */
const getRoommateMatches = async (req, res) => {
    // PLACEHOLDER: Return random visible profiles until AI module is ready
    res.status(200).json({ message: 'getRoommateMatches – AI module not yet integrated' });
};

/**
 * @desc   Browse all visible roommate profiles
 * @route  GET /api/roommate/browse
 * @access Private
 */
const browseProfiles = async (req, res) => {
    // TODO: Return profiles where isVisible: true, exclude current user
    res.status(200).json({ message: 'browseProfiles – not yet implemented' });
};

module.exports = { createOrUpdateProfile, getMyProfile, getRoommateMatches, browseProfiles };
