import { Random } from "#server/services/random";

export function getRandomCardIndex({
  serverSeed,
  clientSeed,
  nonce,
  step,
}: {
  serverSeed: string;
  clientSeed: string;
  nonce: string | number;
  step: number;
}) {
  return Random.getRoll({
    serverSeed,
    clientSeed,
    nonce: `${nonce}-${step}`,
    minValue: 0,
    maxValue: 52,
  });
}
