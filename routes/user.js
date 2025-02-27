const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const validationMiddleware = require('../middleware/validation');

// @route   GET /api/user/profile
router.get('/profile', authMiddleware, userController.getUserProfile);

// @route   PUT /api/user/profile
router.put('/profile', [
  authMiddleware,
  check('username', 'Username is required').optional().not().isEmpty(),
  check('email', 'Please include a valid email').optional().isEmail(),
  validationMiddleware
], userController.updateUserProfile);

// @route   PUT /api/user/change-password
router.put('/change-password', [
  authMiddleware,
  check('currentPassword', 'Current password is required').not().isEmpty(),
  check('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 }),
  validationMiddleware
], userController.changePassword);

module.exports = router;