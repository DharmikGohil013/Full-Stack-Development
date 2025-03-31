// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// Initialize Express application
const app = express();

// Set the port for the server
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Helper function to read the products data
const getProducts = () => {
    const data = fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf8');
    return JSON.parse(data);
};

// Define routes

// GET /products - Return all products
app.get('/products', (req, res) => {
    const products = getProducts();
    const { category } = req.query;

    if (category) {
        // Filter products by category if the query string exists
        const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
        res.json(filteredProducts);
    } else {
        res.json(products);
    }
});

// GET /products/:id - Fetch a specific product by ID
app.get('/products/:id', (req, res) => {
    const products = getProducts();
    const productId = parseInt(req.params.id);

    const product = products.find(p => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
