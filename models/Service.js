const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Service name required"]
        },
        description:{
            type:String
        },
        price:{
            type:Number,
            required:[true,"Price is required"]
        },
        duration:{
            type:Number,
            required:[true,"Duration is required"]
        },
        image:{
            type:String
        }
    },
    {timestamps:true}
)

const Service = mongoose.model("service",serviceSchema);

module.exports = Service;