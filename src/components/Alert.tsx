export interface IAlert {
  show: boolean;
  type: 'success' | 'warning' | 'error';
  message: string;
}
import { useContext, useEffect } from 'react';
import { FaCheck, FaExclamation, FaTimes } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { AlertContext } from '../context/AlertProvider';

function Alert({ type, message }: Omit<IAlert, 'show'>) {
  const { closeAlert } = useContext(AlertContext);
  useEffect(() => {
    setTimeout(() => {
      closeAlert();
    }, 3000);
  });
  return (
    <div className="bottom-8 ml-8 fixed bg-bg2 flex justify-center py-6 px-4 max-w-96 w-full rounded-lg text-white drop-shadow-xl shadow-lg">
      <div className="flex items-center justify-between w-full">
        <div className="flex">
          {type === 'success' ? (
            <FaCheck size={28} color="#50FA7B" className="ml-4" />
          ) : type === 'error' ? (
            <FaTimes size={28} color="#FF5555" className="ml-4" />
          ) : (
            <FaExclamation size={28} color="#F1FA8C" className="ml-4" />
          )}

          <h1 className="ml-4 text-lg">{message}</h1>
        </div>
        <div className="mx-4 flex items-center justify-center">
          <button onClick={closeAlert}>
            <IoClose size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Alert;
