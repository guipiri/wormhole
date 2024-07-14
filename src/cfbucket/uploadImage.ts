import { PutObjectCommand } from '@aws-sdk/client-s3';
import S3 from './S3Client';

const uploadImage = async (
  file: Buffer,
  imageName: string,
  mimetype: string
) => {
  const putCommand = new PutObjectCommand({
    Bucket: 'share-files',
    Key: imageName,
    Body: file,
    ContentType: mimetype,
  });
  const res = await S3.send(putCommand);
  return res;
};

export default uploadImage;
