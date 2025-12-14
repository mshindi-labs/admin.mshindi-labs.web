import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target } from 'lucide-react';
import type { ScorelinePrediction } from '@/types/prediction';

interface ScorelinePredictionsProps {
  predictions: ScorelinePrediction[];
}

/**
 * Scoreline Predictions Component
 *
 * Displays predicted scorelines with probabilities.
 */
export function ScorelinePredictions({
  predictions,
}: ScorelinePredictionsProps) {
  if (!predictions || predictions.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base sm:text-lg'>
          <Target className='h-4 w-4 sm:h-5 sm:w-5' />
          Scoreline Predictions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
          {predictions.map((prediction, index) => {
            if (!prediction) return null;
            return (
              <div
                key={index}
                className='flex items-center justify-between rounded-lg border bg-muted/30 p-3'
              >
                <div className='flex items-center gap-2'>
                  <span className='text-base font-semibold sm:text-lg'>
                    {prediction.scoreline ?? 'N/A'}
                  </span>
                </div>
                <Badge
                  variant='outline'
                  className='text-xs font-semibold sm:text-sm'
                >
                  {prediction.probability != null
                    ? `${prediction.probability.toFixed(1)}%`
                    : 'N/A'}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
