// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  sendFiles: async (formData: FileList) => {
    const res = await ipcRenderer.invoke('send-files', formData);
    return res;
  },
  getUploads: async () => {
    const res = ipcRenderer.invoke('get-uploads');
    return res;
  },
});
