import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { bucket } from "../constants/bucket";
import { s3 } from "./s3";

export async function deleteObject({ key }: { key: string }) {
  await s3().send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
  );
}
