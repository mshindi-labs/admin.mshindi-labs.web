/**
 * Fixture Types
 *
 * Type definitions for Tactika fixture data structures.
 */

/**
 * Fixture status information
 */
export interface FixtureStatus {
  long: string;
  short: string;
  elapsed: number | null;
  extra: number | null;
}

/**
 * Fixture periods (first and second half)
 */
export interface FixturePeriods {
  first: number | null;
  second: number | null;
}

/**
 * Fixture venue information
 */
export interface FixtureVenue {
  id: number;
  name: string;
  city: string;
}

/**
 * Fixture information
 */
export interface FixtureInfo {
  id: number;
  referee: string | null;
  timezone: string;
  date: string; // ISO 8601 format
  timestamp: number;
  periods: FixturePeriods;
  venue: FixtureVenue;
  status: FixtureStatus;
}

/**
 * League information within fixture
 */
export interface LeagueInfo {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
  standings: boolean;
}

/**
 * Team information
 */
export interface TeamInfo {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

/**
 * Teams (home and away)
 */
export interface Teams {
  home: TeamInfo;
  away: TeamInfo;
}

/**
 * Goals information
 */
export interface Goals {
  home: number | null;
  away: number | null;
}

/**
 * Score period information
 */
export interface ScorePeriod {
  home: number | null;
  away: number | null;
}

/**
 * Score information
 */
export interface Score {
  halftime: ScorePeriod;
  fulltime: ScorePeriod;
  extratime: ScorePeriod;
  penalty: ScorePeriod;
}

/**
 * Complete fixture item
 */
export interface FixtureItem {
  fixture: FixtureInfo;
  league: LeagueInfo;
  teams: Teams;
  goals: Goals;
  score: Score;
}

/**
 * Fixtures response structure
 */
export interface FixturesResponse {
  data: FixtureItem[];
  paging: {
    current: number;
    total: number;
  };
  results: number;
  parameters: {
    league?: string;
    season?: string;
    round?: string;
    status?: string;
    [key: string]: unknown;
  };
  errors: unknown[];
  problem: string | null;
}

/**
 * Fixtures query parameters
 */
export interface FixturesParams {
  league?: string | number;
  season?: string | number;
  round?: string;
  status?: string;
  [key: string]: unknown;
}
