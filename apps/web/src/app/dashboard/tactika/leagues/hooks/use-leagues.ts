/**
 * useLeagues Hook
 *
 * Fetches leagues data using TanStack Query.
 */

import { API_ENDPOINTS } from '@/constants/endpoints';
import { ApiError, createAuthenticatedApi } from '@/lib/api';
import { queryKeys, queryOptions, useQuery } from '@/lib/tanstack';
import type { LeaguesResponse, LeaguesParams } from '@/types/league';

/**
 * Fetch leagues data from API
 */
async function fetchLeagues(params?: LeaguesParams): Promise<LeaguesResponse> {
  const api = createAuthenticatedApi();
  const searchParams = new URLSearchParams();

  if (params?.page) {
    searchParams.set('page', params.page.toString());
  }
  if (params?.limit) {
    searchParams.set('limit', params.limit.toString());
  }

  // Add other query parameters
  Object.entries(params || {}).forEach(([key, value]) => {
    if (key !== 'page' && key !== 'limit' && value !== undefined) {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  const url = queryString
    ? `${API_ENDPOINTS.TACTIKA.LEAGUES.LIST}?${queryString}`
    : API_ENDPOINTS.TACTIKA.LEAGUES.LIST;

  const response = await api.get<LeaguesResponse>(url);

  if (!response.ok) {
    throw new ApiError(
      response.problem || 'Failed to fetch leagues',
      response.problem ?? 'Failed to fetch leagues',
      response.status,
    );
  }

  if (!response.data) {
    throw new ApiError('No leagues data received');
  }

  return response.data;
}

/**
 * Query options for fetching leagues data
 */
export function leaguesQueryOptions(params?: LeaguesParams) {
  return queryOptions({
    queryKey: queryKeys.tactika.leagues.list(params),
    queryFn: () => fetchLeagues(params),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch leagues data
 *
 * @example
 * ```tsx
 * function LeaguesTable() {
 *   const { data, isLoading, error } = useLeagues({ page: 1, limit: 10 });
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <div>
 *       {data.records.map((league) => (
 *         <div key={league._id}>{league.league_name}</div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useLeagues(params?: LeaguesParams) {
  return useQuery(leaguesQueryOptions(params));
}
