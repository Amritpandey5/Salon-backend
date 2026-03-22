const express = require('express');
const { getAllStylists, getStylistByID, createStylist, updateStylist, deleteStylist } = require('../controllers/stylistController');
const {protect,adminOnly} = require('../middleware/authMiddleware')
const router = express.Router();

router.get('/',getAllStylists);
router.get('/:id',getStylistByID);

router.post('/',protect,adminOnly,createStylist);
router.put('/:id',protect,adminOnly,updateStylist);
router.delete('/:id',protect,adminOnly,deleteStylist);


module.exports = router