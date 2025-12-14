/**
 * Country Types
 *
 * Type definitions for Tactika country data structures.
 */

/**
 * Country item structure
 */
export interface Country {
  name: string;
  code: string | null;
  flag: string | null;
}

/**
 * Countries response structure
 */
export interface CountriesResponse {
  data: Country[];
  paging: {
    current: number;
    total: number;
  };
  results: number;
  parameters: unknown[];
  errors: unknown[];
  problem: string | null;
}

/**
 * Countries query parameters
 */
export interface CountriesParams {
  [key: string]: unknown;
}
