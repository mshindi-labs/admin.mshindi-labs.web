'use client';

import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from '@/components/ui/data-table-pagination';

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading?: boolean;
  /**
   * Total count of all records from the API (across all pages).
   * Used for pagination display.
   */
  totalCount?: number;
  /**
   * Current page number (1-indexed) from the API.
   */
  currentPage?: number;
  /**
   * Total number of pages from the API.
   */
  totalPages?: number;
  /**
   * Whether there is a next page available.
   */
  hasNextPage?: boolean;
  /**
   * Whether there is a previous page available.
   */
  hasPrevPage?: boolean;
  /**
   * Callback when page changes.
   */
  onPageChange?: (page: number) => void;
  /**
   * Callback when page size changes.
   */
  onPageSizeChange?: (pageSize: number) => void;
}

export function DataTable<TData>({
  columns,
  data,
  isLoading,
  totalCount,
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  onPageSizeChange,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // Enable client-side sorting, but keep pagination server-side
    manualPagination: true,
    manualSorting: false, // Enable client-side sorting
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  // Helper to safely get column filter value
  // Check which column format exists (home_team for TopPick, home_team_name for Prediction, league_name for League)
  const getAllColumnIds = () => {
    return table.getAllColumns().map((col) => col.id);
  };

  const getFilterValue = () => {
    const columnIds = getAllColumnIds();

    // Try league_name first (for Leagues table)
    if (columnIds.includes('league_name')) {
      const column = table.getColumn('league_name');
      return (column?.getFilterValue() as string) ?? '';
    }

    // Try TopPick format (home_team)
    if (columnIds.includes('home_team')) {
      const column = table.getColumn('home_team');
      return (column?.getFilterValue() as string) ?? '';
    }

    // Fallback to Prediction format (home_team_name)
    if (columnIds.includes('home_team_name')) {
      const column = table.getColumn('home_team_name');
      return (column?.getFilterValue() as string) ?? '';
    }

    return '';
  };

  // Helper to safely set filter values
  const setFilterValue = (value: string) => {
    const columnIds = getAllColumnIds();

    // Support league_name (for Leagues table)
    if (columnIds.includes('league_name')) {
      table.getColumn('league_name')?.setFilterValue(value);
    }

    // Support both Prediction (home_team_name) and TopPick (home_team) formats
    if (columnIds.includes('home_team')) {
      table.getColumn('home_team')?.setFilterValue(value);
      table.getColumn('away_team')?.setFilterValue(value);
    }
    if (columnIds.includes('home_team_name')) {
      table.getColumn('home_team_name')?.setFilterValue(value);
      table.getColumn('away_team_name')?.setFilterValue(value);
    }
  };

  // Get filter placeholder text based on available columns
  const getFilterPlaceholder = () => {
    const columnIds = getAllColumnIds();
    if (columnIds.includes('league_name')) {
      return 'Filter by league name...';
    }
    return 'Filter by team name...';
  };

  return (
    <div className='w-full space-y-4'>
      {/* Filters and Column Visibility */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <Input
          placeholder={getFilterPlaceholder()}
          value={getFilterValue()}
          onChange={(event) => {
            setFilterValue(event.target.value);
          }}
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto w-full sm:w-auto'>
              Columns <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <DataTablePagination
        table={table}
        totalCount={totalCount}
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
