/**
 * TanStack Query - Query Client Configuration
 *
 * SSR-safe QueryClient factory with optimized defaults for Next.js App Router.
 * Following TanStack Query v5 best practices for server/client rendering.
 */

import { isServer, QueryClient } from '@tanstack/react-query';
import type { ApiError } from './types';

// ============================================================================
// Default Configuration
// ============================================================================

/**
 * Default stale time for queries (60 seconds)
 * With SSR, we want to avoid refetching immediately on the client
 */
const DEFAULT_STALE_TIME = 60 * 1000;

/**
 * Default garbage collection time (5 minutes)
 * How long unused/inactive cache data remains in memory
 */
const DEFAULT_GC_TIME = 5 * 60 * 1000;

/**
 * Maximum retry attempts for failed queries
 */
const DEFAULT_RETRY_COUNT = 3;

/**
 * Exponential backoff delay calculator
 * Caps at 30 seconds max delay
 */
function getRetryDelay(attemptIndex: number): number {
  return Math.min(1000 * 2 ** attemptIndex, 30000);
}

/**
 * Determine if an error should trigger a retry
 * Don't retry on 4xx errors (client errors) except 408 (timeout) and 429 (rate limit)
 */
function shouldRetry(failureCount: number, error: unknown): boolean {
  if (failureCount >= DEFAULT_RETRY_COUNT) return false;

  // Check for HTTP status codes that shouldn't be retried
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as { status: number }).status;
    // Don't retry client errors except timeout and rate limiting
    if (status >= 400 && status < 500 && status !== 408 && status !== 429) {
      return false;
    }
  }

  return true;
}

// ============================================================================
// Query Client Factory
// ============================================================================

/**
 * Creates a new QueryClient with optimized defaults
 *
 * @param overrides - Optional configuration overrides
 * @returns Configured QueryClient instance
 */
export function makeQueryClient(overrides?: {
  staleTime?: number;
  gcTime?: number;
  retry?:
    | number
    | boolean
    | ((failureCount: number, error: ApiError) => boolean);
}): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Cache configuration
        staleTime: overrides?.staleTime ?? DEFAULT_STALE_TIME,
        gcTime: overrides?.gcTime ?? DEFAULT_GC_TIME,

        // Retry configuration with exponential backoff
        retry: overrides?.retry ?? shouldRetry,
        retryDelay: getRetryDelay,

        // Refetch behavior - conservative defaults for better UX
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: true,

        // Network mode - pause queries when offline
        networkMode: 'online',
      },
      mutations: {
        // Mutations don't retry by default (they're not idempotent)
        retry: false,

        // Network mode for mutations
        networkMode: 'online',
      },
    },
  });
}

// ============================================================================
// Singleton Pattern for Browser
// ============================================================================

/**
 * Browser-side QueryClient singleton
 * Prevents creating multiple clients during React hydration
 */
let browserQueryClient: QueryClient | undefined;

/**
 * Gets or creates the QueryClient instance
 *
 * - Server: Always creates a new QueryClient (prevents data leaking between requests)
 * - Browser: Reuses singleton to prevent issues with React Suspense
 *
 * @returns QueryClient instance
 */
export function getQueryClient(): QueryClient {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  }

  // Browser: make a new query client if we don't already have one
  // This is important to avoid re-creating client if React suspends during initial render
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Clears the browser query client singleton
 * Useful for testing or when you need to reset the client
 */
export function resetQueryClient(): void {
  if (!isServer && browserQueryClient) {
    browserQueryClient.clear();
    browserQueryClient = undefined;
  }
}

/**
 * Gets the current browser query client without creating a new one
 * Returns undefined if no client exists yet
 */
export function getBrowserQueryClient(): QueryClient | undefined {
  return isServer ? undefined : browserQueryClient;
}
