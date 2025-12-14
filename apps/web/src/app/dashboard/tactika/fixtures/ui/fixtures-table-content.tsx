'use client';

import * as React from 'react';

import { DataTable } from '../../components/data-table';
import { columns } from './columns';
import { FixtureFilters } from './fixture-filters';
import { FixturesTableSkeleton } from './fixtures-table-skeleton';
import { FixturesTableError } from './fixtures-table-error';
import { useQuery } from '@/lib/tanstack';
import { fixturesQueryOptions } from '../hooks';

/**
 * Fixtures table content component
 *
 * Handles data fetching, state management, and renders the data table.
 */
export function FixturesTableContent() {
  const [selectedCountry, setSelectedCountry] = React.useState<
    string | undefined
  >(undefined);
  const [selectedLeague, setSelectedLeague] = React.useState<
    string | undefined
  >(undefined);
  const [selectedRound, setSelectedRound] = React.useState<string | undefined>(
    undefined,
  );

  // Fetch fixtures only when all required parameters are selected
  const canFetchFixtures = !!selectedLeague && !!selectedRound;

  const { data, isLoading, error } = useQuery({
    ...fixturesQueryOptions(
      canFetchFixtures
        ? {
            league: selectedLeague!,
            season: 2025,
            round: selectedRound!,
            status: 'NS',
          }
        : undefined,
    ),
    enabled: canFetchFixtures,
  });

  if (isLoading && canFetchFixtures) {
    return (
      <div className='space-y-4'>
        <FixtureFilters
          selectedCountry={selectedCountry}
          selectedLeague={selectedLeague}
          selectedRound={selectedRound}
          onCountryChange={setSelectedCountry}
          onLeagueChange={setSelectedLeague}
          onRoundChange={setSelectedRound}
        />
        <FixturesTableSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className='space-y-4'>
        <FixtureFilters
          selectedCountry={selectedCountry}
          selectedLeague={selectedLeague}
          selectedRound={selectedRound}
          onCountryChange={setSelectedCountry}
          onLeagueChange={setSelectedLeague}
          onRoundChange={setSelectedRound}
        />
        <FixturesTableError error={error} />
      </div>
    );
  }

  const fixtures = data?.data || [];
  const totalCount = data?.results ?? fixtures.length;

  return (
    <div className='space-y-4'>
      <FixtureFilters
        selectedCountry={selectedCountry}
        selectedLeague={selectedLeague}
        selectedRound={selectedRound}
        onCountryChange={setSelectedCountry}
        onLeagueChange={setSelectedLeague}
        onRoundChange={setSelectedRound}
      />

      {!canFetchFixtures ? (
        <div className='rounded-md border p-8 text-center'>
          <p className='text-sm text-muted-foreground'>
            Please select a country, league, and round to view fixtures.
          </p>
        </div>
      ) : fixtures.length === 0 ? (
        <div className='rounded-md border p-8 text-center'>
          <p className='text-sm text-muted-foreground'>
            No fixtures found for the selected criteria.
          </p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={fixtures}
          isLoading={false}
          totalCount={totalCount}
          currentPage={1}
          totalPages={1}
          hasNextPage={false}
          hasPrevPage={false}
          onPageChange={() => {
            // No pagination for fixtures
          }}
          onPageSizeChange={() => {
            // No pagination for fixtures
          }}
        />
      )}
    </div>
  );
}
