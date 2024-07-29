import { useContext, useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { ICfBucketConfig } from '../cfbucket/cfbucket.config';
import { AlertContext } from '../context/AlertProvider';

const initialStateCfBucketConfig = {
  publicUrl: '',
  endpoint: '',
  accessKeyId: '',
  secretAccessKey: '',
};

function Config() {
  const { setAlert } = useContext(AlertContext);

  const [cfBucketConfig, setCfBucketConfig] = useState<ICfBucketConfig>(
    initialStateCfBucketConfig
  );
  const { accessKeyId, endpoint, publicUrl, secretAccessKey } = cfBucketConfig;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCfBucketConfig({ ...cfBucketConfig, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!(accessKeyId && endpoint && secretAccessKey && publicUrl)) {
      setAlert({
        message: 'Preencha todos os campos!',
        show: true,
        type: 'warning',
      });
    } else {
      const { message, success } = await window.electronAPI.setCfBucketConfig(
        cfBucketConfig
      );
      setAlert({ message, show: true, type: success ? 'success' : 'error' });
    }
  };

  const getCfConfig = async () => {
    const config = await window.electronAPI.getCfBucketConfig();
    if (config) setCfBucketConfig(config);
  };

  useEffect(() => {
    getCfConfig();
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <Link to={'/'} className="mr-auto">
        <IoIosArrowBack size={24} />
      </Link>
      <div className="max-w-96 w-full">
        <h1 className="mb-8 text-center text-2xl">Configurações</h1>
        <div>
          <div className="flex flex-col mb-4">
            <label htmlFor="endpoint">Endpoint API S3:</label>
            <input
              className="mt-2 px-2 py-1 rounded-md bg-bg2 focus:outline-none focus:ring-1 focus:ring-green"
              type="text"
              id="endpoint"
              name="endpoint"
              value={endpoint}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="publicUrl">URL público:</label>
            <input
              className="mt-2 px-2 py-1 rounded-md bg-bg2 focus:outline-none focus:ring-1 focus:ring-green"
              type="text"
              id="publicUrl"
              name="publicUrl"
              value={publicUrl}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="accessKeyId">ID da chave de acesso:</label>
            <input
              className="mt-2 px-2 py-1 rounded-md bg-bg2 focus:outline-none focus:ring-1 focus:ring-green"
              type="text"
              id="accessKeyId"
              name="accessKeyId"
              value={accessKeyId}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="secretAccessKey">Senha da chave acesso:</label>
            <input
              className="mt-2 px-2 py-1 rounded-md bg-bg2 focus:outline-none focus:ring-1 focus:ring-green"
              type="text"
              id="secretAccessKey"
              name="secretAccessKey"
              value={secretAccessKey}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="my-4 w-full py-1 bg-bg2  rounded-md hover:opacity-85 drop-shadow-lg"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}

export default Config;
