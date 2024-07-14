import { S3Client } from '@aws-sdk/client-s3';

// const {
//   CFBUCKETACCESSKEYID, CFBUCKETSECRETACCESSKEY, CFBUCKETFOLDER, CFBUCKETURL,
// } = process.env;

const CFBUCKETACCESSKEYID = 'ea1fadcc588e4f50fa91775571b1ddc1';
const CFBUCKETSECRETACCESSKEY =
  'a7cda5a10f20ed3f694b255dc9438e4c1cadcd3ca802faaa49c662bd9181aa1a';
const CFBUCKETFOLDER = 'dev';
const CFBUCKETURL =
  'https://c432a6fff8e9e38767fd55e7f046d08b.r2.cloudflarestorage.com';

const S3 = new S3Client({
  region: 'auto',
  endpoint: `${CFBUCKETURL}/${CFBUCKETFOLDER}`,
  credentials: {
    accessKeyId: `${CFBUCKETACCESSKEYID}`,
    secretAccessKey: `${CFBUCKETSECRETACCESSKEY}`,
  },
});

export default S3;
