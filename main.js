const { app, BrowserWindow, ipcMain } = require("electron")

let win;

//Window function
function createWindow(){
    win = new BrowserWindow({
        width: 500,
        height: 500,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        frame: false,
        transparent: true,
        webPreferences: {
            contextIsolation: true,
            preload: __dirname + "/preload.js"
        }
    });

    win.loadFile("index.html");
}

//Window Application Launch
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

//Window application alterations
ipcMain.on("window:minimize", () => {
    if (win) { win.minimize(); }
});

ipcMain.on("window:close", () => {
    if (win) { win.close(); }
});