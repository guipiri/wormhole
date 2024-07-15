// import { clipboard } from 'electron';
import { useContext, useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { TbClipboardCopy } from 'react-icons/tb';
import InputFile from '../components/InputFile';
import { AlertContext } from '../context/AlertProvider';
import { IUpload } from '../Root';
import { bytesToSizeString } from '../utils/bytesToSizeString';

function Home() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploads, setUploads] = useState<IUpload[] | null>(null);
  const [displayCheckedIcon, setDisplayCheckedIcon] = useState<number>(-1);
  const { setAlert } = useContext(AlertContext);

  const sendFiles = () => {
    if (!files) return alert('Nenhum arquivo slecionado');
    const fileList = [];
    for (const { path, name, type, size } of files) {
      fileList.push({ path, name, type, size });
    }
    const res = window.electronAPI.sendFiles(fileList);
    if (res.success) {
      const uploads = window.electronAPI.getUploads();
      setFiles(null);
      setUploads(uploads);
    }
    setAlert({
      show: true,
      message: res.message,
      type: res.success ? 'success' : 'error',
    });
  };

  useEffect(() => {
    const uploads = window.electronAPI.getUploads();
    setUploads(uploads);
  }, []);

  return (
    <>
      <div>
        <InputFile setFiles={setFiles} />
        {files && (
          <ol className="list-decimal pl-8 mt-2">
            {Array.from(files).map((file) => (
              <li key={`${file.name}${file.size}`}>{file.name}</li>
            ))}
          </ol>
        )}
        <button
          className="my-2 w-full py-1 bg-bg2  rounded-md hover:opacity-85 drop-shadow-lg"
          onClick={sendFiles}
        >
          Enviar
        </button>
      </div>
      <div className="mt-8">
        <table className="w-full bg-bg">
          <thead className="border-b border-white">
            <tr>
              <th className="w-20">URL</th>
              <th>Arquivos</th>
              <th className="w-20">Tamanho</th>
            </tr>
          </thead>
          {uploads &&
            uploads.map((upload) => {
              return (
                <tbody key={upload.id} className="border-b border-white">
                  <tr>
                    <td rowSpan={upload.files.length} align="center">
                      {displayCheckedIcon !== upload.id ? (
                        <TbClipboardCopy
                          size={20}
                          className="cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(upload.url);
                            setDisplayCheckedIcon(upload.id);
                            setTimeout(() => {
                              setDisplayCheckedIcon(-1);
                            }, 2000);
                          }}
                        />
                      ) : (
                        <FaCheck color="#50FA7B" />
                      )}
                    </td>
                    <td
                      className="py-2 text-ellipsis overflow-hidden whitespace-nowrap max-w-0"
                      align="center"
                    >
                      {upload.files[0].name}
                    </td>
                    <td align="center">
                      {bytesToSizeString(upload.files[0].size)}
                    </td>
                  </tr>
                  {upload.files.length > 1 &&
                    upload.files.map((file, index) => {
                      if (index === 0) return;
                      return (
                        <tr key={`${file.uploadId}${file.name}`}>
                          <td
                            className="py-2 text-ellipsis overflow-hidden whitespace-nowrap"
                            align="center"
                          >
                            {file.name}
                          </td>
                          <td key={index} align="center">
                            {bytesToSizeString(file.size)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              );
            })}
        </table>
      </div>
    </>
  );
}

export default Home;
