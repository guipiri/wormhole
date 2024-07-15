import { Dispatch, SetStateAction, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { IFile } from '../Root';

function InputFile({
  setFiles,
}: {
  setFiles: Dispatch<SetStateAction<IFile[]>>;
}) {
  const [borderGreen, setBorderGreen] = useState<boolean>(false);
  return (
    <>
      <label
        htmlFor="file"
        className={`${
          borderGreen ? 'border-green' : 'border-bg'
        } h-40 border bg-bg2 rounded-lg flex items-center justify-center drop-shadow-lg w-full cursor-pointer`}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setFiles(Array.from(e.dataTransfer.files));
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragEnter={() => setBorderGreen(true)}
        onDragLeave={() => setBorderGreen(false)}
      >
        <FiUpload className="relative" size={32} />
      </label>
      <input
        type="file"
        name=""
        id="file"
        multiple={true}
        onChange={(e) => setFiles(Array.from(e.target.files))}
      />
    </>
  );
}

export default InputFile;
