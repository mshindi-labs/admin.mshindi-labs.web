/**
 * useFixtures Hook
 *
 * Fetches fixtures data using TanStack Query.
 */

import { API_ENDPOINTS } from '@/constants/endpoints';
import { ApiError, createAuthenticatedApi } from '@/lib/api';
import { queryKeys, queryOptions, useQuery } from '@/lib/tanstack';
import type { FixturesResponse, FixturesParams } from '@/types/fixture';

/**
 * Fetch fixtures data from API
 */
async function fetchFixtures(
  params?: FixturesParams,
): Promise<FixturesResponse> {
  const api = createAuthenticatedApi();
  const searchParams = new URLSearchParams();

  // Add query parameters
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  const url = queryString
    ? `${API_ENDPOINTS.TACTIKA.SPORTS.FIXTURES}?${queryString}`
    : API_ENDPOINTS.TACTIKA.SPORTS.FIXTURES;

  const response = await api.get<FixturesResponse>(url);

  if (!response.ok) {
    throw new ApiError(
      response.problem || 'Failed to fetch fixtures',
      response.problem ?? 'Failed to fetch fixtures',
      response.status,
    );
  }

  if (!response.data) {
    throw new ApiError('No fixtures data received');
  }

  return response.data;
}

/**
 * Query options for fetching fixtures data
 */
export function fixturesQueryOptions(params?: FixturesParams) {
  return queryOptions({
    queryKey: queryKeys.tactika.sports.fixtures(params),
    queryFn: () => fetchFixtures(params),
    staleTime: 1 * 60 * 1000, // 1 minute - fixtures change frequently
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch fixtures data
 *
 * @example
 * ```tsx
 * function FixturesTable() {
 *   const { data, isLoading, error } = useFixtures({
 *     league: '39',
 *     season: '2025',
 *     round: 'Regular Season - 16',
 *     status: 'NS',
 *   });
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <div>
 *       {data.data.map((fixture) => (
 *         <div key={fixture.fixture.id}>
 *           {fixture.teams.home.name} vs {fixture.teams.away.name}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useFixtures(params?: FixturesParams) {
  return useQuery(fixturesQueryOptions(params));
}
