/**
 * TanStack Query - Query Options Factory
 *
 * Type-safe query options helpers following TanStack Query v5 patterns.
 * Use these factories to create reusable, type-safe query configurations.
 *
 * @see https://tanstack.com/query/v5/docs/framework/react/guides/query-options
 */

import {
  infiniteQueryOptions,
  type QueryFunctionContext,
  type QueryKey,
  queryOptions,
} from '@tanstack/react-query';
import type { InfinitePageResponse } from './types';

// ============================================================================
// Re-export core functions for direct usage
// ============================================================================

/**
 * Re-export queryOptions for direct usage
 * This is the recommended way to create query options in TanStack Query v5
 *
 * @example
 * ```ts
 * const userOptions = queryOptions({
 *   queryKey: queryKeys.auth.profile(),
 *   queryFn: () => fetchUserProfile(),
 *   staleTime: 5 * 60 * 1000,
 * });
 *
 * // Use with useQuery
 * const { data } = useQuery(userOptions);
 *
 * // Use with prefetchQuery
 * await queryClient.prefetchQuery(userOptions);
 *
 * // Use with setQueryData
 * queryClient.setQueryData(userOptions.queryKey, newData);
 * ```
 */
export { queryOptions, infiniteQueryOptions };

// ============================================================================
// Query Option Presets
// ============================================================================

/**
 * Preset options for static/rarely changing data
 * - Long stale time (10 minutes)
 * - Long cache time (30 minutes)
 * - No refetch on window focus
 *
 * Use for: configuration data, reference data, user preferences
 */
export const staticQueryPreset = {
  staleTime: 10 * 60 * 1000, // 10 minutes
  gcTime: 30 * 60 * 1000, // 30 minutes
  refetchOnWindowFocus: false,
  refetchOnMount: false as const,
} as const;

/**
 * Preset options for dynamic/frequently changing data
 * - Short stale time (30 seconds)
 * - Standard cache time (5 minutes)
 * - Refetch on window focus
 *
 * Use for: real-time data, dashboards, live updates
 */
export const dynamicQueryPreset = {
  staleTime: 30 * 1000, // 30 seconds
  gcTime: 5 * 60 * 1000, // 5 minutes
  refetchOnWindowFocus: true,
  refetchOnMount: true as const,
} as const;

/**
 * Preset options for real-time data
 * - Very short stale time (10 seconds)
 * - Short cache time (1 minute)
 * - Aggressive refetching
 *
 * Use for: live scores, notifications, chat messages
 */
export const realtimeQueryPreset = {
  staleTime: 10 * 1000, // 10 seconds
  gcTime: 60 * 1000, // 1 minute
  refetchOnWindowFocus: true,
  refetchOnMount: true as const,
  refetchOnReconnect: true,
  refetchInterval: 30 * 1000, // Poll every 30 seconds
} as const;

/**
 * Preset options for one-time fetches
 * - Infinite stale time (never stale)
 * - Long cache time (1 hour)
 * - No automatic refetching
 *
 * Use for: immutable data, historical records, static content
 */
export const immutableQueryPreset = {
  staleTime: Number.POSITIVE_INFINITY,
  gcTime: 60 * 60 * 1000, // 1 hour
  refetchOnWindowFocus: false,
  refetchOnMount: false as const,
  refetchOnReconnect: false,
} as const;

// ============================================================================
// Query Option Factory Helpers
// ============================================================================

/**
 * Creates query options with static preset applied
 *
 * @example
 * ```ts
 * const configOptions = createStaticQueryOptions(
 *   queryKeys.config.all,
 *   () => fetchConfig()
 * );
 * ```
 */
export function createStaticQueryOptions<
  TQueryFnData,
  TQueryKey extends QueryKey,
>(queryKey: TQueryKey, queryFn: () => Promise<TQueryFnData>) {
  return queryOptions({
    queryKey,
    queryFn,
    ...staticQueryPreset,
  });
}

/**
 * Creates query options with dynamic preset applied
 *
 * @example
 * ```ts
 * const dashboardOptions = createDynamicQueryOptions(
 *   queryKeys.dashboard.stats(),
 *   () => fetchDashboardStats()
 * );
 * ```
 */
export function createDynamicQueryOptions<
  TQueryFnData,
  TQueryKey extends QueryKey,
>(queryKey: TQueryKey, queryFn: () => Promise<TQueryFnData>) {
  return queryOptions({
    queryKey,
    queryFn,
    ...dynamicQueryPreset,
  });
}

/**
 * Creates query options with realtime preset applied
 *
 * @example
 * ```ts
 * const liveScoresOptions = createRealtimeQueryOptions(
 *   queryKeys.scores.live(),
 *   () => fetchLiveScores()
 * );
 * ```
 */
export function createRealtimeQueryOptions<
  TQueryFnData,
  TQueryKey extends QueryKey,
>(queryKey: TQueryKey, queryFn: () => Promise<TQueryFnData>) {
  return queryOptions({
    queryKey,
    queryFn,
    ...realtimeQueryPreset,
  });
}

/**
 * Creates query options with immutable preset applied
 *
 * @example
 * ```ts
 * const historicalDataOptions = createImmutableQueryOptions(
 *   queryKeys.history.record(recordId),
 *   () => fetchHistoricalRecord(recordId)
 * );
 * ```
 */
export function createImmutableQueryOptions<
  TQueryFnData,
  TQueryKey extends QueryKey,
>(queryKey: TQueryKey, queryFn: () => Promise<TQueryFnData>) {
  return queryOptions({
    queryKey,
    queryFn,
    ...immutableQueryPreset,
  });
}

// ============================================================================
// Infinite Query Helpers
// ============================================================================

/**
 * Creates infinite query options for cursor-based pagination
 *
 * @example
 * ```ts
 * const postsInfiniteOptions = createCursorInfiniteQueryOptions({
 *   queryKey: queryKeys.posts.list(),
 *   queryFn: (cursor) => fetchPosts(cursor),
 *   getNextCursor: (lastPage) => lastPage.nextCursor,
 * });
 *
 * const { data, fetchNextPage } = useInfiniteQuery(postsInfiniteOptions);
 * ```
 */
export function createCursorInfiniteQueryOptions<
  TData,
  TQueryKey extends QueryKey,
  TCursor extends string | number | null | undefined = string | undefined,
>(config: {
  queryKey: TQueryKey;
  queryFn: (cursor: TCursor) => Promise<InfinitePageResponse<TData>>;
  getNextCursor: (lastPage: InfinitePageResponse<TData>) => TCursor;
  initialCursor?: TCursor;
  staleTime?: number;
  gcTime?: number;
}) {
  return infiniteQueryOptions({
    queryKey: config.queryKey,
    queryFn: (context: QueryFunctionContext<TQueryKey, TCursor>) =>
      config.queryFn(context.pageParam as TCursor),
    initialPageParam: (config.initialCursor ?? undefined) as TCursor,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) return undefined;
      return config.getNextCursor(lastPage);
    },
    staleTime: config.staleTime,
    gcTime: config.gcTime,
  });
}

/**
 * Creates infinite query options for offset-based pagination
 *
 * @example
 * ```ts
 * const usersInfiniteOptions = createOffsetInfiniteQueryOptions({
 *   queryKey: queryKeys.users.list(),
 *   queryFn: (page) => fetchUsers(page),
 *   pageSize: 20,
 * });
 *
 * const { data, fetchNextPage } = useInfiniteQuery(usersInfiniteOptions);
 * ```
 */
export function createOffsetInfiniteQueryOptions<
  TData,
  TQueryKey extends QueryKey,
>(config: {
  queryKey: TQueryKey;
  queryFn: (page: number) => Promise<InfinitePageResponse<TData>>;
  pageSize?: number;
  staleTime?: number;
  gcTime?: number;
}) {
  return infiniteQueryOptions({
    queryKey: config.queryKey,
    queryFn: (context: QueryFunctionContext<TQueryKey, number>) =>
      config.queryFn(context.pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.hasMore) return undefined;
      return lastPageParam + 1;
    },
    staleTime: config.staleTime,
    gcTime: config.gcTime,
  });
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Creates a parameterized query options factory
 *
 * @example
 * ```ts
 * const teamInfoOptions = createParameterizedQuery(
 *   (teamId: string) => queryKeys.tactika.analytics.teamInfo(teamId),
 *   (teamId: string) => fetchTeamInfo(teamId)
 * );
 *
 * // Usage
 * const { data } = useQuery(teamInfoOptions("team-123"));
 * ```
 */
export function createParameterizedQuery<
  TParams extends unknown[],
  TQueryFnData,
  TQueryKey extends QueryKey,
>(
  getQueryKey: (...params: TParams) => TQueryKey,
  getQueryFn: (...params: TParams) => () => Promise<TQueryFnData>,
  options?: {
    staleTime?: number;
    gcTime?: number;
    refetchOnWindowFocus?: boolean;
  },
) {
  return (...params: TParams) =>
    queryOptions({
      queryKey: getQueryKey(...params),
      queryFn: getQueryFn(...params),
      ...options,
    });
}

/**
 * Combines multiple query option objects, with later options taking precedence
 */
export function mergeQueryOptions<T extends Record<string, unknown>>(
  ...optionsList: Partial<T>[]
): Partial<T> {
  return Object.assign({}, ...optionsList);
}
