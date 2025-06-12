import crypto, { KeyLike } from "crypto";

// Verify Signature with Public Key
export const verify = (
  publicKey: KeyLike | string,
  message: string,
  signature: string, // only accept string if using encoding
): boolean => {
  const verifier = crypto.createVerify("sha256");
  verifier.update(message);
  verifier.end();
  return verifier.verify(publicKey, signature, "base64");
};
