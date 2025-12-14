/**
 * TanStack Query - Public API
 *
 * Central export point for all TanStack Query utilities.
 * Import from '@/lib/tanstack' for all query-related functionality.
 *
 * @example
 * ```ts
 * import {
 *   getQueryClient,
 *   queryKeys,
 *   queryOptions,
 *   useQuery,
 *   useMutation,
 * } from '@/lib/tanstack';
 * ```
 */

// ============================================================================
// Query Client
// ============================================================================

export {
  getBrowserQueryClient,
  getQueryClient,
  makeQueryClient,
  resetQueryClient,
} from './query-client';

// ============================================================================
// Query Keys
// ============================================================================

export type { ExtractQueryKey, QueryKeyFactory } from './keys';
export { queryKeys } from './keys';

// ============================================================================
// Query Options
// ============================================================================

export {
  // Infinite query helpers
  createCursorInfiniteQueryOptions,
  createDynamicQueryOptions,
  createImmutableQueryOptions,
  createOffsetInfiniteQueryOptions,
  // Utility functions
  createParameterizedQuery,
  createRealtimeQueryOptions,
  // Preset builders
  createStaticQueryOptions,
  dynamicQueryPreset,
  immutableQueryPreset,
  infiniteQueryOptions,
  mergeQueryOptions,
  // Core factory functions (re-exported from TanStack Query)
  queryOptions,
  realtimeQueryPreset,
  // Presets
  staticQueryPreset,
} from './query-options';

// ============================================================================
// Mutation Options
// ============================================================================

export type { OptimisticContext } from './mutation-options';
export {
  // Factory functions
  createMutationOptions,
  createOptimisticItemMutation,
  createOptimisticListMutation,
  // Presets
  defaultMutationPreset,
  idempotentMutationPreset,
} from './mutation-options';

// ============================================================================
// Types
// ============================================================================

export type {
  // Error types
  ApiError,
  // API types
  ApiResponse,
  // Entity types
  BaseEntity,
  InfinitePageResponse,
  MutationLoadingState,
  MutationResult,
  PaginatedResponse,
  // State types
  QueryLoadingState,
  QueryResult,
  SoftDeletableEntity,
  ValidationError,
} from './types';

export { isApiError, isValidationError } from './types';

// ============================================================================
// Hooks (Re-exports from TanStack Query)
// ============================================================================

export type {
  MutationObserverResult,
  QueryObserverResult,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from './hooks';
export {
  useInfiniteQuery,
  // State hooks
  useIsFetching,
  useIsMutating,
  useMutation,
  useMutationState,
  usePrefetchInfiniteQuery,
  // Prefetching
  usePrefetchQuery,
  useQueries,
  // Core hooks
  useQuery,
  // Query client hooks
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQueries,
  useSuspenseQuery,
} from './hooks';

// ============================================================================
// TanStack Query Core (for advanced usage)
// ============================================================================

export type {
  DefaultOptions,
  DehydratedState,
  MutationFunction,
  MutationState,
  QueryFunction,
  QueryKey,
  QueryState,
} from '@tanstack/react-query';
export {
  dehydrate,
  HydrationBoundary,
  isServer,
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
