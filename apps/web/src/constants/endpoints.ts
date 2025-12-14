export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    PROFILE: '/auth/me',
  },
  TACTIKA: {
    ANALYTICS: {
      // Team endpoints
      TEAM_INFO: (team_id: string) => `/tactika/analytics/team-info/${team_id}`,
      TEAM_STATISTICS: (team_id: string) =>
        `/tactika/analytics/team-statistics/${team_id}`,

      // Match/Fixture endpoints
      HEAD_TO_HEAD: (home_team_id: string, away_team_id: string) =>
        `/tactika/analytics/head-to-head/${home_team_id}/${away_team_id}`,
      MATCH_ANALYSIS: (home_team_id: string, away_team_id: string) =>
        `/tactika/analytics/match-analysis/${home_team_id}/${away_team_id}`,
      UPCOMING_FIXTURES: '/tactika/analytics/upcoming-fixtures',

      // Prediction endpoints
      MATCH_PREDICTION: (fixture_id: string) =>
        `/tactika/analytics/match-prediction/${fixture_id}`,
      PREDICTIONS: '/tactika/analytics/predictions',
      PREDICTIONS_TOP_PICKS: '/tactika/analytics/predictions/top-picks',

      // Daily predictions endpoints
      DAILY_PREDICTIONS_TRIGGER: '/tactika/analytics/daily-predictions/trigger',
      DAILY_PREDICTIONS_JOB: (job_id: string) =>
        `/tactika/analytics/daily-predictions/jobs/${job_id}`,
      DAILY_PREDICTIONS_JOBS: '/tactika/analytics/daily-predictions/jobs',
      DAILY_PREDICTIONS_STATS: '/tactika/analytics/daily-predictions/stats',
    },
    LEAGUES: {
      // Sync endpoint
      SYNC: '/tactika/leagues/sync',

      // CRUD endpoints
      CREATE: '/tactika/leagues',
      LIST: '/tactika/leagues',
      GET_BY_ID: (id: string) => `/tactika/leagues/${id}`,
      UPDATE: (id: string) => `/tactika/leagues/${id}`,
      DELETE: (id: string) => `/tactika/leagues/${id}`,

      // API Football integration
      API_FOOTBALL: (league_id: string) =>
        `/tactika/leagues/api-football/${league_id}`,

      // Star/unstar endpoints
      STAR: (id: string) => `/tactika/leagues/${id}/star`,
      UNSTAR: (id: string) => `/tactika/leagues/${id}/unstar`,
    },
    SPORTS: {
      // General endpoints
      TIMEZONE: '/tactika/sports/timezone',
      COUNTRIES: '/tactika/sports/countries',

      // Leagues endpoints
      LEAGUES: '/tactika/sports/leagues',
      LEAGUES_SEASONS: '/tactika/sports/leagues/seasons',

      // Teams endpoints
      TEAMS: '/tactika/sports/teams',
      TEAMS_STATISTICS: '/tactika/sports/teams/statistics',
      TEAMS_SEASONS: '/tactika/sports/teams/seasons',
      TEAMS_COUNTRIES: '/tactika/sports/teams/countries',

      // Venues endpoints
      VENUES: '/tactika/sports/venues',

      // Standings endpoints
      STANDINGS: '/tactika/sports/standings',

      // Fixtures endpoints
      FIXTURES_ROUNDS: '/tactika/sports/fixtures/rounds',
      FIXTURES: '/tactika/sports/fixtures',
      FIXTURES_HEAD_TO_HEAD: '/tactika/sports/fixtures/headtohead',
      FIXTURES_STATISTICS: '/tactika/sports/fixtures/statistics',
    },
  },
};
