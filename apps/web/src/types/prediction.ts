/**
 * Prediction Types
 *
 * Type definitions for Tactika prediction data structures.
 */

/**
 * Confidence breakdown structure
 */
export interface ConfidenceBreakdown {
  data_sufficiency: number;
  h2h_reliability: number;
  form_stability: number;
  predictive_certainty: number;
}

/**
 * Data quality information
 */
export interface DataQuality {
  h2h_available: boolean;
  h2h_matches: number;
  home_form_sample: number;
  away_form_sample: number;
  home_data_completeness: number;
  away_data_completeness: number;
}

/**
 * Variance information
 */
export interface Variance {
  home_variance: number;
  away_variance: number;
  is_derby: boolean;
  is_cup_match: boolean;
}

/**
 * Confidence information
 */
export interface Confidence {
  overall: number;
  level: 'LOW' | 'MEDIUM' | 'HIGH';
  breakdown: ConfidenceBreakdown;
  data_quality: DataQuality;
  variance: Variance;
  reducing_factors: string[];
  metrics?: {
    volatility: number;
    entropy: number;
    complexity: number;
  };
}

export interface RiskFactor {
  name: string;
  points: number;
  reason: string;
}
export interface BettingRecommendation {
  final_decision: string;
  risk_score: number;
  hard_stop_triggered: boolean;
  disqualifiers: string[];
  eligible_markets: string[];
  risk_factors: RiskFactor[];
  summary: string;
  recommendation_confidence: string;
}

/**
 * Clean sheet probabilities
 */
export interface CleanSheet {
  home_clean_sheet: number;
  away_clean_sheet: number;
}

/**
 * Goal timing probabilities
 */
export interface GoalTiming {
  first_half_goal: number;
  second_half_goal: number;
  late_goal: number;
  home_scores_first: number;
  away_scores_first: number;
}

/**
 * Normalized score probabilities
 */
export interface NormalizedScores {
  home_win: number;
  draw: number;
  away_win: number;
}

/**
 * Score probabilities
 */
export interface Scores {
  home_win: number;
  draw: number;
  away_win: number;
  btts: number;
  over_2_5: number;
  under_2_5: number;
}

/**
 * Ranked outcome
 */
export interface RankedOutcome {
  outcome: string;
  probability: number;
  rank: number;
  confidence: number;
}

/**
 * Scoreline prediction
 */
export interface ScorelinePrediction {
  scoreline: string;
  probability: number;
}

/**
 * Season context
 */
export interface SeasonContext {
  season_phase: string;
  confidence_factor: number;
  home_matches_played: number;
  away_matches_played: number;
}

/**
 * Prediction record
 */
export interface Prediction {
  _id: string;
  fixture_id: number;
  fixture_date: string;
  fixture_timestamp: number;
  away_expected_goals: number;
  away_team_id: number;
  away_team_name: string;
  clean_sheet: CleanSheet;
  confidence: Confidence;
  createdAt: string;
  enhanced: boolean;
  enhancement_failed: boolean;
  enhancing: boolean;
  fallback_used: boolean;
  goal_timing: GoalTiming;
  home_expected_goals: number;
  home_team_id: number;
  home_team_name: string;
  justification: string;
  league_id: number;
  normalized_scores: NormalizedScores;
  ranked_outcomes: RankedOutcome[];
  recommended_outcome: string;
  recommended_probability: number;
  risk_factors: string[];
  scoreline_predictions: ScorelinePrediction[];
  scores: Scores;
  season: number;
  season_context: SeasonContext;
  venue_city: string;
  venue_id: number;
  venue_name: string;
  updatedAt: string;
  enhanced_at?: string;
  betting_recommendation?: BettingRecommendation;
}

/**
 * Paginated predictions response
 */
export interface PredictionsResponse {
  page: number;
  limit: number;
  count: number;
  pages: number;
  items_per_page: number;
  has_next_page: boolean;
  has_prev_page: boolean;
  records: Prediction[];
}

/**
 * Prediction sort field options
 */
export enum PredictionSortField {
  RECOMMENDED_PROBABILITY = 'recommended_probability',
  CONFIDENCE_OVERALL = 'confidence.overall',
  CREATED_AT = 'createdAt',
  FIXTURE_DATE = 'fixture_date',
  HOME_TEAM_NAME = 'home_team_name',
  AWAY_TEAM_NAME = 'away_team_name',
  LEAGUE_ID = 'league_id',
  SEASON = 'season',
  RANKED_OUTCOME_PROBABILITY = 'ranked_outcome_probability',
  RANKED_OUTCOME_CONFIDENCE = 'ranked_outcome_confidence',
  BETTING_RECOMMENDATION = 'betting_recommendation',
}

/**
 * Sort order options
 */
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

/**
 * Predictions query parameters
 */
export interface PredictionsParams {
  page?: number;
  limit?: number;
  sort?: PredictionSortField;
  order?: SortOrder;
  [key: string]: unknown;
}

/**
 * Match prediction details
 */
export interface MatchPredictionDetails {
  home_win_score: number;
  draw_score: number;
  away_win_score: number;
  btts_score: number;
  over_2_5_score: number;
  under_2_5_score: number;
  home_expected_goals: number;
  away_expected_goals: number;
  home_team: string;
  away_team: string;
}

/**
 * Match prediction response structure
 */
export interface MatchPredictionResponse {
  prediction: {
    recommended_outcome: string;
    recommended_probability: number;
    justification: string;
    risk_factors: string[];
    scores: Scores;
    normalized_scores: NormalizedScores;
    ranked_outcomes: RankedOutcome[];
    confidence: Confidence;
    clean_sheet: CleanSheet;
    goal_timing: GoalTiming;
    scoreline_predictions: ScorelinePrediction[];
    season_context: SeasonContext;
  };
  details: MatchPredictionDetails;
  enhanced: boolean;
  enhancing: boolean;
  enhanced_at?: string;
  message?: string;
}
