const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'Name is required']
        },
        email:{
            type:String,
            required:[true,'Email is required'],
            unique:true,
            lowereCase:true,
        },
        password:{
            type:String,
            required:[true,'Password is required'],
            minLength:6,
        },
        role:{
            type:String,
            enum:["user",'Admin'],
            default:"user",
        }
    },
    {timestamps:true}
);

const User = mongoose.model('User',userSchema);

module.exports = User;