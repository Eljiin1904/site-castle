import { Http } from "@client/services/http";

export function setBaseTier(data: {
  userId: string;
  baseTier: number | undefined;
}): Promise<void> {
  return Http.post("/affiliates/set-base-tier", data);
}
