// taskManager.js

// Array to store tasks
const tasks = [];

// Function to add a new task
const addTask = (title, dueTime, priority) => {
  try {
    if (!title || !dueTime || !priority) {
      throw new Error("Missing required task fields.");
    }
    if (typeof title !== "string" || typeof dueTime !== "number" || typeof priority !== "number") {
      throw new Error("Invalid task data types.");
    }

    const task = { title, dueTime, priority };
    tasks.push(task);
    console.log(`Task "${title}" added successfully!`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

// Function to sort tasks by priority (ascending order)
const sortTasksByPriority = () => {
  return tasks.sort((a, b) => a.priority - b.priority);
};

// Function to display tasks due within a certain timeframe
const displayTasksDueWithinTimeframe = (timeframeInMinutes) => {
  const currentTime = Date.now();
  const tasksDue = tasks.filter(task => {
    const taskDueTime = currentTime + task.dueTime * 60000; // Convert minutes to milliseconds
    return taskDueTime <= currentTime + timeframeInMinutes * 60000;
  });

  tasksDue.forEach(task => {
    console.log(`Task: ${task.title}, Due in: ${task.dueTime} minutes, Priority: ${task.priority}`);
  });
};

// Function to simulate sending reminders using setTimeout
const sendReminders = () => {
  tasks.forEach(task => {
    setTimeout(() => {
      console.log(`Reminder: ${task.title} is due!`);
    }, task.dueTime * 60000); // Set timeout for each task based on dueTime
  });
};

// Export the functions to be used in other files
export { addTask, sortTasksByPriority, displayTasksDueWithinTimeframe, sendReminders };
