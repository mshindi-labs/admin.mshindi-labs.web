/**
 * MJP Analysis Types
 *
 * Type definitions for Mega Jackpot analysis data structures.
 */

/**
 * Mega Jackpot Analysis record
 */
export interface MjpAnalysis {
  _id: string;
  request_id: string;
  analysis_type: 'mega_jackpot';
  fixture_count: number;
  fixture_ids: number[];
}

/**
 * Paginated MJP analysis response
 */
export interface MjpAnalysisResponse {
  page: number;
  limit: number;
  count: number;
  pages: number;
  items_per_page: number;
  has_next_page: boolean;
  has_prev_page: boolean;
  records: MjpAnalysis[];
}

/**
 * MJP analysis query parameters
 */
export interface MjpAnalysisParams {
  page?: number;
  limit?: number;
  [key: string]: unknown;
}

/**
 * Quality summary for MJP analysis
 */
export interface MjpQualitySummary {
  total_fixtures?: number;
  high_quality?: number;
  medium_quality?: number;
  low_quality?: number;
  average_confidence?: number;
  average_volatility?: number;
  average_entropy?: number;
}

/**
 * Correlation detail between two fixtures
 */
export interface MjpCorrelationDetail {
  fixture_id_1: number;
  fixture_id_2: number;
  score: number;
  factors?: string[];
}

/**
 * Correlation analysis
 */
export interface MjpCorrelationAnalysis {
  average_correlation?: number;
  max_correlation?: number;
  high_correlation_pairs?: number;
  correlation_details?: MjpCorrelationDetail[];
}

/**
 * Strategy result
 */
export interface MjpStrategy {
  strategy_name?: string;
  combined_probability?: number | null;
  confidence_score?: number | null;
  execution_time_ms?: number;
}

/**
 * Recommendation criterion result
 */
export interface MjpRecommendationCriterion {
  criterion?: string;
  passed?: boolean;
  value?: number;
  threshold?: number;
  message?: string;
}

/**
 * Recommendation
 */
export interface MjpRecommendation {
  decision?: string;
  criteria_passed?: number;
  criteria_failed?: number;
  criteria_results?: MjpRecommendationCriterion[];
  reasoning?: string[];
  confidence_level?: string;
}

/**
 * Prediction in MJP analysis
 */
export interface MjpPrediction {
  rank?: number;
  fixture_id?: number;
  match_label?: string;
  recommended_outcome?: string;
  strategy_name?: string;
  combined_probability?: number;
  confidence_score?: number;
  quality_tier?: string;
  league_name?: string;
  fixture_date?: string;
}

/**
 * Fixture outcome in top combination
 */
export interface MjpCombinationFixtureOutcome {
  fixture_id?: number;
  fixture_label?: string;
  selected_outcome?: string;
  outcome_probability?: number;
  outcome_confidence?: number;
}

/**
 * Top combination
 */
export interface MjpTopCombination {
  combination_id?: number;
  strategy_name?: string;
  fixture_outcomes?: MjpCombinationFixtureOutcome[];
  combined_probability?: number | null;
  combined_probability_percentage?: number | null;
  average_confidence?: number;
  quality_tier?: string;
}

/**
 * Performance metrics
 */
export interface MjpPerformance {
  total_execution_time_ms?: number;
  cached_fixtures?: number;
  new_predictions?: number;
}

/**
 * Detailed MJP analysis response
 */
export interface MjpAnalysisDetail {
  request_id?: string;
  analyzed_at?: string;
  quality_summary?: MjpQualitySummary;
  correlation_analysis?: MjpCorrelationAnalysis;
  strategies?: MjpStrategy[];
  recommendation?: MjpRecommendation;
  predictions?: MjpPrediction[];
  top_combinations?: MjpTopCombination[];
  performance?: MjpPerformance;
}
