import { S3Client } from "@aws-sdk/client-s3";
import config from "#server/config";

let instance: S3Client | undefined;

export function s3() {
  if (!instance) {
    instance = new S3Client({
      region: config.awsRegion,
      credentials: {
        accessKeyId: config.awsId,
        secretAccessKey: config.awsSecret,
      },
    });
  }
  return instance;
}
