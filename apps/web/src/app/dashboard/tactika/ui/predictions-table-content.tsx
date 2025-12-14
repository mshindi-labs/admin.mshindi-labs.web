'use client';

import * as React from 'react';

import { DataTable } from '../data-table';
import { columns } from '../columns';

import { PredictionSortField, SortOrder } from '@/types';
import { PredictionsTableSkeleton } from './predictions-table-skeleton';
import { PredictionsTableError } from './predictions-table-error';
import { PredictionsTableSort } from './predictions-table-sort';
import { usePredictions } from '../hooks/use-predictions';

/**
 * Predictions table content component
 *
 * Handles data fetching, state management, and renders the data table.
 */
export function PredictionsTableContent() {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [sortField, setSortField] = React.useState<
    PredictionSortField | undefined
  >();
  const [sortOrder, setSortOrder] = React.useState<SortOrder>(SortOrder.DESC);

  const { data, isLoading, error } = usePredictions({
    page,
    limit,
    sort: sortField,
    order: sortOrder,
  });

  if (isLoading) {
    return <PredictionsTableSkeleton />;
  }

  if (error) {
    return <PredictionsTableError error={error} />;
  }

  const predictions = data?.records || [];
  const totalCount = data?.count;
  const totalPages = data?.pages ?? 1;
  const hasNextPage = data?.has_next_page ?? false;
  const hasPrevPage = data?.has_prev_page ?? false;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing page size
  };

  const handleSortChange = (field: PredictionSortField, order: SortOrder) => {
    setSortField(field);
    setSortOrder(order);
    setPage(1); // Reset to first page when changing sort
  };

  return (
    <div className='space-y-4'>
      <PredictionsTableSort
        sortField={sortField}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
      <DataTable
        columns={columns}
        data={predictions}
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
