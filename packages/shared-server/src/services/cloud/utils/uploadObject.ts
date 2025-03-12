import { PutObjectCommand } from "@aws-sdk/client-s3";
import { bucket } from "../constants/bucket";
import { s3 } from "./s3";

export async function uploadObject({
  key,
  body,
  contentType,
}: {
  key: string;
  body: string | Buffer;
  contentType: string;
}) {
  await s3().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
}
