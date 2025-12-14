'use client';

import * as React from 'react';
import Image from 'next/image';

import { SearchSelect } from '@/components/search-select';
import type { SearchSelectOption } from '@/components/search-select';
import { useQuery } from '@/lib/tanstack';
import { useCountries } from '../../hooks';
import { fixtureRoundsQueryOptions } from '../hooks';
import { leaguesQueryOptions } from '../../leagues/hooks';

interface FixtureFiltersProps {
  selectedCountry: string | undefined;
  selectedLeague: string | undefined;
  selectedRound: string | undefined;
  onCountryChange: (country: string | undefined) => void;
  onLeagueChange: (league: string | undefined) => void;
  onRoundChange: (round: string | undefined) => void;
}

/**
 * Fixture filters component
 *
 * Provides cascading selection: country → league → round
 */
export function FixtureFilters({
  selectedCountry,
  selectedLeague,
  selectedRound,
  onCountryChange,
  onLeagueChange,
  onRoundChange,
}: FixtureFiltersProps) {
  // Fetch countries
  const { data: countriesData } = useCountries();

  // Fetch leagues when country is selected
  const { data: leaguesData } = useQuery({
    ...leaguesQueryOptions(
      selectedCountry ? { country: selectedCountry } : undefined,
    ),
    enabled: !!selectedCountry,
  });

  // Fetch rounds when league is selected
  const { data: roundsData } = useQuery({
    ...fixtureRoundsQueryOptions(
      selectedLeague
        ? {
            league: selectedLeague,
            season: 2025,
            current: true,
          }
        : undefined,
    ),
    enabled: !!selectedLeague,
  });

  // Transform countries to SearchSelect options
  const countryOptions: SearchSelectOption<string>[] = React.useMemo(() => {
    const countries = countriesData?.data || [];
    const filteredCountries = countries.filter(
      (c) => c.code !== null && c.flag !== null,
    );

    return filteredCountries.map((c) => ({
      value: c.name,
      label: c.name,
      metadata: { code: c.code, flag: c.flag },
    }));
  }, [countriesData]);

  // Transform leagues to SearchSelect options
  const leagueOptions: SearchSelectOption<string>[] = React.useMemo(() => {
    const leagues = leaguesData?.records || [];
    return leagues.map((league) => ({
      value: String(league.league_id),
      label: league.league_name,
      metadata: {
        logo: league.league_logo,
        country: league.country_name,
      },
    }));
  }, [leaguesData]);

  // Transform rounds to SearchSelect options
  const roundOptions: SearchSelectOption<string>[] = React.useMemo(() => {
    const rounds = roundsData?.data || [];
    return rounds.map((round) => ({
      value: round,
      label: round,
    }));
  }, [roundsData]);

  // Handle country change - clear dependent selections
  const handleCountryChange = (value: string | undefined) => {
    onCountryChange(value);
    onLeagueChange(undefined);
    onRoundChange(undefined);
  };

  // Handle league change - clear round selection
  const handleLeagueChange = (value: string | undefined) => {
    onLeagueChange(value);
    onRoundChange(undefined);
  };

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:flex-wrap'>
      {/* Country Select */}
      <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
        <span className='text-sm font-medium whitespace-nowrap'>Country:</span>
        <SearchSelect
          options={countryOptions}
          value={selectedCountry}
          onValueChange={handleCountryChange}
          placeholder='Select country'
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
            if (!option) return 'Select country';
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

      {/* League Select */}
      <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
        <span className='text-sm font-medium whitespace-nowrap'>League:</span>
        <SearchSelect
          options={leagueOptions}
          value={selectedLeague}
          onValueChange={handleLeagueChange}
          placeholder='Select league'
          searchPlaceholder='Search leagues...'
          disabled={!selectedCountry}
          width='250px'
          renderOption={(option) => {
            const logo = option.metadata?.logo as string | undefined;
            return (
              <div className='flex items-center gap-2'>
                {logo && (
                  <Image
                    src={logo}
                    alt={option.label}
                    width={20}
                    height={20}
                    className='h-5 w-5 rounded-sm object-cover'
                  />
                )}
                <span>{option.label}</span>
              </div>
            );
          }}
          renderValue={(option) => {
            if (!option) return 'Select league';
            const logo = option.metadata?.logo as string | undefined;
            return (
              <div className='flex items-center gap-2'>
                {logo && (
                  <Image
                    src={logo}
                    alt={option.label}
                    width={20}
                    height={20}
                    className='h-5 w-5 rounded-sm object-cover'
                  />
                )}
                <span>{option.label}</span>
              </div>
            );
          }}
        />
      </div>

      {/* Round Select */}
      <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
        <span className='text-sm font-medium whitespace-nowrap'>Round:</span>
        <SearchSelect
          options={roundOptions}
          value={selectedRound}
          onValueChange={onRoundChange}
          placeholder='Select round'
          searchPlaceholder='Search rounds...'
          disabled={!selectedLeague}
          width='250px'
        />
      </div>
    </div>
  );
}
