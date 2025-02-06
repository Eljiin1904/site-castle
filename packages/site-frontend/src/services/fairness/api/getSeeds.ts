import { Http } from "@client/services/http";

export function getSeeds(): Promise<{
  clientSeed: string;
  serverSeedHashed: string;
  nextServerSeedHashed: string;
  nonce: number;
}> {
  return Http.post("/fairness/get-seeds");
}
