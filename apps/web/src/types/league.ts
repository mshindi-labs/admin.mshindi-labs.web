/**
 * League Types
 *
 * Type definitions for Tactika league data structures.
 */

/**
 * League item structure
 */
export interface League {
  _id: string;
  league_id: number;
  league_name: string;
  league_type: string;
  league_logo: string;
  country_name: string;
  country_code: string;
  country_flag: string;
  last_synced_at: string;
  sync_source: string;
  is_active: boolean;
  is_deleted: boolean;
  is_starred: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * League list response structure
 */
export interface LeaguesResponse {
  page: number;
  limit: number;
  count: number;
  pages: number;
  items_per_page: number;
  has_next_page: boolean;
  has_prev_page: boolean;
  records: League[];
}

/**
 * League query parameters
 */
export interface LeaguesParams {
  page?: number;
  limit?: number;
  [key: string]: unknown;
}
