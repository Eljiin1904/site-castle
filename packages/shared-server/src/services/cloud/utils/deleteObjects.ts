import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { bucket } from "../constants/bucket";
import { s3 } from "./s3";

export async function deleteObjects({ keys }: { keys: string[] }) {
  await s3().send(
    new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: { Objects: keys.map((x) => ({ Key: x })) },
    }),
  );
}
