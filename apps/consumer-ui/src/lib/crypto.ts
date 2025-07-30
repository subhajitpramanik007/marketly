import CryptoJS from 'crypto-js';

class Crypto {
  private key: string;
  constructor(key: string = 'secret-key') {
    this.key = key;
  }

  encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.key).toString();
  }

  decrypt(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, this.key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}

export const crypto = new Crypto();
export default Crypto;