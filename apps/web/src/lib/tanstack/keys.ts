/**
 * TanStack Query - Query Key Factory
 *
 * Centralized query key management with type-safe, hierarchical key patterns.
 * This pattern ensures consistent cache invalidation and provides excellent DX.
 *
 * @see https://tanstack.com/query/v5/docs/framework/react/guides/query-keys
 */

// ============================================================================
// Query Key Factory
// ============================================================================

/**
 * Centralized query key factory for type-safe, consistent query keys.
 *
 * Usage patterns:
 * - `queryKeys.auth.all` - Invalidate all auth-related queries
 * - `queryKeys.auth.profile()` - Specific profile query key
 * - `queryKeys.tactika.analytics.teamInfo(teamId)` - Team-specific query key
 *
 * Benefits:
 * - Type-safe query keys with autocomplete
 * - Hierarchical invalidation (invalidate parent to clear all children)
 * - Consistent naming across the application
 * - Easy refactoring and maintenance
 */
export const queryKeys = {
  // =========================================================================
  // Authentication
  // =========================================================================
  auth: {
    all: ['auth'] as const,
    profile: () => [...queryKeys.auth.all, 'profile'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
  },

  // =========================================================================
  // Tactika - Analytics
  // =========================================================================
  tactika: {
    all: ['tactika'] as const,

    analytics: {
      all: () => [...queryKeys.tactika.all, 'analytics'] as const,

      // Team endpoints
      teamInfo: (teamId: string) =>
        [...queryKeys.tactika.analytics.all(), 'team-info', teamId] as const,
      teamStatistics: (teamId: string) =>
        [
          ...queryKeys.tactika.analytics.all(),
          'team-statistics',
          teamId,
        ] as const,

      // Match/Fixture endpoints
      headToHead: (homeTeamId: string, awayTeamId: string) =>
        [
          ...queryKeys.tactika.analytics.all(),
          'head-to-head',
          homeTeamId,
          awayTeamId,
        ] as const,
      matchAnalysis: (homeTeamId: string, awayTeamId: string) =>
        [
          ...queryKeys.tactika.analytics.all(),
          'match-analysis',
          homeTeamId,
          awayTeamId,
        ] as const,
      upcomingFixtures: (filters?: Record<string, unknown>) =>
        [
          ...queryKeys.tactika.analytics.all(),
          'upcoming-fixtures',
          filters,
        ] as const,

      // Prediction endpoints
      matchPrediction: (fixtureId: string) =>
        [
          ...queryKeys.tactika.analytics.all(),
          'match-prediction',
          fixtureId,
        ] as const,
      predictions: (filters?: Record<string, unknown>) =>
        [...queryKeys.tactika.analytics.all(), 'predictions', filters] as const,
      predictionsTopPicks: () =>
        [
          ...queryKeys.tactika.analytics.all(),
          'predictions-top-picks',
        ] as const,

      // Daily predictions
      dailyPredictions: {
        all: () =>
          [...queryKeys.tactika.analytics.all(), 'daily-predictions'] as const,
        job: (jobId: string) =>
          [
            ...queryKeys.tactika.analytics.dailyPredictions.all(),
            'job',
            jobId,
          ] as const,
        jobs: () =>
          [
            ...queryKeys.tactika.analytics.dailyPredictions.all(),
            'jobs',
          ] as const,
        stats: () =>
          [
            ...queryKeys.tactika.analytics.dailyPredictions.all(),
            'stats',
          ] as const,
      },
    },

    // =========================================================================
    // Tactika - Leagues
    // =========================================================================
    leagues: {
      all: () => [...queryKeys.tactika.all, 'leagues'] as const,
      list: (filters?: Record<string, unknown>) =>
        [...queryKeys.tactika.leagues.all(), 'list', filters] as const,
      detail: (id: string) =>
        [...queryKeys.tactika.leagues.all(), 'detail', id] as const,
      apiFootball: (leagueId: string) =>
        [...queryKeys.tactika.leagues.all(), 'api-football', leagueId] as const,
    },

    // =========================================================================
    // Tactika - Sports
    // =========================================================================
    sports: {
      all: () => [...queryKeys.tactika.all, 'sports'] as const,

      // General
      timezone: () => [...queryKeys.tactika.sports.all(), 'timezone'] as const,
      countries: (filters?: Record<string, unknown>) =>
        [...queryKeys.tactika.sports.all(), 'countries', filters] as const,

      // Leagues
      leagues: (filters?: Record<string, unknown>) =>
        [...queryKeys.tactika.sports.all(), 'leagues', filters] as const,
      leaguesSeasons: (filters?: Record<string, unknown>) =>
        [
          ...queryKeys.tactika.sports.all(),
          'leagues-seasons',
          filters,
        ] as const,

      // Teams
      teams: (filters?: Record<string, unknown>) =>
        [...queryKeys.tactika.sports.all(), 'teams', filters] as const,
      teamsStatistics: (filters?: Record<string, unknown>) =>
        [
          ...queryKeys.tactika.sports.all(),
          'teams-statistics',
          filters,
        ] as const,
      teamsSeasons: (filters?: Record<string, unknown>) =>
        [...queryKeys.tactika.sports.all(), 'teams-seasons', filters] as const,
      teamsCountries: (filters?: Record<string, unknown>) =>
        [
          ...queryKeys.tactika.sports.all(),
          'teams-countries',
          filters,
        ] as const,

      // Venues
      venues: (filters?: Record<string, unknown>) =>
        [...queryKeys.tactika.sports.all(), 'venues', filters] as const,

      // Standings
      standings: (filters?: Record<string, unknown>) =>
        [...queryKeys.tactika.sports.all(), 'standings', filters] as const,

      // Fixtures
      fixturesRounds: (filters?: Record<string, unknown>) =>
        [
          ...queryKeys.tactika.sports.all(),
          'fixtures-rounds',
          filters,
        ] as const,
      fixtures: (filters?: Record<string, unknown>) =>
        [...queryKeys.tactika.sports.all(), 'fixtures', filters] as const,
      fixturesHeadToHead: (filters?: Record<string, unknown>) =>
        [
          ...queryKeys.tactika.sports.all(),
          'fixtures-head-to-head',
          filters,
        ] as const,
      fixturesStatistics: (filters?: Record<string, unknown>) =>
        [
          ...queryKeys.tactika.sports.all(),
          'fixtures-statistics',
          filters,
        ] as const,
    },
  },
} as const;

// ============================================================================
// Type Exports
// ============================================================================

/**
 * Type for any query key in the factory
 */
export type QueryKeyFactory = typeof queryKeys;

/**
 * Helper type to extract query key from factory function
 */
export type ExtractQueryKey<T> = T extends readonly unknown[] ? T : never;
