import { IUpload } from '../Root';

export interface ISqlResultFromGetUploads {
  id: number;
  name: string;
  type: string;
  size: number;
  uploadId: number;
  uploadName: string;
  uploadType: string;
  uploadSize: number;
  url: string;
  createdAt: string;
}
//Organize the result of sql query getUploads
export const organizeSqlResult = (files: ISqlResultFromGetUploads[]) => {
  const uploads: IUpload[] = [];

  files.forEach((file) => {
    const uploadIndex = uploads.findIndex((item) => {
      return item.id === file.uploadId;
    });
    if (uploadIndex > -1) {
      uploads[uploadIndex].files.push({
        id: file.id,
        name: file.name,
        type: file.type,
        size: file.size,
        createdAt: file.createdAt,
      });
    } else {
      uploads.push({
        id: file.uploadId,
        name: file.uploadName,
        size: file.uploadSize,
        type: file.uploadType,
        url: file.url,
        files: [
          { id: file.id, name: file.name, type: file.type, size: file.size },
        ],
        createdAt: file.createdAt,
      });
    }
  });
  return uploads;
};
