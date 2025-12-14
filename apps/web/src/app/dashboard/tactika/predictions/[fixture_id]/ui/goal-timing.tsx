import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import type { GoalTiming } from '@/types/prediction';

interface GoalTimingProps {
  timing: GoalTiming;
}

/**
 * Goal Timing Component
 *
 * Displays goal timing probabilities.
 */
export function GoalTiming({ timing }: GoalTimingProps) {
  if (!timing) {
    return null;
  }

  const timingItems = [
    { label: 'First Half Goal', value: timing.first_half_goal },
    { label: 'Second Half Goal', value: timing.second_half_goal },
    { label: 'Late Goal', value: timing.late_goal },
    { label: 'Home Scores First', value: timing.home_scores_first },
    { label: 'Away Scores First', value: timing.away_scores_first },
  ].filter((item) => item.value != null);

  if (timingItems.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base sm:text-lg'>
          <Clock className='h-4 w-4 sm:h-5 sm:w-5' />
          Goal Timing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
          {timingItems.map((item) => (
            <div
              key={item.label}
              className='flex items-center justify-between rounded-lg border bg-muted/30 p-2.5'
            >
              <span className='text-xs text-muted-foreground sm:text-sm'>
                {item.label}
              </span>
              <span className='text-sm font-semibold sm:text-base'>
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
