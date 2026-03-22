const Booking = require('../models/Booking');
const Stylist = require('../models/Stylist');


exports.createBooking = async (req, res) => {
    try {
        const { service, stylist, date, time } = req.body;
        const stylistExists = await Stylist.findById(stylist);
        if (!stylistExists) {
            return res.status(404).json({ msg: "Stylist Not Found" })
        }
        if (!stylistExists.specialties.includes(service)) {
            return res
                .status(400)
                .json({ message: "Stylist does not offer this service" });
        }
        const existingBooking = await Booking.findOne({
            stylist,
            date,
            time,
            status: { $ne: "cancelled" },
        });
        if (existingBooking) {
            return res
                .status(400)
                .json({ message: "Stylist already booked at this time" });
        }
        const booking = await Booking.create({
            user: req.user._id,
            service,
            stylist,
            date,
            time,
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ msg: "Server Error" })
    }
}

// getmybookings 
exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('service')
            .populate('stylist');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
}

// getAllBookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user')
            .populate('service')
            .populate('stylist');

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({msg:"Server Error"})
    }
}

// Update booking  satatus 
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["pending", "confirmed", "cancelled", "completed"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking Not Found" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};