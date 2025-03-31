require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("Connection error:", err));

const addUser = async () => {
    const user = new User({ name: "John Doe", email: "john@example.com", age: 30 });

    try {
        const savedUser = await user.save();
        console.log("User added:", savedUser);
        mongoose.connection.close();
    } catch (error) {
        console.error("Error adding user:", error);
    }
};

addUser();
