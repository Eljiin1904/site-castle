import { Security } from "@server/services/security";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Request } from "express";

const logger = getServerLogger({});

export function validateSignature(req: Request, headerName: string, publicKey: string): boolean {
  const signature = req.headers[headerName] as string;
  if (!signature) {
    logger.error(`Signature not provided!`);
    return false;
  }

  const rawBody = JSON.stringify(req.body);
  const isValid = Security.verify(publicKey, rawBody, signature);

  if (!isValid) {
    logger.error(`Invalid signature`);
  }

  return isValid;
}
