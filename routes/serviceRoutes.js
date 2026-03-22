const express = require('express');
const { getService, createService, updateService, deleteService } = require('../controllers/serviceController');
const router = express.Router();

const {protect,adminOnly} = require('../middleware/authMiddleware')

router.get('/',getService);
router.post('/',protect,adminOnly,createService);
router.put('/:id',protect,adminOnly,updateService);
router.delete('/:id',protect,adminOnly,deleteService);

module.exports = router;