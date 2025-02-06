import { Http } from "@client/services/http";

export function logError(data: {
  message: string;
  path: string;
  stack: string | undefined;
}): Promise<void> {
  return Http.post("/system/log-error", data);
}
