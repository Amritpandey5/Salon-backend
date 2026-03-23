const express = require('express');
const { createBooking, getMyBookings, getAllBookings, updateBookingStatus, getBookedSlots } = require('../controllers/bookingController');
const {protect,adminOnly} = require('../middleware/authMiddleware')

const router = express.Router();

// User Routes 

router.post('/',protect,createBooking);
router.get('/my',protect,getMyBookings);
router.get('/slots',protect,getBookedSlots);

// Admin Routes

router.get('/',protect,adminOnly,getAllBookings);
router.put('/:id',protect,adminOnly,updateBookingStatus);

module.exports = router;