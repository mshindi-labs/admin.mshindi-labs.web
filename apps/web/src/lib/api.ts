/**
 * API Instance
 *
 * Configured API client using @mshindi-labs/refetch for making authenticated requests.
 */

import { create } from '@mshindi-labs/refetch';
import { BASE_API_URL } from '@/constants/config';
import { getAccessToken } from '@/lib/cookies';

/**
 * Create an authenticated API instance
 * Call this function to get a fresh instance with current auth token
 */
export function createAuthenticatedApi() {
  const accessToken = getAccessToken();

  return create({
    baseURL: BASE_API_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });
}

/**
 * API error class for handling API errors
 */
export class ApiError extends Error {
  status?: number;
  code?: string;
  problem?: string;

  constructor(message: string, problem?: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.problem = problem;
    this.status = status;
  }
}
