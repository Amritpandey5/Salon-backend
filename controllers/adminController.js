const User = require('../models/User');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Stylist = require('../models/Stylist');

exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const totalServices = await Service.countDocuments();
        const totalStylists = await Stylist.countDocuments();

        const bookingsByStatus = await Booking.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);

        res.status(200).json({
            totalUsers,
            totalBookings,
            totalServices,
            totalStylists,
            bookingsByStatus,
        })
    } catch (error) {
        res.status(500).json({msg:'Server Error'})
    }
}