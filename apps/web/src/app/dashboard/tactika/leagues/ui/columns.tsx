'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { Star } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { League } from '@/types/league';
import { useStarLeague, useUnstarLeague } from '../hooks';

/**
 * Format date to relative time or readable format
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  }
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

export const columns: ColumnDef<League>[] = [
  {
    accessorKey: 'league_logo',
    header: 'Logo',
    cell: ({ row }) => {
      const logo = row.getValue('league_logo') as string;
      return (
        <div className='flex items-center justify-center'>
          {logo ? (
            <Image
              src={logo}
              alt={`${row.original.league_name} logo`}
              width={32}
              height={32}
              className='h-6 w-6 sm:h-8 sm:w-8 rounded-sm object-contain'
            />
          ) : (
            <div className='h-6 w-6 sm:h-8 sm:w-8 rounded-sm bg-muted flex items-center justify-center text-xs'>
              ?
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'league_name',
    header: 'League Name',
    cell: ({ row }) => {
      const league = row.original;
      return (
        <div className='flex flex-col space-y-1'>
          <div className='font-medium text-sm sm:text-base flex items-center gap-2'>
            {league.league_name}
            {league.is_starred && (
              <Star className='h-3 w-3 sm:h-4 sm:w-4 fill-yellow-500 text-yellow-500' />
            )}
          </div>
          <div className='text-xs text-muted-foreground'>
            {league.league_type}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'country_name',
    header: 'Country',
    cell: ({ row }) => {
      const league = row.original;
      return (
        <div className='flex items-center gap-2'>
          {league.country_flag && (
            <Image
              src={league.country_flag}
              alt={league.country_name}
              width={20}
              height={15}
              className='h-4 w-6 rounded-sm object-cover'
            />
          )}
          <div className='flex flex-col'>
            <span className='text-sm font-medium'>{league.country_name}</span>
            <span className='text-xs text-muted-foreground'>
              {league.country_code}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ row }) => {
      const league = row.original;
      return (
        <div className='flex flex-col gap-1'>
          <Badge variant={league.is_active ? 'default' : 'secondary'}>
            {league.is_active ? 'Active' : 'Inactive'}
          </Badge>
          {league.is_deleted && (
            <Badge variant='destructive' className='text-xs'>
              Deleted
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'sync_source',
    header: 'Source',
    cell: ({ row }) => {
      const source = row.getValue('sync_source') as string;
      return (
        <Badge variant='outline' className='text-xs'>
          {source}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'last_synced_at',
    header: 'Last Synced',
    cell: ({ row }) => {
      const dateString = row.getValue('last_synced_at') as string;
      return (
        <div className='text-xs sm:text-sm text-muted-foreground'>
          {formatDate(dateString)}
        </div>
      );
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
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const league = row.original;
      return <LeagueActions league={league} />;
    },
  },
];

/**
 * League Actions Component
 *
 * Handles star/unstar actions for a league.
 */
function LeagueActions({ league }: { league: League }) {
  const starLeague = useStarLeague();
  const unstarLeague = useUnstarLeague();

  const handleStarToggle = () => {
    if (league.is_starred) {
      unstarLeague.mutate(league._id);
    } else {
      starLeague.mutate(league._id);
    }
  };

  const isLoading = starLeague.isPending || unstarLeague.isPending;

  return (
    <Button
      variant='ghost'
      size='icon'
      className='h-8 w-8'
      onClick={handleStarToggle}
      disabled={isLoading}
      aria-label={league.is_starred ? 'Unstar league' : 'Star league'}
    >
      <Star
        className={cn(
          'h-4 w-4',
          league.is_starred
            ? 'fill-yellow-500 text-yellow-500'
            : 'text-muted-foreground',
        )}
      />
    </Button>
  );
}
