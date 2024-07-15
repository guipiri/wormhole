import { createRoot } from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import AlertProvider from './context/AlertProvider';
import Home from './pages/Home';

export interface IFile {
  id?: number;
  name: string;
  url?: string;
  path?: string;
  size: number;
  type: string;
  uploadId?: number;
  createdAt?: string;
}

export interface IUpload {
  id?: number;
  name: string;
  size: number;
  type: string;
  files?: IFile[];
  url?: string;
  createdAt?: string;
}

interface ElectronAPI {
  getUploads: () => IUpload[];
  sendFiles: (fileList: IFile[]) => { message: string; success: boolean };
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

createRoot(document.getElementById('root')).render(
  <MemoryRouter>
    <AlertProvider>
      <App>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </App>
    </AlertProvider>
  </MemoryRouter>
);
