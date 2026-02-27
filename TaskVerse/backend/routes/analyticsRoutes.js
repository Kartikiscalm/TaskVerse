const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const auth = require('../middleware/authMiddleware');

router.get('/weekly', auth, analyticsController.getWeeklyAnalytics);

module.exports = router;
