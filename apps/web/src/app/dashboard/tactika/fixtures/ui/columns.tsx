'use client';

import { type ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import type { FixtureItem } from '@/types/fixture';

/**
 * Format date to readable format with time
 */
function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Format date to relative time for display
 */
function formatDateRelative(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

  if (diffInSeconds < 0) {
    return 'Past';
  }
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `in ${minutes}m`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `in ${hours}h`;
  }
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `in ${days}d`;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export const columns: ColumnDef<FixtureItem>[] = [
  {
    accessorKey: 'fixture.date',
    header: 'Date & Time',
    cell: ({ row }) => {
      const date = row.original.fixture.date;
      return (
        <div className='flex flex-col space-y-1'>
          <div className='text-sm font-medium'>{formatDateTime(date)}</div>
          <div className='text-xs text-muted-foreground'>
            {formatDateRelative(date)}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'teams.home',
    header: 'Home Team',
    cell: ({ row }) => {
      const team = row.original.teams.home;
      return (
        <div className='flex items-center gap-2'>
          {team.logo && (
            <Image
              src={team.logo}
              alt={`${team.name} logo`}
              width={24}
              height={24}
              className='h-6 w-6 rounded-sm object-contain'
            />
          )}
          <span className='text-sm font-medium'>{team.name}</span>
        </div>
      );
    },
  },
  {
    id: 'vs',
    header: '',
    cell: () => {
      return (
        <div className='text-center text-muted-foreground font-medium'>vs</div>
      );
    },
  },
  {
    accessorKey: 'teams.away',
    header: 'Away Team',
    cell: ({ row }) => {
      const team = row.original.teams.away;
      return (
        <div className='flex items-center gap-2'>
          {team.logo && (
            <Image
              src={team.logo}
              alt={`${team.name} logo`}
              width={24}
              height={24}
              className='h-6 w-6 rounded-sm object-contain'
            />
          )}
          <span className='text-sm font-medium'>{team.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'fixture.venue',
    header: 'Venue',
    cell: ({ row }) => {
      const venue = row.original.fixture.venue;
      return (
        <div className='flex flex-col space-y-1'>
          <div className='text-sm font-medium'>{venue.name}</div>
          <div className='text-xs text-muted-foreground'>{venue.city}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'fixture.status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.fixture.status;
      return (
        <Badge variant='outline' className='text-xs'>
          {status.long}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'league',
    header: 'League',
    cell: ({ row }) => {
      const league = row.original.league;
      return (
        <div className='flex items-center gap-2'>
          {league.logo && (
            <Image
              src={league.logo}
              alt={`${league.name} logo`}
              width={20}
              height={20}
              className='h-5 w-5 rounded-sm object-contain'
            />
          )}
          <div className='flex flex-col space-y-0.5'>
            <span className='text-sm font-medium'>{league.name}</span>
            <span className='text-xs text-muted-foreground'>
              {league.country}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'league.round',
    header: 'Round',
    cell: ({ row }) => {
      const round = row.original.league.round;
      return <div className='text-sm text-muted-foreground'>{round}</div>;
    },
  },
];
