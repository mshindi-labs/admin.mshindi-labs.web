'use client';

import * as React from 'react';

import { DataTable } from '../../ui/data-table';
import { columns } from './columns';

import { HotPicksTableSkeleton } from './hot-picks-table-skeleton';
import { HotPicksTableError } from './hot-picks-table-error';
import { useTopPicks } from '../../hooks';
import type { TopPicksSection, TopPicksOutcome } from '@/types/top-picks';

interface HotPicksTableContentProps {
  /**
   * Section to display from the top picks response
   * @default 'hottest'
   */
  section?: TopPicksSection;
  /**
   * Outcome type when section is 'by_outcome'
   */
  outcome?: TopPicksOutcome;
}

/**
 * Hot picks table content component
 *
 * Handles data fetching, state management, and renders the data table.
 */
export function HotPicksTableContent({
  section = 'hottest',
  outcome,
}: HotPicksTableContentProps) {
  const { data, isLoading, error } = useTopPicks();

  if (isLoading) {
    return <HotPicksTableSkeleton />;
  }

  if (error) {
    return <HotPicksTableError error={error} />;
  }

  if (!data) {
    return <HotPicksTableSkeleton />;
  }

  // Get the appropriate data array based on section
  let picks: typeof data.hottest = [];
  if (section === 'hottest') {
    picks = data.hottest || [];
  } else if (section === 'overall') {
    picks = data.overall || [];
  } else if (section === 'by_outcome' && outcome && data.by_outcome) {
    picks = data.by_outcome[outcome] || [];
  }

  return (
    <div className='space-y-4'>
      <DataTable
        columns={columns}
        data={picks}
        isLoading={false}
        totalCount={picks.length}
        currentPage={1}
        totalPages={1}
        hasNextPage={false}
        hasPrevPage={false}
        onPageChange={() => {
          // No pagination for top picks
        }}
        onPageSizeChange={() => {
          // No pagination for top picks
        }}
      />
    </div>
  );
}
