/**
 * Fixture Round Types
 *
 * Type definitions for Tactika fixture rounds data structures.
 */

/**
 * Fixture rounds response structure
 */
export interface FixtureRoundsResponse {
  data: string[];
  paging: {
    current: number;
    total: number;
  };
  results: number;
  parameters: {
    league?: string;
    season?: string;
    current?: string;
    [key: string]: unknown;
  };
  errors: unknown[];
  problem: string | null;
}

/**
 * Fixture rounds query parameters
 */
export interface FixtureRoundsParams {
  league?: string | number;
  season?: string | number;
  current?: boolean | string;
  [key: string]: unknown;
}
