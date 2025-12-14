'use client';

import * as React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { type Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  /**
   * Total count of all records from the API (across all pages).
   * If not provided, falls back to filtered row count.
   */
  totalCount?: number;
  /**
   * Current page number (1-indexed) from the API.
   * Required for server-side pagination.
   */
  currentPage?: number;
  /**
   * Total number of pages from the API.
   * Required for server-side pagination.
   */
  totalPages?: number;
  /**
   * Whether there is a next page available.
   * Required for server-side pagination.
   */
  hasNextPage?: boolean;
  /**
   * Whether there is a previous page available.
   * Required for server-side pagination.
   */
  hasPrevPage?: boolean;
  /**
   * Callback when page changes.
   * Required for server-side pagination.
   */
  onPageChange?: (page: number) => void;
  /**
   * Callback when page size changes.
   * Required for server-side pagination.
   */
  onPageSizeChange?: (pageSize: number) => void;
  /**
   * Custom page size options. Defaults to [10, 20, 30, 50, 100]
   */
  pageSizeOptions?: number[];
  /**
   * Whether to show row selection count. Defaults to false.
   */
  showRowSelection?: boolean;
  /**
   * Custom label for the rows per page selector. Defaults to "Rows per page"
   */
  rowsPerPageLabel?: string;
}

/**
 * Reusable pagination component for data tables
 *
 * Features:
 * - Page size selector
 * - Navigation controls (first, previous, next, last)
 * - Page information display
 * - Optional row selection count
 * - Mobile-first responsive design
 *
 * @example
 * ```tsx
 * <DataTablePagination table={table} />
 * ```
 *
 * @example
 * ```tsx
 * <DataTablePagination
 *   table={table}
 *   pageSizeOptions={[5, 10, 20, 50]}
 *   showRowSelection
 * />
 * ```
 */
export function DataTablePagination<TData>({
  table,
  totalCount,
  currentPage: apiCurrentPage,
  totalPages: apiTotalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 30, 50, 100],
  showRowSelection = false,
  rowsPerPageLabel = 'Rows per page',
}: DataTablePaginationProps<TData>) {
  // Determine if we're using server-side pagination
  const isServerSidePagination =
    apiCurrentPage !== undefined &&
    apiTotalPages !== undefined &&
    hasNextPage !== undefined &&
    hasPrevPage !== undefined &&
    onPageChange !== undefined;

  // Use server-side pagination values if available, otherwise fall back to client-side
  const pageCount = apiTotalPages ?? table.getPageCount();
  const currentPage =
    apiCurrentPage ?? table.getState().pagination.pageIndex + 1;
  const pageSize = table.getState().pagination.pageSize;
  const filteredRows = table.getFilteredRowModel().rows.length;
  // Use totalCount from API if provided, otherwise fall back to filtered rows
  const totalRows = totalCount ?? filteredRows;
  const selectedRows = showRowSelection
    ? table.getFilteredSelectedRowModel().rows.length
    : 0;

  // Calculate the range of rows being displayed
  const startRow = isServerSidePagination
    ? (apiCurrentPage! - 1) * pageSize + 1
    : table.getState().pagination.pageIndex * pageSize + 1;
  const endRow = isServerSidePagination
    ? Math.min(apiCurrentPage! * pageSize, totalRows)
    : Math.min(
        (table.getState().pagination.pageIndex + 1) * pageSize,
        filteredRows,
      );

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    if (isServerSidePagination && onPageChange) {
      onPageChange(newPage);
    } else {
      table.setPageIndex(newPage - 1);
    }
  };

  // Handle page size changes
  const handlePageSizeChange = (newPageSize: number) => {
    if (isServerSidePagination && onPageSizeChange) {
      onPageSizeChange(newPageSize);
      // Reset to first page when changing page size
      if (onPageChange) {
        onPageChange(1);
      }
    } else {
      table.setPageSize(newPageSize);
      table.setPageIndex(0);
    }
  };

  // Determine if navigation buttons should be disabled
  const canGoPrevious = isServerSidePagination
    ? hasPrevPage ?? false
    : table.getCanPreviousPage();
  const canGoNext = isServerSidePagination
    ? hasNextPage ?? false
    : table.getCanNextPage();

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
      {/* Row Selection Count (if enabled) */}
      {showRowSelection && selectedRows > 0 && (
        <div className='text-muted-foreground text-sm'>
          {selectedRows} of {totalRows} row(s) selected.
        </div>
      )}

      {/* Page Information */}
      <div className='text-muted-foreground flex-1 text-sm'>
        {totalRows > 0 ? (
          <>
            Showing {startRow} to {endRow} of {totalRows} row(s).
          </>
        ) : (
          'No rows to display.'
        )}
      </div>

      {/* Controls */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6'>
        {/* Rows per page selector */}
        <div className='flex items-center gap-2'>
          <p className='text-sm font-medium whitespace-nowrap'>
            {rowsPerPageLabel}
          </p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              handlePageSizeChange(Number(value));
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page information */}
        <div className='flex items-center justify-center text-sm font-medium whitespace-nowrap'>
          Page {currentPage} of {pageCount || 1}
        </div>

        {/* Navigation buttons */}
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='icon'
            className='hidden size-8 lg:flex'
            onClick={() => handlePageChange(1)}
            disabled={!canGoPrevious}
            aria-label='Go to first page'
          >
            <ChevronsLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!canGoPrevious}
            aria-label='Go to previous page'
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!canGoNext}
            aria-label='Go to next page'
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            size='icon'
            className='hidden size-8 lg:flex'
            onClick={() => handlePageChange(pageCount)}
            disabled={!canGoNext}
            aria-label='Go to last page'
          >
            <ChevronsRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
