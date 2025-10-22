import { useCallback, useEffect, useState } from "react";

interface StorageOptions {
  secondsTillExpiry?: number;
}

interface StorageValue<T> {
  value: T;
  expiry?: number;
}

class Storage {
  load<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) {
        return defaultValue;
      }

      const parsed = JSON.parse(item) as StorageValue<T>;

      if (parsed.expiry && Date.now() > parsed.expiry) {
        localStorage.removeItem(key);
        return defaultValue;
      }

      return parsed.value;
    } catch {
      return defaultValue;
    }
  }

  loadAsString(key: string): string | null {
    return localStorage.getItem(key);
  }

  save<T>(key: string, value: T, options?: StorageOptions): void {
    try {
      const storageValue: StorageValue<T> = {
        value,
        ...(options?.secondsTillExpiry && {
          expiry: Date.now() + options.secondsTillExpiry * 1000,
        }),
      };
      localStorage.setItem(key, JSON.stringify(storageValue));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}

const storage = new Storage();

export function useReactPersist<T>(
  key: string,
  defaultValue: T,
  options?: StorageOptions,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => storage.load(key, defaultValue));

  useEffect(() => {
    storage.save(key, state, options);
  }, [key, state, options]);

  const setPersistedState = useCallback((value: T | ((prev: T) => T)) => {
    setState((prevState) => {
      const newState =
        typeof value === "function"
          ? (value as (prev: T) => T)(prevState)
          : value;
      return newState;
    });
  }, []);

  return [state, setPersistedState];
}

export default storage;
