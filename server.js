const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan  = require('morgan');
const connectDB  = require('./config/db')
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const stylistRoutes = require('./routes/stylistRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandle = require('./middleware/errorMiddleware')
const { protect } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

// connect to data base
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/auth',authRoutes);
app.use('/api/services',serviceRoutes); 
app.use("/api/stylists", stylistRoutes);
app.use('/api/bookings',bookingRoutes);
app.use('/api/admin',adminRoutes);

app.use(errorHandle)

app.get('/api/protected',protect,(req,res)=>{
    res.status(200).json({
        msg:'You accessed protected route',
        user:req.user
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`🚀 Server running on port ${PORT}`);
})

