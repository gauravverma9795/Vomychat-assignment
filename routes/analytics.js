const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/analytics/link/:linkId
router.get('/link/:linkId', authMiddleware, analyticsController.getLinkAnalytics);

// @route   GET /api/analytics/overall
router.get('/overall', authMiddleware, analyticsController.getOverallAnalytics);

module.exports = router;