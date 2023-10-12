'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Wrapper for localStorage
 */

class TempStorage {
  interface: typeof localStorage | MemoryStorage;
  constructor() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      this.interface = localStorage;
    } catch (error) {
      this.interface = new MemoryStorage();
    }
  }

  /**
   * Set item into Storage
   * @param key string
   * @param value string, object, array etc.
   * @returns void
   * @example set('user', {email: 'email@email', name: 'John'})
   * */
  set<T>(key: string, value: T) {
    try {
      if (value === undefined) this.remove(key);
      else this.interface.setItem(key, JSON.stringify(value));
    } catch (_er) {
      //nothing
    }
  }

  /**
   * Get item from Storage
   * @param key string
   * @returns string, object, array etc. - (ts: any)
   * @example get('user')
   * */
  get(key: string) {
    try {
      const value = this.interface.getItem(key);
      if (typeof value === 'string') return JSON.parse(value);
    } catch (_er) {
      //nothing
    }
  }

  /**
   * Remove item from Storage
   * @param key string
   * @returns void
   * @example remove('user')
   * */
  remove(key: string) {
    try {
      this.interface.removeItem(key);
    } catch (_er) {
      //nothing
    }
  }

  get storageType() {
    return this.interface instanceof MemoryStorage ? 'memory' : 'local';
  }
}

/**
 * Basic in-memory backup 'storage'
 */
class MemoryStorage {
  private data: Record<string, any> = {};
  getItem(key: string) {
    return this.data[key as keyof typeof this.data] || null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItem(key: string, value: any) {
    return (this.data[key] = String(value));
  }

  removeItem(key: string) {
    return delete this.data[key];
  }
  clear() {
    return (this.data = {});
  }
}

export const STORAGE = new TempStorage();
