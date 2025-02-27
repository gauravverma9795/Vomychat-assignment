const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const linkController = require('../controllers/linkController');
const authMiddleware = require('../middleware/auth');
const validationMiddleware = require('../middleware/validation');

// @route   POST /api/links
router.post('/', [
  authMiddleware,
  check('title', 'Title is required').not().isEmpty(),
  check('url', 'Valid URL is required').isURL(),
  validationMiddleware
], linkController.createLink);

// @route   GET /api/links
router.get('/', authMiddleware, linkController.getUserLinks);

// @route   PUT /api/links/:linkId
router.put('/:linkId', [
  authMiddleware,
  check('title', 'Title is required').optional().not().isEmpty(),
  check('url', 'Valid URL is required').optional().isURL(),
  validationMiddleware
], linkController.updateLink);

// @route   DELETE /api/links/:linkId
router.delete('/:linkId', authMiddleware, linkController.deleteLink);

module.exports = router;