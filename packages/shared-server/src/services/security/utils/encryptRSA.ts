import crypto, { RsaPublicKey } from "crypto";

export const encrypt = (publicKey: RsaPublicKey, plaintext: string | Buffer | Uint8Array) => {
  const data = typeof plaintext === "string" ? Buffer.from(plaintext) : plaintext;
  return crypto.publicEncrypt(publicKey, data as Uint8Array);
};
