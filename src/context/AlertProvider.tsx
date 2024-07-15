import { createContext, ReactNode, useState } from 'react';
import Alert, { IAlert } from '../components/Alert';

export const AlertContext = createContext<{
  setAlert: React.Dispatch<React.SetStateAction<IAlert>>;
  closeAlert: () => void;
}>(null);

function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<IAlert>({
    show: false,
    message: '',
    type: 'success',
  });

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };
  return (
    <AlertContext.Provider value={{ setAlert, closeAlert }}>
      {children}
      {alert.show && <Alert message={alert.message} type={alert.type} />}
    </AlertContext.Provider>
  );
}

export default AlertProvider;
