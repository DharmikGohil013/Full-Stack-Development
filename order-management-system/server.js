const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const app = express();
const ordersRouter = require('./routes/orders');
const authRouter = require('./routes/auth');
const loggingMiddleware = require('./middleware/logging');
const authenticateMiddleware = require('./middleware/authenticate');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(loggingMiddleware);  // Logging middleware for all requests

// Routes
app.use('/orders', authenticateMiddleware, ordersRouter);
app.use('/auth', authRouter);

// Error handling middleware (Centralized Error Handling)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
