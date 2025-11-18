/**
 * API response types
 */

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface APIError {
  success: false;
  error: string;
  code?: string;
  statusCode: number;
}
