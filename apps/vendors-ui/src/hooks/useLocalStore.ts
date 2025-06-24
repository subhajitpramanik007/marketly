'use client';

export function useLocalStore() {
  function setItem(key: string, value: string | object) {
    if (typeof value === 'object') {
      value = JSON.stringify({ data: value });
    }
    localStorage.setItem(key, value);
  }

  function getItem<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value).data as T;
  }

  function removeItem(key: string) {
    localStorage.removeItem(key);
  }

  function clear() {
    localStorage.clear();
  }

  return {
    setItem,
    getItem,
    removeItem,
    clear,
  };
}
