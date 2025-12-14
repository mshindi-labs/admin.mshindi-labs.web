import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';
import type { RankedOutcome } from '@/types/prediction';
import { cn } from '@/lib/utils';

interface RankedOutcomesProps {
  outcomes: RankedOutcome[];
}

/**
 * Ranked Outcomes Component
 *
 * Displays ranked outcomes with probabilities and confidence levels.
 */
export function RankedOutcomes({ outcomes }: RankedOutcomesProps) {
  if (!outcomes || outcomes.length === 0) {
    return null;
  }

  const getRankColor = (rank: number) => {
    if (rank === 1)
      return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
    if (rank === 2) return 'bg-gray-400/10 text-gray-600 dark:text-gray-400';
    if (rank === 3)
      return 'bg-orange-500/10 text-orange-600 dark:text-orange-400';
    return 'bg-muted text-muted-foreground';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return 'text-green-600 dark:text-green-400';
    if (confidence >= 60) return 'text-blue-600 dark:text-blue-400';
    return 'text-yellow-600 dark:text-yellow-400';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base sm:text-lg'>
          <Trophy className='h-4 w-4 sm:h-5 sm:w-5' />
          Ranked Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {outcomes.map((outcome) => {
            if (!outcome) return null;
            return (
              <div
                key={outcome.rank}
                className='flex flex-col gap-2 rounded-lg border bg-card p-3 sm:flex-row sm:items-center sm:justify-between'
              >
                <div className='flex items-center gap-3'>
                  <Badge
                    className={cn(
                      'flex h-6 w-6 items-center justify-center p-0 text-xs font-bold',
                      getRankColor(outcome.rank ?? 0),
                    )}
                  >
                    {outcome.rank ?? 'N/A'}
                  </Badge>
                  <div className='flex-1'>
                    <p className='text-sm font-medium sm:text-base'>
                      {outcome.outcome ?? 'N/A'}
                    </p>
                    {outcome.confidence != null && (
                      <p
                        className={cn(
                          'text-xs font-medium',
                          getConfidenceColor(outcome.confidence),
                        )}
                      >
                        Confidence: {outcome.confidence}%
                      </p>
                    )}
                  </div>
                </div>
                <div className='flex items-center gap-2 sm:flex-col sm:items-end'>
                  <Badge variant='outline' className='text-sm font-semibold'>
                    {outcome.probability ?? 0}%
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
