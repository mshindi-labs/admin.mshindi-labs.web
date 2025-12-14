import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import type { SeasonContext } from '@/types/prediction';

interface SeasonContextProps {
  context: SeasonContext;
}

/**
 * Season Context Component
 *
 * Displays season context information.
 */
export function SeasonContext({ context }: SeasonContextProps) {
  if (!context) {
    return null;
  }

  const hasData =
    context.season_phase != null ||
    context.confidence_factor != null ||
    context.home_matches_played != null ||
    context.away_matches_played != null;

  if (!hasData) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base sm:text-lg'>
          <Calendar className='h-4 w-4 sm:h-5 sm:w-5' />
          Season Context
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
          {context.season_phase != null && (
            <div className='flex items-center justify-between rounded-lg border bg-muted/30 p-2.5'>
              <span className='text-xs text-muted-foreground sm:text-sm'>
                Season Phase
              </span>
              <span className='text-sm font-semibold capitalize sm:text-base'>
                {context.season_phase}
              </span>
            </div>
          )}
          {context.confidence_factor != null && (
            <div className='flex items-center justify-between rounded-lg border bg-muted/30 p-2.5'>
              <span className='text-xs text-muted-foreground sm:text-sm'>
                Confidence Factor
              </span>
              <span className='text-sm font-semibold sm:text-base'>
                {(context.confidence_factor * 100).toFixed(0)}%
              </span>
            </div>
          )}
          {context.home_matches_played != null && (
            <div className='flex items-center justify-between rounded-lg border bg-muted/30 p-2.5'>
              <span className='text-xs text-muted-foreground sm:text-sm'>
                Home Matches Played
              </span>
              <span className='text-sm font-semibold sm:text-base'>
                {context.home_matches_played}
              </span>
            </div>
          )}
          {context.away_matches_played != null && (
            <div className='flex items-center justify-between rounded-lg border bg-muted/30 p-2.5'>
              <span className='text-xs text-muted-foreground sm:text-sm'>
                Away Matches Played
              </span>
              <span className='text-sm font-semibold sm:text-base'>
                {context.away_matches_played}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
