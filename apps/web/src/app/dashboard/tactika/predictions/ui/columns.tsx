'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import type { Prediction } from '@/types/prediction';

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

export const columns: ColumnDef<Prediction>[] = [
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
    accessorKey: 'home_team_name',
    header: 'Home Team',
    cell: ({ row }) => {
      return (
        <div className='font-medium text-sm sm:text-base'>
          {row.getValue('home_team_name')}
        </div>
      );
    },
    enableSorting: false, // Server-side sorting handled by sort selector
  },
  {
    accessorKey: 'away_team_name',
    header: 'Away Team',
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
    accessorKey: 'recommended_outcome',
    header: 'Recommended',
    cell: ({ row }) => {
      const prediction = row.original;
      return (
        <div className='flex flex-col space-y-1'>
          <Badge variant={getOutcomeVariant(prediction.recommended_outcome)}>
            {prediction.recommended_outcome}
          </Badge>
          <div className='text-xs text-muted-foreground'>
            {prediction.recommended_probability}% probability
          </div>
        </div>
      );
    },
    enableSorting: false, // Server-side sorting handled by sort selector
  },
  {
    accessorKey: 'confidence',
    header: 'Confidence',
    cell: ({ row }) => {
      const confidence = row.original.confidence;
      return (
        <div className='flex flex-col space-y-1'>
          <Badge variant={getConfidenceVariant(confidence.level)}>
            {confidence.level}
          </Badge>
          <div className='text-xs text-muted-foreground'>
            {confidence.overall}% overall
          </div>
        </div>
      );
    },
    enableSorting: false, // Server-side sorting handled by sort selector
  },
  {
    accessorKey: 'scores',
    header: 'Probabilities',
    cell: ({ row }) => {
      const scores = row.original.scores;
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
  // Ranked Outcomes - Create separate columns for each rank (1-5)
  {
    id: 'ranked_outcome_1',
    header: 'Rank 1',
    cell: ({ row }) => {
      const rankedOutcomes = row.original.ranked_outcomes;
      const outcome = rankedOutcomes?.find((o) => o.rank === 1);

      if (!outcome) {
        return <div className='text-xs text-muted-foreground'>—</div>;
      }

      return (
        <div className='flex flex-col gap-1'>
          <div className='font-medium text-xs sm:text-sm'>
            {outcome.outcome}
          </div>
          <div className='flex items-center gap-1.5'>
            <Badge
              variant={
                outcome.confidence >= 75
                  ? 'default'
                  : outcome.confidence >= 50
                  ? 'secondary'
                  : 'outline'
              }
              className='text-[10px] px-1.5 py-0'
            >
              {outcome.probability}%
            </Badge>
            <span className='text-[10px] text-muted-foreground'>
              ({outcome.confidence}% conf)
            </span>
          </div>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: 'ranked_outcome_2',
    header: 'Rank 2',
    cell: ({ row }) => {
      const rankedOutcomes = row.original.ranked_outcomes;
      const outcome = rankedOutcomes?.find((o) => o.rank === 2);

      if (!outcome) {
        return <div className='text-xs text-muted-foreground'>—</div>;
      }

      return (
        <div className='flex flex-col gap-1'>
          <div className='font-medium text-xs sm:text-sm'>
            {outcome.outcome}
          </div>
          <div className='flex items-center gap-1.5'>
            <Badge
              variant={
                outcome.confidence >= 75
                  ? 'default'
                  : outcome.confidence >= 50
                  ? 'secondary'
                  : 'outline'
              }
              className='text-[10px] px-1.5 py-0'
            >
              {outcome.probability}%
            </Badge>
            <span className='text-[10px] text-muted-foreground'>
              ({outcome.confidence}% conf)
            </span>
          </div>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: 'ranked_outcome_3',
    header: 'Rank 3',
    cell: ({ row }) => {
      const rankedOutcomes = row.original.ranked_outcomes;
      const outcome = rankedOutcomes?.find((o) => o.rank === 3);

      if (!outcome) {
        return <div className='text-xs text-muted-foreground'>—</div>;
      }

      return (
        <div className='flex flex-col gap-1'>
          <div className='font-medium text-xs sm:text-sm'>
            {outcome.outcome}
          </div>
          <div className='flex items-center gap-1.5'>
            <Badge
              variant={
                outcome.confidence >= 75
                  ? 'default'
                  : outcome.confidence >= 50
                  ? 'secondary'
                  : 'outline'
              }
              className='text-[10px] px-1.5 py-0'
            >
              {outcome.probability}%
            </Badge>
            <span className='text-[10px] text-muted-foreground'>
              ({outcome.confidence}% conf)
            </span>
          </div>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: 'ranked_outcome_4',
    header: 'Rank 4',
    cell: ({ row }) => {
      const rankedOutcomes = row.original.ranked_outcomes;
      const outcome = rankedOutcomes?.find((o) => o.rank === 4);

      if (!outcome) {
        return <div className='text-xs text-muted-foreground'>—</div>;
      }

      return (
        <div className='flex flex-col gap-1'>
          <div className='font-medium text-xs sm:text-sm'>
            {outcome.outcome}
          </div>
          <div className='flex items-center gap-1.5'>
            <Badge
              variant={
                outcome.confidence >= 75
                  ? 'default'
                  : outcome.confidence >= 50
                  ? 'secondary'
                  : 'outline'
              }
              className='text-[10px] px-1.5 py-0'
            >
              {outcome.probability}%
            </Badge>
            <span className='text-[10px] text-muted-foreground'>
              ({outcome.confidence}% conf)
            </span>
          </div>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: 'ranked_outcome_5',
    header: 'Rank 5',
    cell: ({ row }) => {
      const rankedOutcomes = row.original.ranked_outcomes;
      const outcome = rankedOutcomes?.find((o) => o.rank === 5);

      if (!outcome) {
        return <div className='text-xs text-muted-foreground'>—</div>;
      }

      return (
        <div className='flex flex-col gap-1'>
          <div className='font-medium text-xs sm:text-sm'>
            {outcome.outcome}
          </div>
          <div className='flex items-center gap-1.5'>
            <Badge
              variant={
                outcome.confidence >= 75
                  ? 'default'
                  : outcome.confidence >= 50
                  ? 'secondary'
                  : 'outline'
              }
              className='text-[10px] px-1.5 py-0'
            >
              {outcome.probability}%
            </Badge>
            <span className='text-[10px] text-muted-foreground'>
              ({outcome.confidence}% conf)
            </span>
          </div>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const prediction = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(prediction._id)}
            >
              Copy prediction ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(String(prediction.fixture_id))
              }
            >
              Copy fixture ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {prediction.fixture_id && (
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/tactika/predictions/${prediction.fixture_id}`}
                >
                  View details
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>View justification</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
