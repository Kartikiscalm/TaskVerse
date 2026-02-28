const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/google', authController.googleLogin);
router.get('/profile', auth, authController.getProfile);

module.exports = router;
