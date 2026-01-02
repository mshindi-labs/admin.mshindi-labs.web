'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '../../../components/data-table';
import type { MjpPrediction } from '@/types';

interface PredictionsTableProps {
  predictions?: MjpPrediction[];
}

/**
 * Get quality tier badge variant
 */
function getQualityTierVariant(
  tier?: string,
): 'default' | 'secondary' | 'destructive' | 'outline' {
  if (!tier) return 'outline';
  switch (tier.toUpperCase()) {
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
 * Get outcome badge variant
 */
function getOutcomeVariant(
  outcome?: string,
): 'default' | 'secondary' | 'destructive' | 'outline' {
  if (!outcome) return 'outline';
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

const columns: ColumnDef<MjpPrediction>[] = [
  {
    accessorKey: 'rank',
    header: 'Rank',
    cell: ({ row }) => {
      const rank = row.getValue('rank') as number | undefined;
      return (
        <div className='text-sm font-medium'>
          {rank !== undefined ? `#${rank}` : '—'}
        </div>
      );
    },
  },
  {
    accessorKey: 'fixture_id',
    header: 'Fixture ID',
    cell: ({ row }) => {
      const fixtureId = row.getValue('fixture_id') as number | undefined;
      if (!fixtureId) {
        return (
          <div className='font-mono text-xs text-muted-foreground'>—</div>
        );
      }
      return (
        <Link
          href={`/dashboard/tactika/predictions/${fixtureId}` as any}
          className='font-mono text-xs text-primary underline-offset-4 hover:underline'
        >
          {fixtureId}
        </Link>
      );
    },
  },
  {
    accessorKey: 'match_label',
    header: 'Match',
    cell: ({ row }) => {
      return (
        <div className='text-sm font-medium'>
          {row.getValue('match_label') || '—'}
        </div>
      );
    },
  },
  {
    accessorKey: 'league_name',
    header: 'League',
    cell: ({ row }) => {
      return (
        <div className='text-xs text-muted-foreground'>
          {row.getValue('league_name') || '—'}
        </div>
      );
    },
  },
  {
    accessorKey: 'fixture_date',
    header: 'Date',
    cell: ({ row }) => {
      const dateStr = row.getValue('fixture_date') as string | undefined;
      if (!dateStr) {
        return <div className='text-xs text-muted-foreground'>—</div>;
      }
      try {
        const date = new Date(dateStr);
        return (
          <div className='text-xs text-muted-foreground'>
            {format(date, 'PPp')}
          </div>
        );
      } catch {
        return <div className='text-xs text-muted-foreground'>{dateStr}</div>;
      }
    },
  },
  {
    accessorKey: 'recommended_outcome',
    header: 'Outcome',
    cell: ({ row }) => {
      const outcome = row.getValue('recommended_outcome') as string | undefined;
      return (
        <Badge variant={getOutcomeVariant(outcome)} className='text-xs'>
          {outcome || '—'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'combined_probability',
    header: 'Probability',
    cell: ({ row }) => {
      const prob = row.getValue('combined_probability') as number | undefined;
      return (
        <div className='text-sm font-medium'>
          {prob !== undefined ? `${(prob * 100).toFixed(1)}%` : '—'}
        </div>
      );
    },
  },
  {
    accessorKey: 'confidence_score',
    header: 'Confidence',
    cell: ({ row }) => {
      const confidence = row.getValue('confidence_score') as number | undefined;
      return (
        <div className='text-xs text-muted-foreground'>
          {confidence !== undefined ? `${confidence}%` : '—'}
        </div>
      );
    },
  },
  {
    accessorKey: 'quality_tier',
    header: 'Quality',
    cell: ({ row }) => {
      const tier = row.getValue('quality_tier') as string | undefined;
      return (
        <Badge variant={getQualityTierVariant(tier)} className='text-xs'>
          {tier || '—'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'strategy_name',
    header: 'Strategy',
    cell: ({ row }) => {
      return (
        <div className='text-xs text-muted-foreground'>
          {row.getValue('strategy_name') || '—'}
        </div>
      );
    },
  },
];

/**
 * Predictions Table Component
 *
 * Displays predictions in a sortable, filterable table.
 */
export function PredictionsTable({ predictions }: PredictionsTableProps) {
  if (!predictions || predictions.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base sm:text-lg'>Predictions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='overflow-x-auto'>
          <DataTable
            columns={columns}
            data={predictions}
            isLoading={false}
            totalCount={predictions.length}
            currentPage={1}
            totalPages={1}
            hasNextPage={false}
            hasPrevPage={false}
            onPageChange={() => {}}
            onPageSizeChange={() => {}}
          />
        </div>
      </CardContent>
    </Card>
  );
}
