require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("Connection error:", err));

const getUsers = async () => {
    try {
        const users = await User.find();
        console.log("Users:", users);
        mongoose.connection.close();
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

getUsers();
