const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const auth = require('../middleware/authMiddleware');

router.get('/me', auth, groupController.getMyGroup);
router.post('/create', auth, groupController.createGroup);
router.post('/join', auth, groupController.joinGroup);
router.post('/leave', auth, groupController.leaveGroup);

module.exports = router;
