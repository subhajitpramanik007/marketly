import Crypto from './crypto';

class LocalStoreData {
  private crypto: Crypto;
  constructor() {
    this.crypto = new Crypto('LocalStoreData');
  }

  private encryptedData(data: string) {
    return this.crypto.encrypt(data);
  }

  private decryptedData(data: string) {
    return this.crypto.decrypt(data);
  }

  get<T>(key: string, encrypted = false) {
    const data = localStorage.getItem(key);
    if (!data) return null;

    const parsed = JSON.parse(data);
    const value = encrypted ? this.decryptedData(parsed.data) : parsed.data;
    return JSON.parse(value) as T;
  }

  set(key: string, value: string, encrypted = false) {
    const data = encrypted ? this.encryptedData(value) : value;
    localStorage.setItem(key, JSON.stringify({ data }));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}

export const localStoreData = new LocalStoreData();
