import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';
import type { Confidence } from '@/types/prediction';
import { cn } from '@/lib/utils';

interface ConfidenceSectionProps {
  confidence: Confidence;
}

/**
 * Confidence Section Component
 *
 * Displays confidence metrics and breakdown.
 */
export function ConfidenceSection({ confidence }: ConfidenceSectionProps) {
  if (!confidence) {
    return null;
  }

  const getConfidenceLevelColor = (level: string) => {
    switch (level) {
      case 'HIGH':
        return 'bg-green-500/10 text-green-600 dark:text-green-400';
      case 'MEDIUM':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
      case 'LOW':
        return 'bg-red-500/10 text-red-600 dark:text-red-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const breakdownItems = confidence.breakdown
    ? [
        {
          label: 'Data Sufficiency',
          value: confidence.breakdown.data_sufficiency,
        },
        {
          label: 'H2H Reliability',
          value: confidence.breakdown.h2h_reliability,
        },
        {
          label: 'Form Stability',
          value: confidence.breakdown.form_stability,
        },
        {
          label: 'Predictive Certainty',
          value: confidence.breakdown.predictive_certainty,
        },
      ]
    : [];

  const dataQuality = confidence.data_quality;
  const variance = confidence.variance;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-base sm:text-lg'>
          <Shield className='h-4 w-4 sm:h-5 sm:w-5' />
          Confidence Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Overall Confidence */}
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm font-medium'>Overall Confidence</p>
            {confidence.level && (
              <Badge
                className={cn(
                  'mt-1',
                  getConfidenceLevelColor(confidence.level),
                )}
              >
                {confidence.level}
              </Badge>
            )}
          </div>
          <div className='text-2xl font-bold sm:text-3xl'>
            {confidence.overall != null ? `${confidence.overall}%` : 'N/A'}
          </div>
        </div>

        {/* Breakdown */}
        {breakdownItems.length > 0 && (
          <div className='space-y-2'>
            <p className='text-xs font-medium text-muted-foreground sm:text-sm'>
              Breakdown
            </p>
            <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
              {breakdownItems.map((item) => (
                <div
                  key={item.label}
                  className='flex items-center justify-between rounded-lg border bg-muted/30 p-2.5'
                >
                  <span className='text-xs text-muted-foreground sm:text-sm'>
                    {item.label}
                  </span>
                  <span className='text-sm font-semibold sm:text-base'>
                    {item.value != null ? `${item.value}%` : 'N/A'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Quality */}
        {dataQuality && (
          <div className='space-y-2 rounded-lg border bg-muted/30 p-3'>
            <p className='text-xs font-medium text-muted-foreground sm:text-sm'>
              Data Quality
            </p>
            <div className='grid grid-cols-2 gap-2 text-xs sm:text-sm'>
              {dataQuality.h2h_available != null && (
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>H2H Available:</span>
                  <span className='font-medium'>
                    {dataQuality.h2h_available ? 'Yes' : 'No'}
                  </span>
                </div>
              )}
              {dataQuality.h2h_matches != null && (
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>H2H Matches:</span>
                  <span className='font-medium'>{dataQuality.h2h_matches}</span>
                </div>
              )}
              {dataQuality.home_form_sample != null && (
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Home Form:</span>
                  <span className='font-medium'>
                    {dataQuality.home_form_sample} matches
                  </span>
                </div>
              )}
              {dataQuality.away_form_sample != null && (
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Away Form:</span>
                  <span className='font-medium'>
                    {dataQuality.away_form_sample} matches
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Variance */}
        {variance && (
          <div className='space-y-2 rounded-lg border bg-muted/30 p-3'>
            <p className='text-xs font-medium text-muted-foreground sm:text-sm'>
              Variance & Context
            </p>
            <div className='grid grid-cols-2 gap-2 text-xs sm:text-sm'>
              {variance.home_variance != null && (
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Home Variance:</span>
                  <span className='font-medium'>{variance.home_variance}%</span>
                </div>
              )}
              {variance.away_variance != null && (
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Away Variance:</span>
                  <span className='font-medium'>{variance.away_variance}%</span>
                </div>
              )}
              {variance.is_derby != null && (
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Derby Match:</span>
                  <span className='font-medium'>
                    {variance.is_derby ? 'Yes' : 'No'}
                  </span>
                </div>
              )}
              {variance.is_cup_match != null && (
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Cup Match:</span>
                  <span className='font-medium'>
                    {variance.is_cup_match ? 'Yes' : 'No'}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reducing Factors */}
        {confidence.reducing_factors &&
          confidence.reducing_factors.length > 0 && (
            <div className='space-y-2'>
              <p className='text-xs font-medium text-muted-foreground sm:text-sm'>
                Reducing Factors
              </p>
              <ul className='space-y-1.5'>
                {confidence.reducing_factors.map((factor, index) => {
                  if (!factor) return null;
                  return (
                    <li
                      key={index}
                      className='flex items-start gap-2 text-xs text-muted-foreground sm:text-sm'
                    >
                      <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-600 dark:bg-yellow-400' />
                      <span className='flex-1'>{factor}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
