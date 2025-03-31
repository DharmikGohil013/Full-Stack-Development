// index.js

// Import the core modules
const os = require('os');
const fs = require('fs');
const path = require('path');

// Function to get system information
const getSystemInfo = () => {
    const systemInfo = {
        osType: os.type(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        cpuDetails: os.cpus(),
    };
    return systemInfo;
};

// Function to display system information in the consolecd..
const displaySystemInfo = (info) => {
    console.log('System Information:');
    console.log(`OS Type: ${info.osType}`);
    console.log(`Total Memory: ${(info.totalMemory / 1024 / 1024 / 1024).toFixed(2)} GB`);
    console.log(`Free Memory: ${(info.freeMemory / 1024 / 1024 / 1024).toFixed(2)} GB`);
    console.log('CPU Details:');
    info.cpuDetails.forEach((cpu, index) => {
        console.log(`  CPU ${index + 1}: ${cpu.model}`);
    });
};

// Function to save system information to a log file
const saveSystemInfoToFile = (info) => {
    // Create the file path using path.join to ensure it is standardized
    const logFilePath = path.join(__dirname, 'logs', 'system-info.txt');

    // Ensure the logs directory exists
    if (!fs.existsSync(path.dirname(logFilePath))) {
        fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
    }

    // Format system info to save
    const infoToSave = `
    System Information:
    OS Type: ${info.osType}
    Total Memory: ${(info.totalMemory / 1024 / 1024 / 1024).toFixed(2)} GB
    Free Memory: ${(info.freeMemory / 1024 / 1024 / 1024).toFixed(2)} GB
    CPU Details:
    ${info.cpuDetails.map((cpu, index) => `  CPU ${index + 1}: ${cpu.model}`).join('\n')}
    `;

    // Write the system information to the log file
    fs.writeFileSync(logFilePath, infoToSave);
    console.log(`System information saved to: ${logFilePath}`);
};

// Main function to run the tool
const main = () => {
    const systemInfo = getSystemInfo();
    displaySystemInfo(systemInfo);
    saveSystemInfoToFile(systemInfo);
};

// Run the main function
main();
