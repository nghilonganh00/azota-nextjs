"use client";

import { useState, useEffect } from "react";

/**
 * useLocalStorage hook
 *
 * @param key localStorage key
 * @param initialValue default value when nothing is stored
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      console.log("item: ", item);
      if (item !== null) {
        setValue(item as T);
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
    setIsReady(true);
  }, [key]);

  const setStoredValue = (newValue: T | ((val: T) => T | null)) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;

      setValue(valueToStore as T);

      if (valueToStore === null) {
        localStorage.removeItem(key);
      } else if (typeof valueToStore === "string") {
        localStorage.setItem(key, valueToStore);
      } else {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [value, setStoredValue, isReady] as const;
}
