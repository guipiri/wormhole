import { Dispatch, SetStateAction, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { LuLoader2 } from 'react-icons/lu';
import { IFile } from '../Root';

function InputFile({
  setFiles,
  loading,
}: {
  setFiles: Dispatch<SetStateAction<IFile[]>>;
  loading: boolean;
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
          setBorderGreen(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setBorderGreen(true);
        }}
        // onDragEnter={() => setBorderGreen(true)}
        onDragLeave={() => setBorderGreen(false)}
      >
        {loading ? (
          <LuLoader2 className="animate-spin" size={32} />
        ) : (
          <FiUpload
            onDragEnter={() => setBorderGreen(true)}
            className="relative"
            color={borderGreen ? '#50FA7B' : '#F8F8F2'}
            size={32}
          />
        )}
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
