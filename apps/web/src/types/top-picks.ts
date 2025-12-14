/**
 * Top Picks Types
 *
 * Type definitions for Tactika top picks data structures.
 */

/**
 * Top pick item structure
 */
export interface TopPick {
  fixture_id: number;
  home_team: string;
  away_team: string;
  league_id: number;
  season: number;
  outcome: string;
  outcome_probability: number;
  outcome_confidence: number;
  computed_score: number;
  confidence_level: 'LOW' | 'MEDIUM' | 'HIGH';
  confidence_overall: number;
  enhanced: boolean;
  prediction_created_at: string;
  // Additional fields for hottest picks
  hot_score?: number;
  score_breakdown?: {
    confidence_contribution: number;
    probability_contribution: number;
    top_outcome_contribution: number;
    stability_bonus: number;
    variance_penalty: number;
    other_bonuses: number;
    other_penalties: number;
  };
  form_stability?: number;
  avg_variance?: number;
  reducing_factors?: string[];
}

/**
 * Top picks meta information
 */
export interface TopPicksMeta {
  generated_at: string;
  filters_applied: {
    enhanced_only: boolean;
    min_confidence: number;
  };
  total_predictions_analyzed: number;
  sections_returned: string[];
}

/**
 * Top picks response structure
 */
export interface TopPicksResponse {
  meta: TopPicksMeta;
  by_outcome: {
    home_win: TopPick[];
    draw: TopPick[];
    away_win: TopPick[];
    btts_yes: TopPick[];
    over_2_5: TopPick[];
  };
  overall: TopPick[];
  hottest: TopPick[];
}

/**
 * Top picks section type
 */
export type TopPicksSection = 'hottest' | 'overall' | 'by_outcome';

/**
 * Top picks outcome type for by_outcome section
 */
export type TopPicksOutcome =
  | 'home_win'
  | 'draw'
  | 'away_win'
  | 'btts_yes'
  | 'over_2_5';
