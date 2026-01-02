/**
 * useMjpAnalysisDetail Hook
 *
 * Fetches detailed Mega Jackpot analysis data by request_id using TanStack Query.
 */

import { API_ENDPOINTS } from '@/constants/endpoints';
import { ApiError, createAuthenticatedApi } from '@/lib/api';
import { queryKeys, queryOptions, useQuery } from '@/lib/tanstack';
import type { MjpAnalysisDetail } from '@/types';

/**
 * Fetch MJP analysis detail from API
 */
async function fetchMjpAnalysisDetail(
  requestId: string,
): Promise<MjpAnalysisDetail> {
  const api = createAuthenticatedApi();
  const url = API_ENDPOINTS.TACTIKA.ANALYTICS.JACKPOT_ANALYSIS_DETAIL(requestId);

  const response = await api.get<MjpAnalysisDetail>(url);

  if (!response.ok) {
    throw new ApiError(
      response.problem || 'Failed to fetch MJP analysis detail',
      response.problem ?? 'Failed to fetch MJP analysis detail',
      response.status,
    );
  }

  if (!response.data) {
    throw new ApiError('No MJP analysis detail received');
  }

  return response.data;
}

/**
 * Query options for fetching MJP analysis detail
 */
export function mjpAnalysisDetailQueryOptions(requestId: string) {
  return queryOptions({
    queryKey: queryKeys.tactika.analytics.jackpotAnalysisDetail(requestId),
    queryFn: () => fetchMjpAnalysisDetail(requestId),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch MJP analysis detail
 *
 * @param requestId - The request ID of the analysis to fetch
 *
 * @example
 * ```tsx
 * function MjpAnalysisDetailPage() {
 *   const { data, isLoading, error } = useMjpAnalysisDetail('request-id-123');
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return <div>{data?.request_id}</div>;
 * }
 * ```
 */
export function useMjpAnalysisDetail(requestId: string) {
  return useQuery(mjpAnalysisDetailQueryOptions(requestId));
}
