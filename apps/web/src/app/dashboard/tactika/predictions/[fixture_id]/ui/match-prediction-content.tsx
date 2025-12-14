'use client';

import { useMatchPrediction } from '../../hooks';
import { MatchPredictionSkeleton } from './match-prediction-skeleton';
import { MatchPredictionError } from './match-prediction-error';
import { RecommendedOutcome } from './recommended-outcome';
import { ScoresSection } from './scores-section';
import { RankedOutcomes } from './ranked-outcomes';
import { ConfidenceSection } from './confidence-section';
import { RiskFactors } from './risk-factors';
import { Justification } from './justification';
import { ScorelinePredictions } from './scoreline-predictions';
import { GoalTiming } from './goal-timing';
import { CleanSheet } from './clean-sheet';
import { SeasonContext } from './season-context';

interface MatchPredictionContentProps {
  fixtureId: string;
}

/**
 * Match Prediction Content
 *
 * Main component that fetches and displays match prediction data.
 */
export function MatchPredictionContent({
  fixtureId,
}: MatchPredictionContentProps) {
  const { data, isLoading, isError, error } = useMatchPrediction(fixtureId);

  if (isLoading) {
    return <MatchPredictionSkeleton />;
  }

  if (isError || !data) {
    return (
      <MatchPredictionError
        error={
          error instanceof Error ? error.message : 'Failed to load prediction'
        }
      />
    );
  }

  const { prediction, details } = data;

  if (!prediction || !details) {
    return <MatchPredictionError error='Invalid prediction data received' />;
  }

  return (
    <div className='space-y-4 sm:space-y-6'>
      {/* Match Header */}
      <div className='rounded-lg border bg-card p-4 sm:p-6'>
        <div className='flex flex-col items-center justify-center space-y-2 text-center sm:flex-row sm:space-x-4 sm:space-y-0'>
          <div className='flex-1'>
            <h2 className='text-base font-semibold sm:text-lg'>
              {details?.home_team ?? 'Home Team'}
            </h2>
          </div>
          <div className='text-muted-foreground'>vs</div>
          <div className='flex-1'>
            <h2 className='text-base font-semibold sm:text-lg'>
              {details?.away_team ?? 'Away Team'}
            </h2>
          </div>
        </div>
      </div>

      {/* Recommended Outcome */}
      {prediction?.recommended_outcome && (
        <RecommendedOutcome
          outcome={prediction.recommended_outcome}
          probability={prediction.recommended_probability ?? 0}
        />
      )}

      {/* Justification */}
      {prediction?.justification && (
        <Justification text={prediction.justification} />
      )}

      {/* Risk Factors */}
      {prediction?.risk_factors && prediction.risk_factors.length > 0 && (
        <RiskFactors factors={prediction.risk_factors} />
      )}

      {/* Scores Section */}
      {prediction?.scores && (
        <ScoresSection
          scores={prediction.scores}
          normalizedScores={prediction.normalized_scores}
          homeExpectedGoals={details?.home_expected_goals}
          awayExpectedGoals={details?.away_expected_goals}
        />
      )}

      {/* Ranked Outcomes */}
      {prediction?.ranked_outcomes && prediction.ranked_outcomes.length > 0 && (
        <RankedOutcomes outcomes={prediction.ranked_outcomes} />
      )}

      {/* Confidence Section */}
      {prediction?.confidence && (
        <ConfidenceSection confidence={prediction.confidence} />
      )}

      {/* Scoreline Predictions */}
      {prediction?.scoreline_predictions &&
        prediction.scoreline_predictions.length > 0 && (
          <ScorelinePredictions
            predictions={prediction.scoreline_predictions}
          />
        )}

      {/* Goal Timing */}
      {prediction?.goal_timing && (
        <GoalTiming timing={prediction.goal_timing} />
      )}

      {/* Clean Sheet */}
      {prediction?.clean_sheet && (
        <CleanSheet cleanSheet={prediction.clean_sheet} />
      )}

      {/* Season Context */}
      {prediction?.season_context && (
        <SeasonContext context={prediction.season_context} />
      )}
    </div>
  );
}
