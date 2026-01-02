'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { MjpStrategy } from '@/types';

interface StrategiesProps {
  strategies?: MjpStrategy[];
}

/**
 * Strategies Component
 *
 * Displays strategy results with combined probabilities and execution times.
 */
export function Strategies({ strategies }: StrategiesProps) {
  if (!strategies || strategies.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base sm:text-lg'>Strategies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {strategies.map((strategy, index) => (
            <div
              key={index}
              className='flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between'
            >
              <div className='flex-1'>
                <h4 className='text-sm font-semibold sm:text-base'>
                  {strategy.strategy_name ?? `Strategy ${index + 1}`}
                </h4>
              </div>
              <div className='flex flex-wrap items-center gap-2'>
                {strategy.combined_probability !== null &&
                strategy.combined_probability !== undefined ? (
                  <Badge variant='default' className='text-xs sm:text-sm'>
                    {(strategy.combined_probability * 100).toFixed(2)}%
                  </Badge>
                ) : (
                  <Badge variant='outline' className='text-xs sm:text-sm'>
                    N/A
                  </Badge>
                )}
                {strategy.confidence_score !== null &&
                strategy.confidence_score !== undefined ? (
                  <Badge variant='secondary' className='text-xs sm:text-sm'>
                    Confidence: {strategy.confidence_score}%
                  </Badge>
                ) : null}
                {strategy.execution_time_ms !== undefined && (
                  <span className='text-xs text-muted-foreground'>
                    {strategy.execution_time_ms}ms
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
