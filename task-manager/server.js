const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const TASKS_FILE = 'tasks.json';

app.use(bodyParser.json());

// Utility function to read tasks from file
const readTasks = () => {
    try {
        return JSON.parse(fs.readFileSync(TASKS_FILE));
    } catch (error) {
        return [];
    }
};

// Utility function to save tasks to file
const saveTasks = (tasks) => {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

// Middleware to validate task input
const validateTask = (req, res, next) => {
    const { title, status } = req.body;
    if (!title || !status) {
        return res.status(400).json({ error: "Title and status are required." });
    }
    next();
};

// CRUD Endpoints

// 1. Get all tasks
app.get('/tasks', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});

// 2. Get a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    task ? res.json(task) : res.status(404).json({ error: "Task not found" });
});

// 3. Create a new task
app.post('/tasks', validateTask, (req, res) => {
    const tasks = readTasks();
    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        ...req.body
    };
    tasks.push(newTask);
    saveTasks(tasks);
    res.status(201).json(newTask);
});

// 4. Update a task
app.put('/tasks/:id', validateTask, (req, res) => {
    let tasks = readTasks();
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks[index] = { id: parseInt(req.params.id), ...req.body };
    saveTasks(tasks);
    res.json(tasks[index]);
});

// 5. Delete a task
app.delete('/tasks/:id', (req, res) => {
    let tasks = readTasks();
    const updatedTasks = tasks.filter(t => t.id !== parseInt(req.params.id));

    if (tasks.length === updatedTasks.length) {
        return res.status(404).json({ error: "Task not found" });
    }

    saveTasks(updatedTasks);
    res.status(200).json({ message: "Task deleted successfully" });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    