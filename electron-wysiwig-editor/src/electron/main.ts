import { app, BrowserWindow, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  mainWindow.loadFile('index.html');
}
app.whenReady().then(() => {
  createWindow();
});

const contentFile = path.join(app.getPath('userData'), 'content.html');

ipcMain.handle('getContent', () => {
  if (fs.existsSync(contentFile)) {
    const result = fs.readFileSync(contentFile);
    return result.toString();
  }
  return '';
});

ipcMain.handle('setContent', ({}, content: string) => {
  fs.writeFileSync(contentFile, content);
});
