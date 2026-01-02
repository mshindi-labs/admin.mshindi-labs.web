/**
 * useComboPrediction Hook
 *
 * Mutation for predicting combo matches from fixture IDs.
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
 * Request payload for combo predictions
 */
export interface ComboPredictionRequest {
  fixture_ids: number[];
}

/**
 * Predict combo matches
 */
async function predictCombo(
  payload: ComboPredictionRequest,
): Promise<unknown> {
  const api = createAuthenticatedApi();
  const response = await api.post(
    API_ENDPOINTS.TACTIKA.ANALYTICS.COMBO_PREDICTIONS,
    payload,
  );

  if (!response.ok) {
    throw new ApiError(
      response.problem || 'Failed to predict combo',
      response.problem ?? 'Failed to predict combo',
      response.status,
    );
  }

  return response.data;
}

/**
 * Hook to predict combo matches
 */
export function useComboPrediction() {
  const queryClient = useQueryClient();

  return useMutation(
    createMutationOptions({
      mutationFn: predictCombo,
      toast: {
        errorMessage: (error) =>
          error instanceof ApiError
            ? error.message
            : 'Failed to predict combo',
      },
      cache: {
        invalidateKeys: [queryKeys.tactika.analytics.all()],
        awaitInvalidation: false,
      },
    })(queryClient),
  );
}
