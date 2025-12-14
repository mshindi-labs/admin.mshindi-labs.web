'use client';

import * as React from 'react';
import Image from 'next/image';

import { DataTable } from '../../components/data-table';
import { columns } from './columns';
import { SearchSelect } from '@/components/search-select';
import type { SearchSelectOption } from '@/components/search-select';

import { LeaguesTableSkeleton } from './leagues-table-skeleton';
import { LeaguesTableError } from './leagues-table-error';
import { useLeagues } from '../hooks';
import { useCountries } from '../../hooks';

/**
 * Leagues table content component
 *
 * Handles data fetching, state management, and renders the data table.
 */
export function LeaguesTableContent() {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [country, setCountry] = React.useState<string | undefined>(undefined);

  // Fetch countries for the filter
  const { data: countriesData } = useCountries();

  const { data, isLoading, error } = useLeagues({
    page,
    limit,
    ...(country ? { country } : {}),
  });

  if (isLoading) {
    return <LeaguesTableSkeleton />;
  }

  if (error) {
    return <LeaguesTableError error={error} />;
  }

  if (!data) {
    return <LeaguesTableSkeleton />;
  }

  const leagues = data.records || [];
  const totalCount = data.count ?? leagues.length;
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

  const handleCountryChange = (value: string | undefined) => {
    setCountry(value);
    setPage(1); // Reset to first page when changing filter
  };

  const countries = countriesData?.data || [];
  const filteredCountries = countries.filter(
    (c) => c.code !== null && c.flag !== null,
  );

  // Transform countries to SearchSelect options
  const countryOptions: SearchSelectOption<string>[] = React.useMemo(
    () =>
      filteredCountries.map((c) => ({
        value: c.name,
        label: c.name,
        metadata: { code: c.code, flag: c.flag },
      })),
    [filteredCountries],
  );

  return (
    <div className='space-y-4'>
      {/* Country Filter */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium whitespace-nowrap'>
            Filter by country:
          </span>
          <SearchSelect
            options={countryOptions}
            value={country}
            onValueChange={handleCountryChange}
            placeholder='All countries'
            searchPlaceholder='Search countries...'
            width='250px'
            renderOption={(option) => {
              const flag = option.metadata?.flag as string | undefined;
              return (
                <div className='flex items-center gap-2'>
                  {flag && (
                    <Image
                      src={flag}
                      alt={option.label}
                      width={20}
                      height={15}
                      className='h-4 w-6 rounded-sm object-cover'
                    />
                  )}
                  <span>{option.label}</span>
                </div>
              );
            }}
            renderValue={(option) => {
              if (!option) return 'All countries';
              const flag = option.metadata?.flag as string | undefined;
              return (
                <div className='flex items-center gap-2'>
                  {flag && (
                    <Image
                      src={flag}
                      alt={option.label}
                      width={20}
                      height={15}
                      className='h-4 w-6 rounded-sm object-cover'
                    />
                  )}
                  <span>{option.label}</span>
                </div>
              );
            }}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={leagues}
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
