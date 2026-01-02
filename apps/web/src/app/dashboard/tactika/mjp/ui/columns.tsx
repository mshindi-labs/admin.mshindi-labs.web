'use client';

import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import type { MjpAnalysis } from '@/types';

export const columns: ColumnDef<MjpAnalysis>[] = [
  {
    accessorKey: 'request_id',
    header: 'Request ID',
    cell: ({ row }) => {
      const requestId = row.getValue('request_id') as string;
      if (!requestId) {
        return (
          <div className='font-mono text-xs sm:text-sm text-muted-foreground'>
            —
          </div>
        );
      }
      return (
        <Link
          href={`/dashboard/tactika/mjp/${requestId}` as any}
          className='font-mono text-xs text-primary underline-offset-4 hover:underline sm:text-sm'
        >
          {requestId}
        </Link>
      );
    },
  },
  {
    accessorKey: 'analysis_type',
    header: 'Analysis Type',
    cell: ({ row }) => {
      const analysisType = row.getValue('analysis_type') as string;
      return (
        <Badge variant='outline' className='text-xs sm:text-sm'>
          {analysisType.replace('_', ' ').toUpperCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'fixture_count',
    header: 'Fixture Count',
    cell: ({ row }) => {
      return (
        <div className='text-sm sm:text-base font-medium'>
          {row.getValue('fixture_count')}
        </div>
      );
    },
  },
  {
    accessorKey: 'fixture_ids',
    header: 'Fixture IDs',
    cell: ({ row }) => {
      const fixtureIds = row.getValue('fixture_ids') as number[];
      if (!fixtureIds || fixtureIds.length === 0) {
        return <div className='text-xs text-muted-foreground'>—</div>;
      }

      // Show first few IDs, then count
      const displayCount = 3;
      const displayIds = fixtureIds.slice(0, displayCount);
      const remainingCount = fixtureIds.length - displayCount;

      return (
        <div className='flex flex-col gap-1'>
          <div className='flex flex-wrap gap-1'>
            {displayIds.map((id) => (
              <span
                key={id}
                className='font-mono text-xs text-muted-foreground'
              >
                {id}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className='text-xs text-muted-foreground'>
                +{remainingCount} more
              </span>
            )}
          </div>
          {fixtureIds.length > displayCount && (
            <div className='text-xs text-muted-foreground'>
              Total: {fixtureIds.length} fixtures
            </div>
          )}
        </div>
      );
    },
  },
];
