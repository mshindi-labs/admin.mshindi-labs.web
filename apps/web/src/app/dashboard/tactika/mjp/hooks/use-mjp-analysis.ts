/**
 * useMjpAnalysis Hook
 *
 * Fetches Mega Jackpot analysis data using TanStack Query with pagination support.
 */

import { API_ENDPOINTS } from '@/constants/endpoints';
import { ApiError, createAuthenticatedApi } from '@/lib/api';
import { queryKeys, queryOptions, useQuery } from '@/lib/tanstack';
import type { MjpAnalysisParams, MjpAnalysisResponse } from '@/types';

/**
 * Fetch MJP analysis data from API
 */
async function fetchMjpAnalysis(
  params?: MjpAnalysisParams,
): Promise<MjpAnalysisResponse> {
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
    ? `${API_ENDPOINTS.TACTIKA.ANALYTICS.JACKPOT_ANALYSES}?${queryString}`
    : API_ENDPOINTS.TACTIKA.ANALYTICS.JACKPOT_ANALYSES;

  const response = await api.get<MjpAnalysisResponse>(url);

  if (!response.ok) {
    throw new ApiError(
      response.problem || 'Failed to fetch MJP analysis data',
      response.problem ?? 'Failed to fetch MJP analysis data',
      response.status,
    );
  }

  if (!response.data) {
    throw new ApiError('No MJP analysis data received');
  }

  return response.data;
}

/**
 * Query options for fetching MJP analysis data
 */
export function mjpAnalysisQueryOptions(params?: MjpAnalysisParams) {
  return queryOptions({
    queryKey: queryKeys.tactika.analytics.jackpotAnalyses(params),
    queryFn: () => fetchMjpAnalysis(params),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch MJP analysis data
 *
 * @param params - Query parameters for pagination and filtering
 *
 * @example
 * ```tsx
 * function MjpAnalysisTable() {
 *   const { data, isLoading, error } = useMjpAnalysis({ page: 1, limit: 10 });
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <div>
 *       {data.records.map((analysis) => (
 *         <div key={analysis.request_id}>
 *           {analysis.analysis_type} - {analysis.fixture_count} fixtures
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useMjpAnalysis(params?: MjpAnalysisParams) {
  return useQuery(mjpAnalysisQueryOptions(params));
}
