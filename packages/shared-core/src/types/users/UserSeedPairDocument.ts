export interface UserSeedPairDocument {
  _id: string;
  userId: string;
  game: "global";
  serverSeed: string;
  nextServerSeed?: string;
  clientSeed: string;
  nonce: number;
  rotateDate: Date;
}
