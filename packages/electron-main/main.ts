import {app, BrowserWindow} from 'electron';

app.whenReady().then(() => {
  const window = new BrowserWindow({
  });
  window.loadURL('http://127.0.0.1:3001/');
  window.show();
  window.webContents.openDevTools();
});
