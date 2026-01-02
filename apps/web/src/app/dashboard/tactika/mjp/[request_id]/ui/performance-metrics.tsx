'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { MjpPerformance } from '@/types';

interface PerformanceMetricsProps {
  performance?: MjpPerformance;
}

/**
 * Performance Metrics Component
 *
 * Displays performance metrics for the analysis execution.
 */
export function PerformanceMetrics({
  performance,
}: PerformanceMetricsProps) {
  if (!performance) {
    return null;
  }

  const metrics = [
    {
      label: 'Total Execution Time',
      value:
        performance.total_execution_time_ms !== undefined
          ? `${(performance.total_execution_time_ms / 1000).toFixed(2)}s`
          : '—',
    },
    {
      label: 'Cached Fixtures',
      value: performance.cached_fixtures ?? '—',
    },
    {
      label: 'New Predictions',
      value: performance.new_predictions ?? '—',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base sm:text-lg'>
          Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className='flex flex-col space-y-1 rounded-lg border p-3'
            >
              <span className='text-xs text-muted-foreground'>
                {metric.label}
              </span>
              <span className='text-sm font-medium sm:text-base'>
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
