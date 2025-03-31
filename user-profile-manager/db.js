const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Set a timeout to avoid long waits
        });
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ Connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
