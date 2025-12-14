/**
 * usePredictions Hook
 *
 * Fetches predictions data using TanStack Query with pagination support.
 */

import { API_ENDPOINTS } from '@/constants/endpoints';
import { ApiError, createAuthenticatedApi } from '@/lib/api';
import { queryKeys, queryOptions, useQuery } from '@/lib/tanstack';
import type { PredictionsParams, PredictionsResponse } from '@/types';

/**
 * Fetch predictions from API
 */
async function fetchPredictions(
  params?: PredictionsParams,
): Promise<PredictionsResponse> {
  const api = createAuthenticatedApi();
  const searchParams = new URLSearchParams();

  if (params?.page) {
    searchParams.set('page', params.page.toString());
  }
  if (params?.limit) {
    searchParams.set('limit', params.limit.toString());
  }
  if (params?.sort) {
    searchParams.set('sort', params.sort);
  }
  if (params?.order) {
    searchParams.set('order', params.order);
  }

  // Add any additional query parameters
  Object.entries(params || {}).forEach(([key, value]) => {
    if (
      key !== 'page' &&
      key !== 'limit' &&
      key !== 'sort' &&
      key !== 'order' &&
      value !== undefined
    ) {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  const url = queryString
    ? `${API_ENDPOINTS.TACTIKA.ANALYTICS.PREDICTIONS}?${queryString}`
    : API_ENDPOINTS.TACTIKA.ANALYTICS.PREDICTIONS;

  const response = await api.get<PredictionsResponse>(url);

  if (!response.ok) {
    throw new ApiError(
      response.problem || 'Failed to fetch predictions',
      response.problem ?? 'Failed to fetch predictions',
      response.status,
    );
  }

  if (!response.data) {
    throw new ApiError('No predictions data received');
  }

  return response.data;
}

/**
 * Query options for fetching predictions
 */
export function predictionsQueryOptions(params?: PredictionsParams) {
  return queryOptions({
    queryKey: queryKeys.tactika.analytics.predictions(params),
    queryFn: () => fetchPredictions(params),
    staleTime: 30 * 1000, // 30 seconds - predictions can change frequently
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch predictions data
 *
 * @param params - Query parameters for pagination and filtering
 *
 * @example
 * ```tsx
 * function PredictionsTable() {
 *   const { data, isLoading, error } = usePredictions({ page: 1, limit: 10 });
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <div>
 *       {data.records.map((prediction) => (
 *         <div key={prediction._id}>{prediction.home_team_name} vs {prediction.away_team_name}</div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function usePredictions(params?: PredictionsParams) {
  return useQuery(predictionsQueryOptions(params));
}
