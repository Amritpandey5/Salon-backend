const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { getDashboardStats } = require('../controllers/adminController');
const router = express.Router();

router.get('/stats',protect,adminOnly,getDashboardStats);

module.exports  = router;