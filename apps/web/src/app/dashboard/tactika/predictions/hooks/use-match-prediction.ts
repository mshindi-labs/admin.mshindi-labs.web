/**
 * useMatchPrediction Hook
 *
 * Fetches match prediction data for a specific fixture using TanStack Query.
 */

import { API_ENDPOINTS } from '@/constants/endpoints';
import { ApiError, createAuthenticatedApi } from '@/lib/api';
import { queryKeys, queryOptions, useQuery } from '@/lib/tanstack';
import type { MatchPredictionResponse } from '@/types/prediction';

/**
 * Fetch match prediction from API
 */
async function fetchMatchPrediction(
  fixtureId: string,
): Promise<MatchPredictionResponse> {
  const api = createAuthenticatedApi();
  const url = API_ENDPOINTS.TACTIKA.ANALYTICS.MATCH_PREDICTION(fixtureId);

  const response = await api.get<MatchPredictionResponse>(url);

  if (!response.ok) {
    throw new ApiError(
      response.problem || 'Failed to fetch match prediction',
      response.problem ?? 'Failed to fetch match prediction',
      response.status,
    );
  }

  if (!response.data) {
    throw new ApiError('No match prediction data received');
  }

  return response.data;
}

/**
 * Query options for fetching match prediction
 */
export function matchPredictionQueryOptions(fixtureId: string) {
  return queryOptions({
    queryKey: queryKeys.tactika.analytics.matchPrediction(fixtureId),
    queryFn: () => fetchMatchPrediction(fixtureId),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!fixtureId,
  });
}

/**
 * Hook to fetch match prediction for a fixture
 */
export function useMatchPrediction(fixtureId: string) {
  return useQuery(matchPredictionQueryOptions(fixtureId));
}
