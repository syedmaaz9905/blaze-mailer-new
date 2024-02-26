const { app, BrowserWindow, ipcMain, contextBridge } = require('electron');
const fs = require('fs');
const url = require('url');
const path = require('path');
let win;

function createMainWindow() {
    console.log('Creating main window...');
    // Check if the session file exists
    const userDataPath = app.getPath('userData');
    const sessionFilePath = path.join(userDataPath, 'session.txt');
    const sessionFileExists = fs.existsSync(sessionFilePath);

    const mainWindow = new BrowserWindow({
        title: 'Blaze Mailer',
        minWidth: 1100,
        maxWidth: 1100,
        height: 810,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "./preload.js")
        }
    });

    if (sessionFileExists) {
        console.log('Session file found. Loading main.html...');
        mainWindow.loadFile('main.html');
    } else {
        console.log('Session file not found. Loading index.html...');
        const startUrl = url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
        });
        mainWindow.loadURL(startUrl);
    }

    // Log when the main window is ready to show
    mainWindow.once('ready-to-show', () => {
        console.log('Main window is ready to show.');
        mainWindow.show();
    });

    // Log when the main window is closed
    mainWindow.on('closed', () => {
        console.log('Main window closed.');
    });
}

app.whenReady().then(createMainWindow);

ipcMain.handle('myfunc', async (event, arg) => {
    // Perform login verification
    const isValidLogin = (arg.username === "asd" && arg.password === "asd");

    if (isValidLogin) {
        // Create a session file upon successful login
        const userDataPath = app.getPath('userData');
        const sessionFilePath = path.join(userDataPath, 'session.txt');
        fs.writeFileSync(sessionFilePath, 'userLoggedIn');
        console.log('Login successful. Session file created.');
        return { success: true, message: "Login successful!" };
    } else {
        console.log('Incorrect username or password.');
        return { success: false, message: "Incorrect username or password." };
    }
});
