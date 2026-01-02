/**
 * Fixture Cart Types
 *
 * Type definitions for the fixture cart feature.
 */

/**
 * Cart item representing a fixture selection
 */
export interface FixtureCartItem {
  /** Fixture ID */
  id: number;
  /** Home team name */
  homeTeam: string;
  /** Away team name */
  awayTeam: string;
  /** Timestamp when item was added to cart (ISO 8601 format) */
  addedAt: string;
}
