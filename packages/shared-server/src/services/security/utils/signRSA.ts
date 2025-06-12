import crypto, { RsaPrivateKey } from "crypto";

// Accept a PEM string
export const sign = (privateKey: string, message: string) => {
  const signer = crypto.createSign("sha256");
  signer.update(message);
  signer.end();
  return signer.sign(privateKey, "base64");
};
