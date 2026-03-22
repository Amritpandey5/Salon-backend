const monsgoose = require('mongoose');

const bookingSchema = new monsgoose.Schema(
    {
        user:{
            type:monsgoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        service:{
            type:monsgoose.Schema.Types.ObjectId,
            ref:'service',
            required:true 
        },
        stylist:{
            type:monsgoose.Schema.Types.ObjectId,
            ref:"stylist",
            required:true
        },
        date:{
            type:Date,
            required:true
        },
        time:{
            type:String,
            required:true
        },
        status:{
            type:String,
            enum:["pending","confirmed","cancelled","completed"],
            default:"pending"
        },
    },
    {timestamps:true}
)

const Booking = monsgoose.model('booking',bookingSchema);

module.exports = Booking