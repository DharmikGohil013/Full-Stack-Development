// index.js

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to get the file type based on file extension
const getFileType = (extname) => {
    if (['.jpg', '.jpeg', '.png', '.gif'].includes(extname)) {
        return 'Images';
    } else if (['.pdf', '.docx', '.txt'].includes(extname)) {
        return 'Documents';
    } else if (['.mp4', '.mkv', '.avi'].includes(extname)) {
        return 'Videos';
    } else {
        return 'Others';
    }
};

// Function to move file to the appropriate folder
const moveFile = (filePath, fileType) => {
    const fileName = path.basename(filePath);
    const targetDir = path.join(__dirname, fileType);
    
    // Create folder if it does not exist
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
    }

    const targetPath = path.join(targetDir, fileName);

    // Move the file
    fs.rename(filePath, targetPath, (err) => {
        if (err) {
            console.error(`Error moving file: ${fileName}`, err);
        } else {
            console.log(`Moved ${fileName} to ${fileType}`);
            logToFile(`Moved ${fileName} to ${fileType}`);
        }
    });
};

// Function to log operations to summary.txt
const logToFile = (message) => {
    fs.appendFile('summary.txt', message + '\n', (err) => {
        if (err) {
            console.error('Error logging operation:', err);
        }
    });
};

// Function to organize files in a directory
const organizeFiles = async (dirPath) => {
    try {
        const files = await fs.promises.readdir(dirPath);

        files.forEach((file) => {
            const filePath = path.join(dirPath, file);
            fs.promises.stat(filePath).then((stats) => {
                if (stats.isFile()) {
                    const extname = path.extname(file).toLowerCase();
                    const fileType = getFileType(extname);
                    moveFile(filePath, fileType);
                }
            }).catch(err => console.error(`Error reading file stats: ${file}`, err));
        });
    } catch (err) {
        console.error('Error reading directory:', err);
    }
};

// Prompt user for directory input
rl.question('Enter the directory path to organize: ', (dirPath) => {
    organizeFiles(dirPath).then(() => {
        console.log('File organization completed!');
        rl.close();
    }).catch(err => {
        console.error('Error organizing files:', err);
        rl.close();
    });
});
