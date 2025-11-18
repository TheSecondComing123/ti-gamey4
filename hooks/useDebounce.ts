"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Hook for debouncing a value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for throttling a function
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 500
): T {
  const lastRan = useRef(Date.now());

  return ((...args) => {
    if (Date.now() - lastRan.current >= delay) {
      callback(...args);
      lastRan.current = Date.now();
    }
  }) as T;
}
