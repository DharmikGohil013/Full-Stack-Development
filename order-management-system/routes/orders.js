const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Helper function to read orders from file
const getOrders = () => {
    const data = fs.readFileSync(path.join(__dirname, '..', 'data', 'orders.json'), 'utf8');
    return JSON.parse(data);
};

// POST /orders - Create a new order
router.post('/', (req, res) => {
    const { title, customerName, amount } = req.body;
    if (!title || !customerName || !amount) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const orders = getOrders();
    const newOrder = { id: orders.length + 1, title, customerName, amount };
    orders.push(newOrder);
    fs.writeFileSync(path.join(__dirname, '..', 'data', 'orders.json'), JSON.stringify(orders, null, 2));
    res.status(201).json(newOrder);
});

// GET /orders - Retrieve all orders
router.get('/', (req, res) => {
    const orders = getOrders();
    res.json(orders);
});

// GET /orders/:id - Retrieve a specific order by ID
router.get('/:id', (req, res) => {
    const orders = getOrders();
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
});

// PUT /orders/:id - Update an order by ID
router.put('/:id', (req, res) => {
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (orderIndex === -1) {
        return res.status(404).json({ message: 'Order not found' });
    }

    const { title, customerName, amount } = req.body;
    if (!title || !customerName || !amount) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    orders[orderIndex] = { id: parseInt(req.params.id), title, customerName, amount };
    fs.writeFileSync(path.join(__dirname, '..', 'data', 'orders.json'), JSON.stringify(orders, null, 2));
    res.json(orders[orderIndex]);
});

// DELETE /orders/:id - Delete an order by ID
router.delete('/:id', (req, res) => {
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (orderIndex === -1) {
        return res.status(404).json({ message: 'Order not found' });
    }

    orders.splice(orderIndex, 1);
    fs.writeFileSync(path.join(__dirname, '..', 'data', 'orders.json'), JSON.stringify(orders, null, 2));
    res.status(204).send();
});

module.exports = router;
