/**
 * useCountries Hook
 *
 * Fetches countries data using TanStack Query.
 */

import { API_ENDPOINTS } from '@/constants/endpoints';
import { ApiError, createAuthenticatedApi } from '@/lib/api';
import { queryKeys, queryOptions, useQuery } from '@/lib/tanstack';
import type { CountriesResponse, CountriesParams } from '@/types/country';

/**
 * Fetch countries data from API
 */
async function fetchCountries(
  params?: CountriesParams,
): Promise<CountriesResponse> {
  const api = createAuthenticatedApi();
  const searchParams = new URLSearchParams();

  // Add query parameters
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  const url = queryString
    ? `${API_ENDPOINTS.TACTIKA.SPORTS.COUNTRIES}?${queryString}`
    : API_ENDPOINTS.TACTIKA.SPORTS.COUNTRIES;

  const response = await api.get<CountriesResponse>(url);

  if (!response.ok) {
    throw new ApiError(
      response.problem || 'Failed to fetch countries',
      response.problem ?? 'Failed to fetch countries',
      response.status,
    );
  }

  if (!response.data) {
    throw new ApiError('No countries data received');
  }

  return response.data;
}

/**
 * Query options for fetching countries data
 */
export function countriesQueryOptions(params?: CountriesParams) {
  return queryOptions({
    queryKey: queryKeys.tactika.sports.countries(params),
    queryFn: () => fetchCountries(params),
    staleTime: 5 * 60 * 1000, // 5 minutes - countries don't change often
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

/**
 * Hook to fetch countries data
 *
 * @example
 * ```tsx
 * function CountryFilter() {
 *   const { data, isLoading, error } = useCountries();
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <Select>
 *       {data.data.map((country) => (
 *         <SelectItem key={country.code} value={country.code}>
 *           {country.name}
 *         </SelectItem>
 *       ))}
 *     </Select>
 *   );
 * }
 * ```
 */
export function useCountries(params?: CountriesParams) {
  return useQuery(countriesQueryOptions(params));
}
