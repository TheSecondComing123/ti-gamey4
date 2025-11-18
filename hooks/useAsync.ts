"use client";

import { useState } from "react";

interface UseAsyncOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook for handling async operations with loading and error states
 */
export function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  options?: UseAsyncOptions<T>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = async (...args: any[]) => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFunction(...args);
      setData(result);
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("An error occurred");
      setError(error);
      options?.onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, data };
}
