const { contextBridge, ipcRenderer } = require('electron');
const { getAppStatus } = require("./tracker");
const { getMessageForState } = require("./messageEngine");

contextBridge.exposeInMainWorld('electron', {
  onActiveWin: (callback) => ipcRenderer.on('active-win', (event, ...args) => callback(...args)),
  getStatus: async () => await getAppStatus(),
  getMessage: (state) => getMessageForState(state),
});
