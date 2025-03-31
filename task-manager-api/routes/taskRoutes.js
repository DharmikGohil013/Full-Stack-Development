const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// ✅ CREATE: Add a new task
router.post("/", async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ✅ READ: Get all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find(req.query);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ READ: Get a task by ID
router.get("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: "Invalid Task ID" });
    }
});

// ✅ UPDATE: Update a task by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) return res.status(404).json({ error: "Task not found" });
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ error: "Invalid Task ID" });
    }
});

// ✅ DELETE: Delete a task by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ error: "Task not found" });
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Invalid Task ID" });
    }
});

module.exports = router;
