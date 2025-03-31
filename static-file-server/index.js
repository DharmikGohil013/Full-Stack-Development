// index.js

// Import necessary modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to get the content type for files
const getContentType = (extname) => {
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        default:
            return 'application/octet-stream'; // For other file types
    }
};

// Create HTTP server
http.createServer((req, res) => {
    // Log the requested URL to the console
    console.log(`Request for ${req.url}`);

    // Handle the root path (index.html)
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, 'public', filePath);

    // Get the file extension
    const extname = path.extname(filePath);

    // Check if the file exists and serve it
    fs.exists(filePath, (exists) => {
        if (exists) {
            // If file exists, read the file and serve it
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end(`Error reading the file: ${err.message}`);
                } else {
                    // Send the correct content type based on file extension
                    res.writeHead(200, { 'Content-Type': getContentType(extname) });
                    res.end(content);
                }
            });
        } else {
            // If file does not exist, show 404 error
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1><p>The file you requested could not be found.</p>');
        }
    });
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
