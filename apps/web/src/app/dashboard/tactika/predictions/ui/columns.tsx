'use client';

import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Prediction } from '@/types/prediction';
import { MetricsPopover } from './metrics-popover';
import { BettingRecommendationPopover } from './betting-recommendation-popover';

/**
 * Format confidence level badge variant
 */
function getConfidenceVariant(
  level: string,
): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (level) {
    case 'HIGH':
      return 'default';
    case 'MEDIUM':
      return 'secondary';
    case 'LOW':
      return 'destructive';
    default:
      return 'outline';
  }
}

/**
 * Format recommended outcome badge variant
 */
function getOutcomeVariant(
  outcome: string,
): 'default' | 'secondary' | 'destructive' | 'outline' {
  const lowerOutcome = outcome.toLowerCase();
  if (lowerOutcome.includes('home') || lowerOutcome.includes('win')) {
    return 'default';
  }
  if (lowerOutcome.includes('draw')) {
    return 'secondary';
  }
  if (lowerOutcome.includes('away')) {
    return 'destructive';
  }
  return 'outline';
}

export function createColumns(): ColumnDef<Prediction>[] {
  return [
    {
      accessorKey: 'fixture_id',
      header: 'Fixture ID',
      cell: ({ row }) => {
        const fixtureId = row.getValue('fixture_id') as number;
        if (!fixtureId) {
          return (
            <div className='font-mono text-xs sm:text-sm text-muted-foreground'>
              —
            </div>
          );
        }
        return (
          <Link
            href={`/dashboard/tactika/predictions/${fixtureId}`}
            className='font-mono text-xs text-primary underline-offset-4 hover:underline sm:text-sm'
          >
            {fixtureId}
          </Link>
        );
      },
      enableSorting: false, // Server-side sorting handled by sort selector
    },
    {
      accessorKey: 'fixture_date',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='-ml-3 h-auto p-0 hover:bg-transparent'
          >
            Fixture Date
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className='ml-2 h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className='ml-2 h-4 w-4' />
            ) : (
              <ArrowUpDown className='ml-2 h-4 w-4 opacity-50' />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        const fixtureDate = row.getValue('fixture_date') as string;
        if (!fixtureDate) {
          return (
            <div className='text-xs sm:text-sm text-muted-foreground'>—</div>
          );
        }
        try {
          const date = new Date(fixtureDate);
          return (
            <div className='text-xs sm:text-sm'>{format(date, 'PPp')}</div>
          );
        } catch {
          return (
            <div className='text-xs sm:text-sm text-muted-foreground'>
              {fixtureDate}
            </div>
          );
        }
      },
      enableSorting: true, // Client-side sorting
      sortingFn: (rowA, rowB) => {
        const dateA = rowA.getValue('fixture_date') as string;
        const dateB = rowB.getValue('fixture_date') as string;
        if (!dateA) return 1;
        if (!dateB) return -1;
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      },
    },
    {
      accessorKey: 'home_team_name',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='-ml-3 h-auto p-0 hover:bg-transparent'
          >
            Home Team
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className='ml-2 h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className='ml-2 h-4 w-4' />
            ) : (
              <ArrowUpDown className='ml-2 h-4 w-4 opacity-50' />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className='font-medium text-sm sm:text-base'>
            {row.getValue('home_team_name')}
          </div>
        );
      },
      enableSorting: true, // Client-side sorting
    },
    {
      accessorKey: 'away_team_name',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='-ml-3 h-auto p-0 hover:bg-transparent'
          >
            Away Team
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className='ml-2 h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className='ml-2 h-4 w-4' />
            ) : (
              <ArrowUpDown className='ml-2 h-4 w-4 opacity-50' />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className='font-medium text-sm sm:text-base'>
            {row.getValue('away_team_name')}
          </div>
        );
      },
      enableSorting: false, // Server-side sorting handled by sort selector
    },
    {
      id: 'recommended_confidence',
      header: 'Recommendation',
      cell: ({ row }) => {
        const prediction = row.original;
        const confidence = prediction.confidence;
        return (
          <div className='flex flex-col space-y-1'>
            <Badge variant={getOutcomeVariant(prediction.recommended_outcome)}>
              {prediction.recommended_outcome}
            </Badge>
            <div className='flex items-center gap-2 text-xs text-muted-foreground'>
              <span>{prediction.recommended_probability}%</span>
              <span>•</span>
              <Badge
                variant={getConfidenceVariant(confidence.level)}
                className='h-4 px-1.5 text-[10px]'
              >
                {confidence.level}
              </Badge>
              <span>•</span>
              <span>{confidence.overall}%</span>
            </div>
          </div>
        );
      },
      enableSorting: false, // Server-side sorting handled by sort selector
    },
    {
      id: 'highest_ranked_outcome',
      header: 'Top Outcome',
      cell: ({ row }) => {
        const rankedOutcomes = row.original.ranked_outcomes;

        if (!rankedOutcomes || rankedOutcomes.length === 0) {
          return <div className='text-xs text-muted-foreground'>—</div>;
        }

        // Find the highest ranked outcome (rank 1)
        const topOutcome = rankedOutcomes.find((o) => o.rank === 1);

        if (!topOutcome) {
          return <div className='text-xs text-muted-foreground'>—</div>;
        }

        return (
          <div className='flex flex-col space-y-0.5'>
            <div className='font-medium text-xs sm:text-sm'>
              {topOutcome.outcome}
            </div>
            <div className='text-xs text-muted-foreground'>
              {topOutcome.probability}% probability
            </div>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: 'scores',
      header: 'Probabilities',
      cell: ({ row }) => {
        const scores = row.original.normalized_scores;
        return (
          <div className='flex flex-col space-y-0.5 text-xs'>
            <div className='flex items-center justify-between gap-2'>
              <span className='text-muted-foreground'>Home:</span>
              <span className='font-medium'>{scores.home_win}%</span>
            </div>
            <div className='flex items-center justify-between gap-2'>
              <span className='text-muted-foreground'>Draw:</span>
              <span className='font-medium'>{scores.draw}%</span>
            </div>
            <div className='flex items-center justify-between gap-2'>
              <span className='text-muted-foreground'>Away:</span>
              <span className='font-medium'>{scores.away_win}%</span>
            </div>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      id: 'ranked_outcomes',
      header: 'Ranked Outcomes',
      cell: ({ row }) => {
        const rankedOutcomes = row.original.ranked_outcomes;

        if (!rankedOutcomes || rankedOutcomes.length === 0) {
          return <div className='text-xs text-muted-foreground'>—</div>;
        }

        // Sort by rank to ensure proper order
        const sortedOutcomes = [...rankedOutcomes].sort(
          (a, b) => a.rank - b.rank,
        );

        const items = sortedOutcomes.map((outcome) => ({
          label: outcome.outcome,
          value: `${outcome.probability}%`,
        }));

        return (
          <MetricsPopover
            items={items}
            triggerLabel={`${sortedOutcomes.length} outcomes`}
          />
        );
      },
      enableSorting: false,
    },
    {
      id: 'confidence_metrics',
      header: 'Confidence Metrics',
      cell: ({ row }) => {
        const confidence = row.original.confidence;
        const breakdown = confidence?.breakdown;
        const metrics = confidence?.metrics;

        if (!breakdown && !metrics) {
          return <div className='text-xs text-muted-foreground'>—</div>;
        }

        const allMetrics = [
          ...(breakdown
            ? [
                {
                  label: 'Data Sufficiency',
                  value: `${breakdown.data_sufficiency}%`,
                },
                {
                  label: 'H2H Reliability',
                  value: `${breakdown.h2h_reliability}%`,
                },
                {
                  label: 'Form Stability',
                  value: `${breakdown.form_stability}%`,
                },
                {
                  label: 'Predictive Certainty',
                  value: `${breakdown.predictive_certainty}%`,
                },
              ]
            : []),
          ...(metrics
            ? [
                { label: 'Volatility', value: `${metrics.volatility}%` },
                { label: 'Entropy', value: `${metrics.entropy}%` },
                { label: 'Complexity', value: `${metrics.complexity}%` },
              ]
            : []),
        ];

        if (allMetrics.length === 0) {
          return <div className='text-xs text-muted-foreground'>—</div>;
        }

        return (
          <MetricsPopover
            items={allMetrics}
            triggerLabel={`${allMetrics.length} metrics`}
          />
        );
      },
      enableSorting: false,
    },
    {
      id: 'betting_recommendation',
      accessorFn: (row) => row.betting_recommendation?.final_decision || '',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='-ml-3 h-auto p-0 hover:bg-transparent'
          >
            Betting Recommendation
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className='ml-2 h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className='ml-2 h-4 w-4' />
            ) : (
              <ArrowUpDown className='ml-2 h-4 w-4 opacity-50' />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        const bettingRecommendation = row.original.betting_recommendation;

        if (!bettingRecommendation) {
          return <div className='text-xs text-muted-foreground'>—</div>;
        }

        return (
          <BettingRecommendationPopover
            recommendation={bettingRecommendation}
          />
        );
      },
      enableSorting: true, // Client-side sorting
    },
  ];
}
