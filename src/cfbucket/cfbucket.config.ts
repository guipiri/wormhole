import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { IUpload } from '../Root';
import S3 from './S3Client';

export interface ICfBucketConfig {
  accessKeyId: string;
  secretAccessKey: string;
  endpoint: string;
  publicUrl: string;
}

class CFBucket {
  static configFilePath = path.resolve('cfbucket.config.json');

  static s3Client: null | S3Client = this.getConfig()
    ? S3(this.getConfig())
    : null;

  static getConfig(): ICfBucketConfig | null {
    if (fs.existsSync(this.configFilePath)) {
      const config: ICfBucketConfig = JSON.parse(
        fs.readFileSync(this.configFilePath).toString()
      );
      if (
        config.accessKeyId &&
        config.endpoint &&
        config.secretAccessKey &&
        config.publicUrl
      ) {
        return config;
      }
    }
    return null;
  }

  static bucketName: string;

  static setConfig(config: ICfBucketConfig) {
    fs.writeFileSync(this.configFilePath, JSON.stringify(config));
    this.s3Client = S3(config);
    this.bucketName = config.endpoint.split('/').pop();
    return {
      success: true,
      message: 'Configurações salvas com sucesso!',
    };
  }

  static uploadFiles(
    file: Buffer,
    fileName: string,
    mimetype: string
  ): Promise<{
    message: string;
    success: boolean;
    data: IUpload;
  }> {
    return new Promise((resolve, reject) => {
      if (!this.s3Client) {
        reject({
          message: 'Primeiro, configure o seu bucket!',
          success: false,
        });
      }

      this.setConfig(this.getConfig());

      const putCommand = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: file,
        ContentType: mimetype,
      });

      this.s3Client
        .send(putCommand)
        .then(() => {
          resolve({
            message: 'Upload feito com sucesso!',
            success: true,
            data: {
              type: mimetype,
              name: fileName,
              url: `${this.getConfig().publicUrl}/${
                this.bucketName
              }/${fileName}`,
              size: file.byteLength,
            },
          });
        })
        .catch((err) => {
          reject({ message: err.message, success: false });
        });
    });
  }
}

export default CFBucket;
