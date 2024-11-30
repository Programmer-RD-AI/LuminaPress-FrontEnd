import CryptoJS from "crypto-js";
import { ENCRYPTION_KEY } from "../config/encryptionConfig";

// Encryption Key (Make sure to keep this secret and not expose it in the front end code)

// Helper function to encrypt data
export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

// Helper function to decrypt data
export const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
