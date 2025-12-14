/**
 * useLeagueStar Hook
 *
 * Mutations for starring and unstarring leagues.
 */

import { API_ENDPOINTS } from '@/constants/endpoints';
import { ApiError, createAuthenticatedApi } from '@/lib/api';
import {
  createMutationOptions,
  queryKeys,
  useMutation,
  useQueryClient,
} from '@/lib/tanstack';

/**
 * Star a league
 */
async function starLeague(id: string): Promise<unknown> {
  const api = createAuthenticatedApi();
  const response = await api.put(API_ENDPOINTS.TACTIKA.LEAGUES.STAR(id));

  if (!response.ok) {
    throw new ApiError(
      response.problem || 'Failed to star league',
      response.problem ?? 'Failed to star league',
      response.status,
    );
  }

  return response.data;
}

/**
 * Unstar a league
 */
async function unstarLeague(id: string): Promise<unknown> {
  const api = createAuthenticatedApi();
  const response = await api.put(API_ENDPOINTS.TACTIKA.LEAGUES.UNSTAR(id));

  if (!response.ok) {
    throw new ApiError(
      response.problem || 'Failed to unstar league',
      response.problem ?? 'Failed to unstar league',
      response.status,
    );
  }

  return response.data;
}

/**
 * Hook to star a league
 */
export function useStarLeague() {
  const queryClient = useQueryClient();

  return useMutation(
    createMutationOptions({
      mutationFn: starLeague,
      toast: {
        successMessage: 'League starred successfully',
        errorMessage: (error) =>
          error instanceof ApiError ? error.message : 'Failed to star league',
      },
      cache: {
        invalidateKeys: [queryKeys.tactika.leagues.all()],
        awaitInvalidation: false,
      },
    })(queryClient),
  );
}

/**
 * Hook to unstar a league
 */
export function useUnstarLeague() {
  const queryClient = useQueryClient();

  return useMutation(
    createMutationOptions({
      mutationFn: unstarLeague,
      toast: {
        successMessage: 'League unstarred successfully',
        errorMessage: (error) =>
          error instanceof ApiError ? error.message : 'Failed to unstar league',
      },
      cache: {
        invalidateKeys: [queryKeys.tactika.leagues.all()],
        awaitInvalidation: false,
      },
    })(queryClient),
  );
}
