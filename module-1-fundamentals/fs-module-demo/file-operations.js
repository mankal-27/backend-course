const fs = require('fs');
const path = require('path'); // Don't forget path module!

const filePath = path.join(__dirname, 'data.txt'); // Use path.join for robustness
const newFilePath = path.join(__dirname, 'new_file.txt');
const logsDir = path.join(__dirname, 'logs');
const logFile = path.join(logsDir, 'app_logs.txt');
const fileToDelete = path.join(__dirname, 'temp_delete.txt');

console.log('--- Starting File Operations ---');

// 1. Asynchronously Read data.txt
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading data.txt:', err.message);
        return;
    }
    console.log('\n1. Content of data.txt:', data);
    
    // 2. Asynchronously Write to new_file.txt
    const contentToWrite = 'Hello from Node.js! This was written asynchronously.';
    fs.writeFile(newFilePath, contentToWrite, (err) => {
        if (err) {
            console.error('Error writing new_file.txt:', err.message);
            return;
        }
        console.log('\n2. "new_file.txt" created/overwritten.');
        
        // 3. Asynchronously Append to new_file.txt
        const contentToAppend = '\nThis line was appended later.';
        fs.appendFile(newFilePath, contentToAppend, (err) => {
            if (err) {
                console.error('Error appending to new_file.txt:', err.message);
                return;
            }
            console.log('\n3. Content appended to "new_file.txt".');
            
            // 4. Create a new directory 'logs'
            fs.mkdir(logsDir, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error creating logs directory:', err.message);
                    return;
                }
                console.log('\n4. Directory "logs" created.');
                
                // 5. Write a log entry to a file inside 'logs'
                const logMessage = `[${new Date().toISOString()}] Application started.\n`;
                fs.writeFile(logFile, logMessage, (err) => {
                    if (err) {
                        console.error('Error writing to log file:', err.message);
                        return;
                    }
                    console.log('\n5. Log file "app_logs.txt" written.');
                    
                    // 6. Create a temporary file for deletion
                    fs.writeFile(fileToDelete, 'Temporary content to delete', (err) => {
                        if (err) {
                            console.error('Error creating temp file:', err.message);
                            return;
                        }
                        console.log('\n6. "temp_delete.txt" created for deletion.');
                        
                        // 7. Delete the temporary file
                        fs.unlink(fileToDelete, (err) => {
                            if (err) {
                                console.error('Error deleting temp_delete.txt:', err.message);
                                return;
                            }
                            console.log('\n7. "temp_delete.txt" deleted.');
                            
                            // 8. Read contents of the current directory
                            fs.readdir(__dirname, (err, files) => {
                                if (err) {
                                    console.error('Error reading current directory:', err.message);
                                    return;
                                }
                                console.log('\n8. Files in current directory:', files);
                                
                                console.log('\n--- All File Operations Completed ---');
                            });
                        });
                    });
                });
            });
        });
    });
});

console.log('Initiating all file operations (asynchronously). Output order will vary.');