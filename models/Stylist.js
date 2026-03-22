const mongoose = require('mongoose');

const stylistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name od Stylist is required"]
    },
    bio:{
        type:String
    },
    image:{
        type:String
    },
    specialties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service",
      },
    ],
},{timestamps:true});

const Stylist = mongoose.model('stylist',stylistSchema);

module.exports = Stylist;