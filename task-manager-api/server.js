const express = require("express");
const connectDB = require("./db");
const taskRoutes = require("./routes/taskRoutes");

require("dotenv").config();
const app = express();

// Middleware
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use("/tasks", taskRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
