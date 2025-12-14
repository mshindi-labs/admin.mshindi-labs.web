import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecommendedOutcomeProps {
  outcome: string;
  probability: number;
}

/**
 * Recommended Outcome Component
 *
 * Displays the recommended outcome with probability.
 */
export function RecommendedOutcome({
  outcome,
  probability,
}: RecommendedOutcomeProps) {
  if (!outcome || probability == null) {
    return null;
  }

  const getProbabilityColor = (prob: number) => {
    if (prob >= 60) return 'bg-green-500/10 text-green-600 dark:text-green-400';
    if (prob >= 40) return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
    return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base sm:text-lg'>
          <TrendingUp className='h-4 w-4 sm:h-5 sm:w-5' />
          Recommended Outcome
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <div className='flex-1'>
            <p className='text-sm font-medium text-foreground sm:text-base'>
              {outcome}
            </p>
          </div>
          <Badge
            className={cn(
              'text-sm font-semibold sm:text-base',
              getProbabilityColor(probability),
            )}
          >
            {probability}%
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
