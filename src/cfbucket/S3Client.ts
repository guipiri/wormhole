import { S3Client } from '@aws-sdk/client-s3';
import { ICfBucketConfig } from './cfbucket.config';

// const accessKeyId = 'ea1fadcc588e4f50fa91775571b1ddc1';
// const secretAccessKey =
//   'a7cda5a10f20ed3f694b255dc9438e4c1cadcd3ca802faaa49c662bd9181aa1a';
// const folder = 'share-files';
// const url = 'https://c432a6fff8e9e38767fd55e7f046d08b.r2.cloudflarestorage.com';

const S3 = (config: Omit<ICfBucketConfig, 'publicUrl'>) => {
  const { accessKeyId, secretAccessKey, endpoint } = config;
  return new S3Client({
    region: 'auto',
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
};

export default S3;
