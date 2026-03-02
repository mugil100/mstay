/**
 * routes/reportRoutes.js - Analytics and reports routes
 * GET /api/reports/platform    - Platform-level stats (admin)
 * GET /api/reports/owner       - Owner's listing analytics (owner)
 * GET /api/reports/student     - Student activity summary (student)
 * TODO: Integrate with dedicated analytics service/aggregation pipelines
 */

const express = require('express');
const router = express.Router();
const {
    getPlatformReport,
    getOwnerReport,
    getStudentReport,
} = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/platform', protect, authorize('admin'), getPlatformReport);
router.get('/owner', protect, authorize('owner'), getOwnerReport);
router.get('/student', protect, authorize('student'), getStudentReport);

module.exports = router;
