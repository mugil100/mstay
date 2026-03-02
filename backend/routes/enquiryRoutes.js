/**
 * routes/enquiryRoutes.js - Enquiry routes
 * POST /api/enquiries          - Student submits enquiry
 * GET  /api/enquiries/my       - Student views own enquiries
 * GET  /api/enquiries/received - Owner views received enquiries
 * PUT  /api/enquiries/:id      - Owner responds to enquiry
 */

const express = require('express');
const router = express.Router();
const {
    createEnquiry,
    getMyEnquiries,
    getReceivedEnquiries,
    respondToEnquiry,
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post('/', protect, authorize('student'), createEnquiry);
router.get('/my', protect, authorize('student'), getMyEnquiries);
router.get('/received', protect, authorize('owner'), getReceivedEnquiries);
router.put('/:id', protect, authorize('owner'), respondToEnquiry);

module.exports = router;
