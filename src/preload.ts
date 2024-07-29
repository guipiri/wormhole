// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import { ICfBucketConfig } from './cfbucket/cfbucket.config';

contextBridge.exposeInMainWorld('electronAPI', {
  sendFiles: async (fileList: FileList) => {
    const res = await ipcRenderer.invoke('send-files', fileList);
    return res;
  },
  getUploads: async () => {
    const res = ipcRenderer.invoke('get-uploads');
    return res;
  },
  setCfBucketConfig: (config: ICfBucketConfig) => {
    return ipcRenderer.invoke('set-cfbucket-config', config);
  },
  getCfBucketConfig: () => {
    return ipcRenderer.invoke('get-cfbucket-config');
  },
});
