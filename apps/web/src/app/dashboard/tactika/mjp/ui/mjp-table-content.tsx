'use client';

import * as React from 'react';

import { DataTable } from '../../components/data-table';
import { columns } from './columns';

import { MjpTableSkeleton } from './mjp-table-skeleton';
import { MjpTableError } from './mjp-table-error';
import { useMjpAnalysis } from '../hooks';

/**
 * MJP analysis table content component
 *
 * Handles data fetching, state management, and renders the data table.
 */
export function MjpTableContent() {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);

  const { data, isLoading, error } = useMjpAnalysis({
    page,
    limit,
  });

  if (isLoading) {
    return <MjpTableSkeleton />;
  }

  if (error) {
    return <MjpTableError error={error} />;
  }

  if (!data) {
    return <MjpTableSkeleton />;
  }

  const records = data.records || [];
  const totalCount = data.count ?? records.length;
  const totalPages = data.pages ?? 1;
  const hasNextPage = data.has_next_page ?? false;
  const hasPrevPage = data.has_prev_page ?? false;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing page size
  };

  return (
    <div className='space-y-4'>
      <DataTable
        columns={columns}
        data={records}
        isLoading={false}
        totalCount={totalCount}
        currentPage={page}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
