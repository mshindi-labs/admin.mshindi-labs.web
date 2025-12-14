import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import type { CleanSheet } from '@/types/prediction';

interface CleanSheetProps {
  cleanSheet: CleanSheet;
}

/**
 * Clean Sheet Component
 *
 * Displays clean sheet probabilities for both teams.
 */
export function CleanSheet({ cleanSheet }: CleanSheetProps) {
  if (!cleanSheet) {
    return null;
  }

  const hasData =
    cleanSheet.home_clean_sheet != null || cleanSheet.away_clean_sheet != null;

  if (!hasData) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base sm:text-lg'>
          <ShieldCheck className='h-4 w-4 sm:h-5 sm:w-5' />
          Clean Sheet Probabilities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {cleanSheet.home_clean_sheet != null && (
            <div className='flex items-center justify-between rounded-lg border bg-muted/30 p-3'>
              <span className='text-sm text-muted-foreground sm:text-base'>
                Home Clean Sheet
              </span>
              <span className='text-base font-semibold sm:text-lg'>
                {cleanSheet.home_clean_sheet}%
              </span>
            </div>
          )}
          {cleanSheet.away_clean_sheet != null && (
            <div className='flex items-center justify-between rounded-lg border bg-muted/30 p-3'>
              <span className='text-sm text-muted-foreground sm:text-base'>
                Away Clean Sheet
              </span>
              <span className='text-base font-semibold sm:text-lg'>
                {cleanSheet.away_clean_sheet}%
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
