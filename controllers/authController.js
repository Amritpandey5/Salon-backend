const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
};

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User Already Exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashPassword
        });

        res.status(200).json({
            msg:"You are Singed up Successsfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });

    } catch (error) {
        return res.status(500).json({ msg: "Server Error" });
    }
};

exports.loginUser = async (req, res) => {
    try {
        console.log('Body:',req.body);
        
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log('User:',user);
        
        if (!user) {
            return res.status(404).json({ msg: "User Not Found!" });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        console.log("MATCH:", isMatch); // 👈
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid email or Password" });
        }
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        })
    } catch (error) {
        console.log(error); 
        return res.status(500).json({msg:"Server Error"})
    }
};

