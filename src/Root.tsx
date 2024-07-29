import { createRoot } from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { ICfBucketConfig } from './cfbucket/cfbucket.config';
import AlertProvider from './context/AlertProvider';
import Config from './pages/Config';
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
  getUploads: () => Promise<IUpload[]>;
  sendFiles: (
    fileList: IFile[]
  ) => Promise<{ message: string; success: boolean }>;
  setCfBucketConfig: (config: ICfBucketConfig) => Promise<{
    message: string;
    success: boolean;
  }>;
  getCfBucketConfig: () => Promise<ICfBucketConfig | null>;
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
          <Route path="/config" element={<Config />} />
        </Routes>
      </App>
    </AlertProvider>
  </MemoryRouter>
);
