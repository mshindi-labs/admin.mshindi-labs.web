/**
 * useTopPicks Hook
 *
 * Fetches top picks data using TanStack Query.
 */

import { API_ENDPOINTS } from '@/constants/endpoints';
import { ApiError, createAuthenticatedApi } from '@/lib/api';
import { queryKeys, queryOptions, useQuery } from '@/lib/tanstack';
import type { TopPicksResponse } from '@/types/top-picks';

/**
 * Fetch top picks from API
 */
async function fetchTopPicks(): Promise<TopPicksResponse> {
  const api = createAuthenticatedApi();

  const response = await api.get<TopPicksResponse>(
    API_ENDPOINTS.TACTIKA.ANALYTICS.PREDICTIONS_TOP_PICKS,
  );

  if (!response.ok) {
    throw new ApiError(
      response.problem || 'Failed to fetch top picks',
      response.problem ?? 'Failed to fetch top picks',
      response.status,
    );
  }

  if (!response.data) {
    throw new ApiError('No top picks data received');
  }

  return response.data;
}

/**
 * Query options for fetching top picks
 */
export function topPicksQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.tactika.analytics.predictionsTopPicks(),
    queryFn: () => fetchTopPicks(),
    staleTime: 30 * 1000, // 30 seconds - top picks can change frequently
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch top picks data
 *
 * @example
 * ```tsx
 * function TopPicksTable() {
 *   const { data, isLoading, error } = useTopPicks();
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <div>
 *       {data.hottest.map((pick) => (
 *         <div key={pick.fixture_id}>
 *           {pick.home_team} vs {pick.away_team}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useTopPicks() {
  return useQuery(topPicksQueryOptions());
}
