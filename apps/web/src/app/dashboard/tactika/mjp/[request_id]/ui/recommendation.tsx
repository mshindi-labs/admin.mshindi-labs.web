'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { MjpRecommendation } from '@/types';

interface RecommendationProps {
  recommendation?: MjpRecommendation;
}

/**
 * Recommendation Component
 *
 * Displays the recommendation decision and criteria results.
 */
export function Recommendation({ recommendation }: RecommendationProps) {
  if (!recommendation) {
    return null;
  }

  const decision = recommendation.decision ?? 'UNKNOWN';
  const isRecommended = decision === 'RECOMMENDED';
  const confidenceLevel = recommendation.confidence_level ?? 'UNKNOWN';

  const getConfidenceVariant = (
    level: string,
  ): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (level.toUpperCase()) {
      case 'HIGH':
        return 'default';
      case 'MEDIUM':
        return 'secondary';
      case 'LOW':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getDecisionVariant = (): 'default' | 'secondary' | 'destructive' => {
    if (isRecommended) return 'default';
    return 'destructive';
  };

  return (
    <Card>
      <CardHeader>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <CardTitle className='text-base sm:text-lg'>Recommendation</CardTitle>
          <div className='flex gap-2'>
            <Badge variant={getDecisionVariant()} className='text-xs sm:text-sm'>
              {decision.replace(/_/g, ' ')}
            </Badge>
            <Badge
              variant={getConfidenceVariant(confidenceLevel)}
              className='text-xs sm:text-sm'
            >
              {confidenceLevel} Confidence
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
          <div className='flex flex-col space-y-1 rounded-lg border p-3'>
            <span className='text-xs text-muted-foreground'>
              Criteria Passed
            </span>
            <span className='text-sm font-medium sm:text-base'>
              {recommendation.criteria_passed ?? 0}
            </span>
          </div>
          <div className='flex flex-col space-y-1 rounded-lg border p-3'>
            <span className='text-xs text-muted-foreground'>
              Criteria Failed
            </span>
            <span className='text-sm font-medium sm:text-base'>
              {recommendation.criteria_failed ?? 0}
            </span>
          </div>
        </div>

        {recommendation.criteria_results &&
          recommendation.criteria_results.length > 0 && (
            <div className='space-y-2'>
              <h4 className='text-sm font-semibold'>Criteria Results</h4>
              <div className='space-y-2'>
                {recommendation.criteria_results.map((criterion, index) => (
                  <div
                    key={index}
                    className='flex items-start gap-3 rounded-lg border p-3'
                  >
                    {criterion.passed ? (
                      <CheckCircle2 className='mt-0.5 h-4 w-4 text-green-600' />
                    ) : (
                      <XCircle className='mt-0.5 h-4 w-4 text-red-600' />
                    )}
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center gap-2'>
                        <span className='text-sm font-medium'>
                          {criterion.criterion ?? 'Unknown Criterion'}
                        </span>
                        {criterion.passed ? (
                          <Badge variant='default' className='text-[10px]'>
                            Passed
                          </Badge>
                        ) : (
                          <Badge variant='destructive' className='text-[10px]'>
                            Failed
                          </Badge>
                        )}
                      </div>
                      {criterion.message && (
                        <p className='text-xs text-muted-foreground'>
                          {criterion.message}
                        </p>
                      )}
                      <div className='flex flex-wrap gap-2 text-xs'>
                        {criterion.value !== undefined && (
                          <span>
                            Value: <strong>{criterion.value}</strong>
                          </span>
                        )}
                        {criterion.threshold !== undefined && (
                          <span>
                            Threshold: <strong>{criterion.threshold}</strong>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {recommendation.reasoning && recommendation.reasoning.length > 0 && (
          <div className='space-y-2'>
            <h4 className='text-sm font-semibold'>Reasoning</h4>
            <ul className='space-y-1'>
              {recommendation.reasoning.map((reason, index) => (
                <li key={index} className='text-sm text-muted-foreground'>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
