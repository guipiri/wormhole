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
    <div className="h-40 w-full grid relative">
      <label
        htmlFor="file"
        className={`${
          borderGreen ? 'border-green' : 'border-bg'
        } h-full border bg-none rounded-lg drop-shadow-lg w-full cursor-pointer z-10`}
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
      ></label>
      {loading ? (
        <LuLoader2 className="animate-spin" size={32} />
      ) : (
        <div className="absolute h-full w-full rounded-lg  bg-bg2 flex justify-center items-center">
          <FiUpload
            // onDragEnter={() => setBorderGreen(true)}
            color={borderGreen ? '#50FA7B' : '#F8F8F2'}
            size={32}
          />
        </div>
      )}
      <input
        type="file"
        id="file"
        multiple={true}
        onChange={(e) => setFiles(Array.from(e.target.files))}
      />
    </div>
  );
}

export default InputFile;
