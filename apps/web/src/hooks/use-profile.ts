/**
 * useProfile Hook
 *
 * Fetches the current user's profile using TanStack Query.
 */

import { API_ENDPOINTS } from '@/constants/endpoints';
import { ApiError, createAuthenticatedApi } from '@/lib/api';
import {
  queryKeys,
  queryOptions,
  staticQueryPreset,
  useQuery,
} from '@/lib/tanstack';
import type { User } from '@/types';

/**
 * Fetch user profile from API
 */
async function fetchProfile(): Promise<User> {
  const api = createAuthenticatedApi();
  const response = await api.get<User>(API_ENDPOINTS.AUTH.PROFILE);

  if (!response.ok) {
    throw new ApiError(
      response.problem || 'Failed to fetch profile',
      response.problem ?? 'Failed to fetch profile',
      response.status,
    );
  }

  if (!response.data) {
    throw new ApiError('No profile data received');
  }

  return response.data;
}

/**
 * Query options for fetching user profile
 */
export const profileQueryOptions = queryOptions({
  queryKey: queryKeys.auth.profile(),
  queryFn: fetchProfile,
  ...staticQueryPreset,
  // Retry on 401 is pointless (auth error)
  retry: (failureCount, error) => {
    if (error instanceof ApiError && error.status === 401) return false;
    return failureCount < 3;
  },
});

/**
 * Hook to fetch the current user's profile
 *
 * @example
 * ```tsx
 * function ProfileDisplay() {
 *   const { data: user, isLoading, error } = useProfile();
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <div>
 *       <p>{user.first_name} {user.last_name}</p>
 *       <p>{user.email}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useProfile() {
  return useQuery(profileQueryOptions);
}
