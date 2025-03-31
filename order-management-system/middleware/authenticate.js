const fs = require('fs');

const loggingMiddleware = (req, res, next) => {
    const logMessage = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}\n`;
    fs.appendFile('server.log', logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
    next();
};

module.exports = loggingMiddleware;
