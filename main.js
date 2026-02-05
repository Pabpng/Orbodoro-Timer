const { app, BrowserWindow } = require("electron")

//Window function
function createWindow(){
    const win = new BrowserWindow({
        width: 500,
        height: 500,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        frame: false,
        transparent: false,
        webPreferences: {
            contextIsolation: true
        }
    });

    win.loadFile("index.html");
}

//Window Application Launch
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});