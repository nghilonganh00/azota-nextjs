import * as CryptoJS from "crypto-ts";

export class CryptoUtil {
  static decrypt(key: string, ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
