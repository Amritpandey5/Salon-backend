const mongoose = require('mongoose');

const connecDb = async () => {
    try {
        const MongoURL = process.env.MONGO_URI;
        console.log("Mongo URL:", MongoURL); 

        const conn = await mongoose.connect(MongoURL)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ Database connection failed:");
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connecDb;