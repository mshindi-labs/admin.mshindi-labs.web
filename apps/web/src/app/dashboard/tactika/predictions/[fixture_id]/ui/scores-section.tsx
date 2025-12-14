import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

interface ScoresSectionProps {
  scores: {
    home_win?: number;
    draw?: number;
    away_win?: number;
    btts?: number;
    over_2_5?: number;
    under_2_5?: number;
  };
  normalizedScores?: {
    home_win?: number;
    draw?: number;
    away_win?: number;
  };
  homeExpectedGoals?: number;
  awayExpectedGoals?: number;
}

/**
 * Scores Section Component
 *
 * Displays match outcome probabilities and expected goals.
 */
export function ScoresSection({
  scores,
  normalizedScores,
  homeExpectedGoals,
  awayExpectedGoals,
}: ScoresSectionProps) {
  if (!scores) {
    return null;
  }

  const scoreItems = [
    {
      label: 'Home Win',
      value: scores.home_win,
      normalized: normalizedScores?.home_win,
    },
    { label: 'Draw', value: scores.draw, normalized: normalizedScores?.draw },
    {
      label: 'Away Win',
      value: scores.away_win,
      normalized: normalizedScores?.away_win,
    },
  ].filter((item) => item.value != null);

  const additionalScores = [
    { label: 'BTTS Yes', value: scores.btts },
    { label: 'Over 2.5', value: scores.over_2_5 },
    { label: 'Under 2.5', value: scores.under_2_5 },
  ].filter((item) => item.value != null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base sm:text-lg'>
          <BarChart3 className='h-4 w-4 sm:h-5 sm:w-5' />
          Match Probabilities
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Main Outcomes */}
        {scoreItems.length > 0 && (
          <div className='space-y-3'>
            {scoreItems.map((item) => (
              <div key={item.label} className='space-y-1.5'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='font-medium'>{item.label}</span>
                  <div className='flex items-center gap-2'>
                    {item.normalized != null && (
                      <span className='text-xs text-muted-foreground'>
                        ({item.normalized}% normalized)
                      </span>
                    )}
                    <span className='font-semibold'>{item.value}%</span>
                  </div>
                </div>
                <div className='h-2 w-full overflow-hidden rounded-full bg-muted'>
                  <div
                    className='h-full bg-primary transition-all duration-300'
                    style={{ width: `${item.value ?? 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Expected Goals */}
        {(homeExpectedGoals != null || awayExpectedGoals != null) && (
          <div className='rounded-lg border bg-muted/50 p-3'>
            <p className='mb-2 text-xs font-medium text-muted-foreground sm:text-sm'>
              Expected Goals
            </p>
            <div className='flex items-center justify-between text-sm sm:text-base'>
              <div className='flex-1 text-center'>
                <p className='font-semibold'>
                  {homeExpectedGoals?.toFixed(2) ?? 'N/A'}
                </p>
                <p className='text-xs text-muted-foreground'>Home</p>
              </div>
              <div className='text-muted-foreground'>vs</div>
              <div className='flex-1 text-center'>
                <p className='font-semibold'>
                  {awayExpectedGoals?.toFixed(2) ?? 'N/A'}
                </p>
                <p className='text-xs text-muted-foreground'>Away</p>
              </div>
            </div>
          </div>
        )}

        {/* Additional Scores */}
        {additionalScores.length > 0 && (
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
            {additionalScores.map((item) => (
              <div
                key={item.label}
                className='rounded-lg border bg-muted/30 p-2.5 text-center'
              >
                <p className='text-xs text-muted-foreground sm:text-sm'>
                  {item.label}
                </p>
                <p className='mt-1 text-base font-semibold sm:text-lg'>
                  {item.value}%
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
