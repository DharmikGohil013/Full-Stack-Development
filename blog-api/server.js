const express = require("express");
const connectDB = require("./db");
const routes = require("./routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", routes);

connectDB();

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
