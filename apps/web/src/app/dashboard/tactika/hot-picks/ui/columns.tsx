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
import type { TopPick } from '@/types/top-picks';

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
 * Format outcome badge variant
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
  if (lowerOutcome.includes('btts') || lowerOutcome.includes('over')) {
    return 'default';
  }
  return 'outline';
}

export const columns: ColumnDef<TopPick>[] = [
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
  },
  {
    accessorKey: 'home_team',
    header: 'Home Team',
    cell: ({ row }) => {
      return (
        <div className='font-medium text-sm sm:text-base'>
          {row.getValue('home_team')}
        </div>
      );
    },
  },
  {
    accessorKey: 'away_team',
    header: 'Away Team',
    cell: ({ row }) => {
      return (
        <div className='font-medium text-sm sm:text-base'>
          {row.getValue('away_team')}
        </div>
      );
    },
  },
  {
    accessorKey: 'outcome',
    header: 'Outcome',
    cell: ({ row }) => {
      const pick = row.original;
      return (
        <div className='flex flex-col space-y-1'>
          <Badge variant={getOutcomeVariant(pick.outcome)}>
            {pick.outcome}
          </Badge>
          <div className='text-xs text-muted-foreground'>
            {pick.outcome_probability}% probability
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'confidence_level',
    header: 'Confidence',
    cell: ({ row }) => {
      const pick = row.original;
      return (
        <div className='flex flex-col space-y-1'>
          <Badge variant={getConfidenceVariant(pick.confidence_level)}>
            {pick.confidence_level}
          </Badge>
          <div className='text-xs text-muted-foreground'>
            {pick.confidence_overall}% overall
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'computed_score',
    header: 'Computed Score',
    cell: ({ row }) => {
      const score = row.getValue('computed_score') as number;
      return (
        <div className='font-medium text-sm sm:text-base'>
          {score.toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorKey: 'hot_score',
    header: 'Hot Score',
    cell: ({ row }) => {
      const pick = row.original;
      if (pick.hot_score === undefined) {
        return <div className='text-xs text-muted-foreground'>—</div>;
      }
      return (
        <div className='font-medium text-sm sm:text-base'>
          {pick.hot_score.toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorKey: 'form_stability',
    header: 'Form Stability',
    cell: ({ row }) => {
      const pick = row.original;
      if (pick.form_stability === undefined) {
        return <div className='text-xs text-muted-foreground'>—</div>;
      }
      return <div className='text-sm'>{pick.form_stability}%</div>;
    },
  },
  {
    accessorKey: 'league_id',
    header: 'League ID',
    cell: ({ row }) => {
      return (
        <div className='font-mono text-xs sm:text-sm'>
          {row.getValue('league_id')}
        </div>
      );
    },
  },
  {
    accessorKey: 'season',
    header: 'Season',
    cell: ({ row }) => {
      return <div className='text-sm'>{row.getValue('season')}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const pick = row.original;

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
              onClick={() =>
                navigator.clipboard.writeText(String(pick.fixture_id))
              }
            >
              Copy fixture ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {pick.fixture_id && (
              <>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/dashboard/tactika/predictions/${pick.fixture_id}`}
                  >
                    View details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/dashboard/tactika/predictions/${pick.fixture_id}`}
                  >
                    View prediction
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
