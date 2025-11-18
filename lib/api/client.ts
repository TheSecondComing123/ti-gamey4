/**
 * API client configuration and utilities
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

/**
 * Custom fetch wrapper with error handling
 */
export async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  let url = `${API_BASE_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
    ...fetchOptions,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * GET request helper
 */
export async function get<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T> {
  return fetchAPI<T>(endpoint, { method: "GET", params });
}

/**
 * POST request helper
 */
export async function post<T>(endpoint: string, data: unknown): Promise<T> {
  return fetchAPI<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * PUT request helper
 */
export async function put<T>(endpoint: string, data: unknown): Promise<T> {
  return fetchAPI<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request helper
 */
export async function del<T>(endpoint: string): Promise<T> {
  return fetchAPI<T>(endpoint, { method: "DELETE" });
}
