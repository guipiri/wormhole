import AdmZip from 'adm-zip';
import { readFileSync } from 'fs';
import { Database } from 'sqlite3';
import uploadImage from '../cfbucket/uploadImage';
import { createDatabase } from '../db';
import { IFile, IUpload } from '../Root';
import { createRandomFileName } from '../utils/createRandomFilName';
import {
  ISqlResultFromGetUploads,
  organizeSqlResult,
} from '../utils/organizeSqlResult';

export class Services {
  private readonly db: Database = createDatabase();

  private async createFiles(files: IFile[]) {
    const stmt = this.db.prepare(
      `INSERT INTO files (name, url, type, size, uploadId)
       VALUES (?, ?, ?, ?, ?);`
    );
    for (const file of files) {
      stmt.run([file.name, file.url, file.type, file.size, file.uploadId]);
    }
  }

  private async createUpload({
    size,
    type,
    url,
    name,
  }: IUpload): Promise<number> {
    const stmt = this.db.prepare(
      `INSERT INTO uploads (url, type, size, name)
       VALUES (?, ?, ?, ?)
       RETURNING id;`
    );

    return new Promise((resolve, reject) => {
      stmt.all(
        [url, type, size, name],
        (err: unknown, rows: { id: number }[]) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(rows[0].id);
        }
      );
    });
  }

  getUploads(): Promise<IUpload[]> {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT 
          files.id, 
          files.name, 
          files."type", 
          files."size", 
          files.uploadId, 
          uploads.name AS uploadName, 
          uploads."type" as uploadType, 
          uploads."size" AS uploadSize, 
          uploads.url,
          uploads.createdAt 
        FROM files
        INNER JOIN uploads ON uploads.id  = files.uploadId;`,
        (err: unknown, uploads: ISqlResultFromGetUploads[]) => {
          if (err) reject(err);
          resolve(organizeSqlResult(uploads));
        }
      );
    });
  }

  async uploadFiles(fileList: IFile[]) {
    try {
      if (fileList.length === 1) {
        const fileBuffer = readFileSync(fileList[0].path);
        await uploadImage(fileBuffer, fileList[0].name, fileList[0].type);

        fileList[0].url = `https://pub-35c71f6b3d734bacb27f51b66b3a6945.r2.dev/dev/${fileList[0].name}`;
        const uploadId = await this.createUpload({
          size: fileList[0].size,
          type: fileList[0].type,
          url: fileList[0].url,
          name: fileList[0].name,
        });
        fileList[0].uploadId = uploadId;
        this.createFiles(fileList);
      } else {
        const zip = new AdmZip();
        const fileZipName = createRandomFileName();
        for (const file of fileList) {
          zip.addLocalFile(file.path);
        }
        const buffer = zip.toBuffer();
        await uploadImage(buffer, fileZipName, 'application/zip');

        const uploadId = await this.createUpload({
          size: buffer.byteLength,
          type: 'application/zip',
          url: `https://pub-35c71f6b3d734bacb27f51b66b3a6945.r2.dev/dev/${fileZipName}`,
          name: fileZipName,
        });

        for (const file of fileList) {
          file.url = `https://pub-35c71f6b3d734bacb27f51b66b3a6945.r2.dev/dev/${fileZipName}`;
          file.uploadId = uploadId;
        }
        this.createFiles(fileList);
      }
      return new Promise((resolve) => {
        resolve({ success: true, message: 'Upload feito com sucesso' });
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject({ success: false, message: 'Erro ao fazer o upload!' });
      });
    }
  }
}
