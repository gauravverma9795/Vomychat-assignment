const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const validationMiddleware = require('../middleware/validation');

// @route   POST /api/auth/register
router.post('/register', [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  validationMiddleware
], authController.register);

// @route   POST /api/auth/login
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  validationMiddleware
], authController.login);

// @route   POST /api/auth/forgot-password
router.post('/forgot-password', [
  check('email', 'Please include a valid email').isEmail(),
  validationMiddleware
], authController.forgotPassword);

// @route   POST /api/auth/reset-password
router.post('/reset-password', [
  check('token', 'Token is required').not().isEmpty(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  validationMiddleware
], authController.resetPassword);

module.exports = router;