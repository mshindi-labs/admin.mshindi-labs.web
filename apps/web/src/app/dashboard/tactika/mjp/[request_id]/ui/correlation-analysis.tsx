'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { MjpCorrelationAnalysis } from '@/types';

interface CorrelationAnalysisProps {
  correlationAnalysis?: MjpCorrelationAnalysis;
}

/**
 * Correlation Analysis Component
 *
 * Displays correlation metrics and high correlation pairs.
 */
export function CorrelationAnalysis({
  correlationAnalysis,
}: CorrelationAnalysisProps) {
  if (!correlationAnalysis) {
    return null;
  }

  const hasDetails =
    correlationAnalysis.correlation_details &&
    correlationAnalysis.correlation_details.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base sm:text-lg'>
          Correlation Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
          <div className='flex flex-col space-y-1 rounded-lg border p-3'>
            <span className='text-xs text-muted-foreground'>
              Average Correlation
            </span>
            <span className='text-sm font-medium sm:text-base'>
              {correlationAnalysis.average_correlation !== undefined
                ? `${correlationAnalysis.average_correlation.toFixed(2)}%`
                : '—'}
            </span>
          </div>
          <div className='flex flex-col space-y-1 rounded-lg border p-3'>
            <span className='text-xs text-muted-foreground'>
              Max Correlation
            </span>
            <span className='text-sm font-medium sm:text-base'>
              {correlationAnalysis.max_correlation !== undefined
                ? `${correlationAnalysis.max_correlation}%`
                : '—'}
            </span>
          </div>
          <div className='flex flex-col space-y-1 rounded-lg border p-3'>
            <span className='text-xs text-muted-foreground'>
              High Correlation Pairs
            </span>
            <span className='text-sm font-medium sm:text-base'>
              {correlationAnalysis.high_correlation_pairs ?? '—'}
            </span>
          </div>
        </div>

        {hasDetails && (
          <div className='space-y-2'>
            <h4 className='text-sm font-semibold'>High Correlation Pairs</h4>
            <div className='max-h-64 space-y-2 overflow-y-auto rounded-md border p-3'>
              {correlationAnalysis.correlation_details
                ?.slice(0, 10)
                .map((detail, index) => (
                  <div
                    key={index}
                    className='flex flex-wrap items-center gap-2 rounded border p-2 text-xs sm:text-sm'
                  >
                    <span className='font-mono'>
                      {detail.fixture_id_1} ↔ {detail.fixture_id_2}
                    </span>
                    <Badge variant='outline'>{detail.score}%</Badge>
                    {detail.factors && detail.factors.length > 0 && (
                      <div className='flex flex-wrap gap-1'>
                        {detail.factors.map((factor, i) => (
                          <Badge key={i} variant='secondary' className='text-[10px]'>
                            {factor.replace(/_/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              {correlationAnalysis.correlation_details &&
                correlationAnalysis.correlation_details.length > 10 && (
                  <p className='text-xs text-muted-foreground'>
                    Showing first 10 of{' '}
                    {correlationAnalysis.correlation_details.length} pairs
                  </p>
                )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
