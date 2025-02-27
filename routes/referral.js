const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/referrals
router.get('/', authMiddleware, referralController.getUserReferrals);

// @route   GET /api/referrals/stats
router.get('/stats', authMiddleware, referralController.getReferralStats);

module.exports = router;