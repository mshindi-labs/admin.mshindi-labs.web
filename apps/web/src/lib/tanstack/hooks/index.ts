/**
 * TanStack Query - Custom Hooks
 *
 * Re-exports TanStack Query hooks with additional custom hooks.
 * Import hooks from this file for consistent usage across the app.
 */

// ============================================================================
// Re-export TanStack Query Hooks
// ============================================================================

export {
  // Core hooks
  useQuery,
  useQueries,
  useMutation,
  useInfiniteQuery,
  useSuspenseQuery,
  useSuspenseQueries,
  useSuspenseInfiniteQuery,

  // Query client hooks
  useQueryClient,

  // State hooks
  useIsFetching,
  useIsMutating,
  useMutationState,

  // Prefetching
  usePrefetchQuery,
  usePrefetchInfiniteQuery,
} from '@tanstack/react-query';

// ============================================================================
// Custom Hook Types
// ============================================================================

export type {
  UseQueryResult,
  UseQueryOptions,
  UseMutationResult,
  UseMutationOptions,
  UseInfiniteQueryResult,
  UseInfiniteQueryOptions,
  UseSuspenseQueryResult,
  UseSuspenseQueryOptions,
  QueryObserverResult,
  MutationObserverResult,
} from '@tanstack/react-query';
