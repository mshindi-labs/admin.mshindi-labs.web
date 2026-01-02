'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { MjpQualitySummary } from '@/types';

interface QualitySummaryProps {
  qualitySummary?: MjpQualitySummary;
}

/**
 * Quality Summary Component
 *
 * Displays quality metrics for the MJP analysis.
 */
export function QualitySummary({ qualitySummary }: QualitySummaryProps) {
  if (!qualitySummary) {
    return null;
  }

  const metrics = [
    {
      label: 'Total Fixtures',
      value: qualitySummary.total_fixtures ?? '—',
      variant: 'default' as const,
    },
    {
      label: 'High Quality',
      value: qualitySummary.high_quality ?? '—',
      variant: 'default' as const,
    },
    {
      label: 'Medium Quality',
      value: qualitySummary.medium_quality ?? '—',
      variant: 'secondary' as const,
    },
    {
      label: 'Low Quality',
      value: qualitySummary.low_quality ?? '—',
      variant: 'destructive' as const,
    },
    {
      label: 'Avg Confidence',
      value:
        qualitySummary.average_confidence !== undefined
          ? `${qualitySummary.average_confidence.toFixed(1)}%`
          : '—',
      variant: 'outline' as const,
    },
    {
      label: 'Avg Volatility',
      value:
        qualitySummary.average_volatility !== undefined
          ? `${qualitySummary.average_volatility.toFixed(1)}%`
          : '—',
      variant: 'outline' as const,
    },
    {
      label: 'Avg Entropy',
      value:
        qualitySummary.average_entropy !== undefined
          ? `${qualitySummary.average_entropy.toFixed(1)}%`
          : '—',
      variant: 'outline' as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base sm:text-lg'>Quality Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className='flex flex-col space-y-1 rounded-lg border p-3'
            >
              <span className='text-xs text-muted-foreground'>
                {metric.label}
              </span>
              <div className='flex items-center gap-2'>
                {typeof metric.value === 'number' ? (
                  <Badge variant={metric.variant} className='text-xs sm:text-sm'>
                    {metric.value}
                  </Badge>
                ) : (
                  <span className='text-sm font-medium sm:text-base'>
                    {metric.value}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
