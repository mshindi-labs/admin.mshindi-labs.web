/**
 * TanStack Query - Shared Types
 *
 * Common TypeScript types for API responses, errors, and query utilities.
 */

import type {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

/**
 * Infinite query page response
 */
export interface InfinitePageResponse<T> {
  data: T[];
  nextCursor?: string | number | null;
  previousCursor?: string | number | null;
  hasMore: boolean;
}

// ============================================================================
// Error Types
// ============================================================================

/**
 * Standard API error structure
 */
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
}

/**
 * Validation error with field-level errors
 */
export interface ValidationError extends ApiError {
  code: 'VALIDATION_ERROR';
  fieldErrors?: Record<string, string[]>;
}

/**
 * Type guard for API errors
 */
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ApiError).message === 'string'
  );
}

/**
 * Type guard for validation errors
 */
export function isValidationError(error: unknown): error is ValidationError {
  return (
    isApiError(error) && (error as ValidationError).code === 'VALIDATION_ERROR'
  );
}

// ============================================================================
// Query Utility Types
// ============================================================================

/**
 * Extract the data type from a query options object
 */
export type QueryData<T extends { queryFn: (...args: unknown[]) => unknown }> =
  Awaited<ReturnType<T['queryFn']>>;

/**
 * Query options without queryKey and queryFn (for extending)
 */
export type QueryOptionsConfig<TData, TError = ApiError> = Omit<
  UseQueryOptions<TData, TError, TData, QueryKey>,
  'queryKey' | 'queryFn'
>;

/**
 * Mutation options without mutationFn (for extending)
 */
export type MutationOptionsConfig<TData, TVariables, TError = ApiError> = Omit<
  UseMutationOptions<TData, TError, TVariables>,
  'mutationFn'
>;

// ============================================================================
// Common Entity Types
// ============================================================================

/**
 * Base entity with common fields
 */
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Entity with optional soft delete
 */
export interface SoftDeletableEntity extends BaseEntity {
  deletedAt?: string | null;
}

// ============================================================================
// Query State Types
// ============================================================================

/**
 * Query loading states for UI rendering
 */
export type QueryLoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Mutation loading states for UI rendering
 */
export type MutationLoadingState = 'idle' | 'pending' | 'success' | 'error';

/**
 * Common query result shape for components
 */
export interface QueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: ApiError | null;
  refetch: () => void;
}

/**
 * Common mutation result shape for components
 */
export interface MutationResult<T, V> {
  data: T | undefined;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: ApiError | null;
  mutate: (variables: V) => void;
  mutateAsync: (variables: V) => Promise<T>;
  reset: () => void;
}
