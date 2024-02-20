const { app, BrowserWindow, ipcMain, contextBridge } = require('electron');

const url = require('url');
const path = require('path');
let win;

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Blaze Mailer',
        minWidth: 1100,
        maxWidth: 1100,
        height: 810,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false,
            preload: path.join(__dirname, "./preload.js") // path to your preload.js file
        }
    });

    const startUrl = url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
    });

    mainWindow.loadURL(startUrl);
}

app.whenReady().then(createMainWindow);

ipcMain.handle('myfunc', async (event, arg) => {
    console.log(arg); // Log the received data to the main process console

    return new Promise(function (resolve, reject) {
        // do stuff
        if (true) {
            resolve("This worked!"); // You can modify this as needed
        } else {
            reject("This didn't work!");
        }
    });
});