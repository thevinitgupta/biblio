type EncryptionAlgorithms = "RSA-OAEP";

const encryptData = (
  data: string,
  publicKey: string,
  algorithm: EncryptionAlgorithms
) => {};

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
