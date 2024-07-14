import { ReactNode } from 'react';
import Navbar from './components/Navbar';

function App({ children }: { children: ReactNode }) {
  return (
    <div className=" bg-bg min-h-[100vh] text-white p-8">
      <Navbar />
      {children}
    </div>
  );
}

export default App;
