/**
 * useFixtureRounds Hook
 *
 * Fetches fixture rounds data using TanStack Query.
 */

import { API_ENDPOINTS } from '@/constants/endpoints';
import { ApiError, createAuthenticatedApi } from '@/lib/api';
import { queryKeys, queryOptions, useQuery } from '@/lib/tanstack';
import type {
  FixtureRoundsResponse,
  FixtureRoundsParams,
} from '@/types/fixture-round';

/**
 * Fetch fixture rounds data from API
 */
async function fetchFixtureRounds(
  params?: FixtureRoundsParams,
): Promise<FixtureRoundsResponse> {
  const api = createAuthenticatedApi();
  const searchParams = new URLSearchParams();

  // Add query parameters
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // Convert boolean to string for API
      if (typeof value === 'boolean') {
        searchParams.set(key, String(value));
      } else {
        searchParams.set(key, String(value));
      }
    }
  });

  const queryString = searchParams.toString();
  const url = queryString
    ? `${API_ENDPOINTS.TACTIKA.SPORTS.FIXTURES_ROUNDS}?${queryString}`
    : API_ENDPOINTS.TACTIKA.SPORTS.FIXTURES_ROUNDS;

  const response = await api.get<FixtureRoundsResponse>(url);

  if (!response.ok) {
    throw new ApiError(
      response.problem || 'Failed to fetch fixture rounds',
      response.problem ?? 'Failed to fetch fixture rounds',
      response.status,
    );
  }

  if (!response.data) {
    throw new ApiError('No fixture rounds data received');
  }

  return response.data;
}

/**
 * Query options for fetching fixture rounds data
 */
export function fixtureRoundsQueryOptions(params?: FixtureRoundsParams) {
  return queryOptions({
    queryKey: queryKeys.tactika.sports.fixturesRounds(params),
    queryFn: () => fetchFixtureRounds(params),
    staleTime: 5 * 60 * 1000, // 5 minutes - rounds don't change often
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

/**
 * Hook to fetch fixture rounds data
 *
 * @example
 * ```tsx
 * function FixtureRoundsSelect() {
 *   const { data, isLoading, error } = useFixtureRounds({
 *     league: '39',
 *     season: '2025',
 *     current: true,
 *   });
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <Select>
 *       {data.data.map((round) => (
 *         <SelectItem key={round} value={round}>
 *           {round}
 *         </SelectItem>
 *       ))}
 *     </Select>
 *   );
 * }
 * ```
 */
export function useFixtureRounds(params?: FixtureRoundsParams) {
  return useQuery(fixtureRoundsQueryOptions(params));
}
