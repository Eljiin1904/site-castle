import crypto, { RsaPrivateKey } from "crypto";

// export const decrypt = (privateKey: RsaPrivateKey, encrypted: Uint8Array) =>
//   crypto.privateDecrypt(privateKey, encrypted);

export const decrypt = (privateKeyPem: string, encrypted: Uint8Array) => {
  const privateKey = {
    key: privateKeyPem,
    // padding: crypto.constants.RSA_PKCS1_PADDING,
  };

  return crypto.privateDecrypt(privateKey, encrypted);
};
